import { knex } from '../database'
import axios from 'axios'
import GraphQlService from './GraphQlService'
import jwt from 'jsonwebtoken'
import uuid4 from 'uuid4'
import CAPABILITIES from '../../data/capabilities.json'
import { FLEET_AUTH_STATUS } from '../utils/fleet'

const ACCESS_TOKEN_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
}

class Auth {
  static getApiUrl(appConfig) {
    const sandbox = (appConfig.token_url || '').includes('sandbox')

    const develop = (appConfig.token_url || '').includes('develop')
    const staging = (appConfig.token_url || '').includes('staging')
    const production = !develop && !staging

    return `https://${sandbox ? 'sandbox.' : ''}api.${
      staging ? 'staging.' : ''
    }high-mobility${production ? '.com' : '.net'}/v1`
  }

  static async authorizeVehicle(req) {
    if (req.query.error) {
      throw new Error(`Error during OAuth: ${req.query.error}`)
    }

    const oAuthCode = req.query.code
    const appConfig = await knex('app_config').first()

    const { data: accessTokenResponse } = await axios.post(
      appConfig.token_url,
      {
        grant_type: 'authorization_code',
        code: oAuthCode,
        redirect_uri: `https://${req.get('host')}${req.baseUrl}${
          req._parsedUrl.pathname
        }`,
        client_id: appConfig.client_id,
        client_secret: appConfig.client_secret,
      }
    )

    const { vin, brand } = await Auth.getVinAndBrand(
      appConfig,
      accessTokenResponse
    )

    const pending = !vin || !brand
    await Auth.addVehicle(vin, brand, accessTokenResponse, pending)
  }

  static async getVinAndBrand(appConfig, accessTokenResponse) {
    try {
      if (accessTokenResponse.status === ACCESS_TOKEN_STATUS.PENDING) {
        return { vin: null, brand: null }
      }

      const graphQl = new GraphQlService(
        appConfig.graph_ql_api_config,
        accessTokenResponse.access_token
      )

      const { universal } = await graphQl.fetchProperties([
        'universal.brand',
        'universal.vin',
      ])

      const vin = (universal && universal.vin && universal.vin.data) || null
      const brand =
        (universal && universal.brand && universal.brand.data) || null

      return { vin, brand }
    } catch (e) {
      console.log('Failed to get vin and brand', e)

      return { vin: null, brand: null }
    }
  }

  static async addVehicle(
    vin,
    brand,
    accessTokenResponse,
    pending = false,
    fleetClearance = null
  ) {
    await knex('vehicles').where('vin', vin).del()
    const [vehicleId] = await knex('vehicles').insert(
      {
        vin,
        brand,
        pending,
        fleet_clearance: fleetClearance,
      },
      'id'
    )

    await knex('config').first().update({
      selected_vehicle_id: vehicleId,
    })

    if (!accessTokenResponse) {
      return
    }

    await knex('access_tokens').where('vehicle_id', vehicle.id).del()
    await knex('access_tokens').insert(
      {
        vehicle_id: vehicleId,
        access_token: accessTokenResponse.access_token,
        refresh_token: accessTokenResponse.refresh_token,
        scope: accessTokenResponse.scope,
        expires_at: new Date(
          new Date().getTime() + accessTokenResponse.expires_in * 1000
        ),
      },
      'access_token'
    )
    await Auth.initProperties(accessTokenResponse)
  }

  static async initProperties(accessTokenResponse) {
    const isFirstVehicle = (await knex('vehicles').count('id')) == 1
    if (isFirstVehicle) {
      const newSelectedProperties = []
      accessTokenResponse.scope.split(' ').forEach((scopeItem) => {
        const [capabilityName, , propertyName] = scopeItem.split('.')

        const propertyConfig = CAPABILITIES?.[capabilityName]?.properties?.find(
          (property) => property.name === propertyName
        )

        if (!propertyConfig) return

        return newSelectedProperties.push(
          `${propertyConfig.capabilityName}.${propertyConfig.name_cased}`
        )
      })

      for (const newSelectedProperty of newSelectedProperties) {
        await knex('properties')
          .insert({ unique_id: newSelectedProperty })
          .onConflict('unique_id')
          .merge()
      }
    }
  }

  static async getAccessToken(vehicleId) {
    const appConfig = await knex('app_config').first()
    const { access_token, refresh_token, expires_at } = await knex(
      'access_tokens'
    )
      .where('vehicle_id', vehicleId)
      .first()

    if (new Date(expires_at).getTime() < new Date().getTime()) {
      const { data: tokenResponse } = await axios.post(appConfig.token_url, {
        grant_type: 'refresh_token',
        client_id: appConfig.client_id,
        client_secret: appConfig.client_secret,
        refresh_token,
      })

      const [accessToken] = await knex('access_tokens')
        .where('vehicle_id', vehicleId)
        .first()
        .update(
          {
            vehicle_id: vehicleId,
            access_token: tokenResponse.access_token,
            refresh_token: tokenResponse.refresh_token,
            scope: tokenResponse.scope,
            expires_at: new Date(
              new Date().getTime() + tokenResponse.expires_in * 1000
            ),
          },
          'access_token'
        )

      return accessToken
    }

    return access_token
  }

  static async revokeToken(accessToken) {
    try {
      const { token_url, client_id, client_secret } = await knex(
        'app_config'
      ).first()

      await axios.delete(token_url, {
        data: {
          token: accessToken,
          client_id,
          client_secret,
        },
      })

      return true
    } catch (e) {
      console.log('Failed to revoke token', e)
      return false
    }
  }

  static async authorizeFleetVehicle(vin, brand) {
    const appConfig = await knex('app_config').first()
    const apiUrl = Auth.getApiUrl(appConfig)

    const authToken = await Auth.getFleetAuthToken(appConfig)
    const { data } = await axios.post(
      `${apiUrl}/fleets/vehicles`,
      {
        vehicles: [{ vin, brand }],
      },
      {
        headers: {
          Authorization: `Bearer ${authToken.auth_token}`,
        },
      }
    )

    const fleetClearance =
      data?.vehicles?.find((v) => v.vin === vin)?.status || null
    await Auth.addVehicle(vin, brand, null, true, fleetClearance)
  }

  static async getFleetAuthToken(appConfig) {
    const apiUrl = Auth.getApiUrl(appConfig)
    const serviceAccountPrivateKey = Buffer.from(
      appConfig.fleet_api_config.private_key,
      'utf8'
    )
    const serviceAccountJWT = jwt.sign(
      {
        iss: appConfig.fleet_api_config.id,
        aud: apiUrl,
        iat: Math.round(Date.now() / 1000),
        jti: uuid4(),
        ver: 2,
      },
      serviceAccountPrivateKey,
      { algorithm: 'ES256' }
    )

    const { data: authTokenResponse } = await axios.post(
      `${apiUrl}/auth_tokens`,
      {
        assertion: serviceAccountJWT,
      }
    )

    return authTokenResponse
  }

  static async getFleetVehicles(appConfig) {
    const apiUrl = Auth.getApiUrl(appConfig)
    const authTokenResponse = await Auth.getFleetAuthToken(appConfig)
    const { data: authorizedVehicles } = await axios.get(
      `${apiUrl}/fleets/vehicles`,
      {
        headers: {
          Authorization: `Bearer ${authTokenResponse.auth_token}`,
        },
      }
    )

    return authorizedVehicles
  }

  // This can only be called after fleet clearance has been given
  static async getFleetVehicleAccessToken(vehicle) {
    if (!vehicle) return null

    const appConfig = await knex('app_config').first()
    const apiUrl = Auth.getApiUrl(appConfig)
    const authToken = await Auth.getFleetAuthToken(appConfig)
    const { data: accessTokenResponse } = await axios.post(
      `${apiUrl}/fleets/access_tokens`,
      {
        vin: vehicle.vin,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken.auth_token}`,
        },
      }
    )

    await knex('access_tokens').where('vehicle_id', vehicle.id).del()
    await knex('access_tokens').insert({
      vehicle_id: vehicle.id,
      access_token: accessTokenResponse.access_token,
      refresh_token: accessTokenResponse.refresh_token,
      scope: accessTokenResponse.scope,
      expires_at: new Date(
        new Date().getTime() + accessTokenResponse.expires_in * 1000
      ),
    })

    return accessTokenResponse
  }

  static async revokeFleetClearance(vehicle) {
    try {
      const appConfig = await knex('app_config').first()
      const apiUrl = Auth.getApiUrl(appConfig)
      const authToken = await Auth.getFleetAuthToken(appConfig)
      await axios.delete(`${apiUrl}/fleets/vehicles/${vehicle.vin}`, {
        headers: {
          Authorization: `Bearer ${authToken.auth_token}`,
        },
      })
      console.log('Revoked fleet clearance')
    } catch (e) {
      console.error(
        "Failed to revoke fleet clearance. Maybe it's already revoked",
        e
      )
    }
  }
}

export default Auth
