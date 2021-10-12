import { knex } from '../database'

export default class AppConfigController {
  async store(req, res) {
    const {
      graphQlApiConfig,
      fleetApiConfig,
      clientId,
      clientSecret,
      authUrl,
      tokenUrl,
      appType,
    } = req.body

    try {
      await knex.transaction(async (trx) => {
        await trx('app_config').select('*').delete()

        await trx('app_config').insert({
          graph_ql_api_config: graphQlApiConfig || null,
          fleet_api_config: fleetApiConfig || null,
          client_id: clientId,
          client_secret: clientSecret,
          auth_url: authUrl,
          token_url: tokenUrl,
          app_type: appType,
        })
      })

      res.json({
        message: 'Config saved',
      })
    } catch (err) {
      console.log(err.stack)
      res.status(500).json({
        error: 'Failed to update app config',
      })
    }
  }

  async get(req, res) {
    try {
      const appConfig = await knex('app_config').first()
      if (!appConfig) {
        return res.status(404).json({ message: 'No config found' })
      }

      delete appConfig.graph_ql_api_config.private_key
      delete appConfig.fleet_api_config
      delete appConfig.client_secret

      res.json(appConfig)
    } catch (err) {
      console.log(err.stack)
      res.status(500).json({
        error: 'Failed to fetch app config',
      })
    }
  }

  async reset(req, res) {
    try {
      await knex.transaction(async (trx) => {
        await trx('app_config').select('*').delete()
        await trx('access_tokens').select('*').delete()
        await trx('config').first().update({ selected_vehicle_id: null })
        await trx('properties').select('*').delete()
        await trx('vehicles').select('*').delete()
      })

      res.json('App reset')
    } catch (err) {
      console.log(err.stack)
      res.status(500).json({
        error: 'Failed to reset app',
      })
    }
  }
}
