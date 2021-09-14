import { knex } from '../database'
import axios from 'axios'
import GraphQlService from '../services/GraphQlService'

export default class OAuthController {
  async callback(req, res) {
    try {
      if (req.query.error) {
        throw new Error(`Error during OAuth: ${req.query.error}`)
      }

      const oAuthCode = req.query.code
      const config = await knex('app_config').first()

      const { data: tokenResponse } = await axios.post(config.token_url, {
        grant_type: 'authorization_code',
        code: oAuthCode,
        redirect_uri: `https://${req.get('host')}${req.baseUrl}${
          req._parsedUrl.pathname
        }`,
        client_id: config.client_id,
        client_secret: config.client_secret,
      })

      const graphQl = new GraphQlService(
        config.graph_ql_api_config,
        tokenResponse.access_token
      )
      const { diagnostics } = await graphQl.fetchProperties([
        'diagnostics.brand',
        'diagnostics.vin',
      ])
      if (!diagnostics) {
        throw new Error('Could not fetch Diagnostics capability data')
      }

      const vin = diagnostics.vin.data
      const brand = diagnostics.brand.data

      await knex.transaction(async (trx) => {
        const [vehicleId] = await trx('vehicles').insert(
          {
            vin,
            brand,
          },
          'id'
        )

        await trx('access_tokens').insert(
          {
            vehicle_id: vehicleId,
            access_token: tokenResponse.access_token,
            refresh_token: tokenResponse.refresh_token,
            scope: tokenResponse.scope,
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

      res.redirect(
        `http://${req.hostname}${
          req.hostname === 'localhost' ? ':3000' : ''
        }/dashboard`
      )
    } catch (err) {
      console.trace(err)
      res.redirect(
        `http://${req.hostname}${
          req.hostname === 'localhost' ? ':3000' : ''
        }/connect?error=${err.message}`
      )
    }
  }
}
