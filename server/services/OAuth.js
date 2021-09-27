import { knex } from '../database'
import axios from 'axios'
import GraphQlService from './GraphQlService'

class OAuth {
  static async initAccessToken(req) {
    if (req.query.error) {
      throw new Error(`Error during OAuth: ${req.query.error}`)
    }

    const oAuthCode = req.query.code
    const appConfig = await knex('app_config').first()

    const { data: tokenResponse } = await axios.post(appConfig.token_url, {
      grant_type: 'authorization_code',
      code: oAuthCode,
      redirect_uri: `https://${req.get('host')}${req.baseUrl}${
        req._parsedUrl.pathname
      }`,
      client_id: appConfig.client_id,
      client_secret: appConfig.client_secret,
    })

    const graphQl = new GraphQlService(
      appConfig.graph_ql_api_config,
      tokenResponse.access_token
    )
    const { universal } = await graphQl.fetchProperties([
      'universal.brand',
      'universal.vin',
    ])

    const vin = (universal && universal.vin && universal.vin.data) || null
    const brand = (universal && universal.brand && universal.brand.data) || null

    await knex.transaction(async (trx) => {
      const [vehicleId] = await trx('vehicles').insert(
        {
          vin,
          brand,
          pending: !vin || !brand,
        },
        'id'
      )

      await trx('access_tokens').insert(
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

  static async getFleetAccessToken() {
    // get row from db
    // if expired, fetch new and save new
    // return access token
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
}

export default OAuth
