import { knex } from '../database'
import axios from 'axios'
import GraphQlService from './GraphQlService'
import jwt from 'jsonwebtoken'
import uuid4 from 'uuid4'

const FLEET_AUTH_STATUS = {
  REVOKED: 'revoked',
  PENDING: 'pending',
  REJECTED: 'rejected',
  APPROVED: 'approved',
}

class Auth {
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

  static async addVehicle(vin, brand, accessTokenResponse, pending = false) {
    await knex.transaction(async (trx) => {
      const [vehicleId] = await trx('vehicles').insert(
        {
          vin,
          brand,
          pending,
        },
        'id'
      )

      await trx('access_tokens').insert(
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

      const config = await trx('config').first()
      if (!config) {
        await trx('config').insert({
          selected_vehicle_id: vehicleId,
        })
      } else {
        await trx('config').first().update({
          selected_vehicle_id: vehicleId,
        })
      }
    })
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

  static async authorizeFleetVehicle(vin) {
    const appConfig = await knex('app_config').first()
    const authTokenResponse = await Auth.getFleetAuthToken(appConfig)

    // TODO: add auth (POST to fleets/vehicles), needs vin, brand and other stuff, if response is pending set vehicle as pending
    const { data: accessTokenResponse } = await axios.post(
      'https://api.high-mobility.com/v1/fleets/access_tokens',
      {
        vin,
      },
      {
        headers: {
          Authorization: `Bearer ${authTokenResponse.auth_token}`,
        },
      }
    )

    const { brand } = await Auth.getVinAndBrand(appConfig, accessTokenResponse)

    // const pending = !brand || !vin || authorizedVehicle.status === FLEET_AUTH_STATUS.PENDING
    const pending = !brand || !vin
    await Auth.addVehicle(vin, brand, accessTokenResponse, pending)
  }

  static async getFleetAuthToken(appConfig) {
    const serviceAccountPrivateKey = Buffer.from(
      appConfig.fleet_api_config.private_key,
      'utf8'
    )
    const serviceAccountJWT = jwt.sign(
      {
        iss: appConfig.fleet_api_config.id,
        aud: 'https://api.high-mobility.com/v1',
        iat: Math.round(Date.now() / 1000),
        jti: uuid4(),
        ver: 1,
      },
      serviceAccountPrivateKey,
      { algorithm: 'ES256' }
    )

    const { data: authTokenResponse } = await axios.post(
      'https://api.high-mobility.com/v1/auth_tokens',
      {
        assertion: serviceAccountJWT,
      }
    )

    return authTokenResponse
  }

  static async getFleetVehicles(appConfig) {
    const authTokenResponse = await Auth.getFleetAuthToken(appConfig)

    const { data: authorizedVehicles } = await axios.get(
      'https://api.high-mobility.com/v1/fleets/vehicles',
      {
        headers: {
          Authorization: `Bearer ${authTokenResponse.auth_token}`,
        },
      }
    )

    return authorizedVehicles
  }
}

export default Auth
