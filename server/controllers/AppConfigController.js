import { knex } from '../database'

export default class AppConfigController {
  async store(req, res) {
    const { graphQlApiConfig, clientId, clientSecret, authUrl, tokenUrl } =
      req.body

    try {
      await knex('app_config').insert({
        graph_ql_api_config: graphQlApiConfig,
        client_id: clientId,
        client_secret: clientSecret,
        auth_url: authUrl,
        token_url: tokenUrl,
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
      const config = await knex('app_config').first()
      if (!config) {
        return res.status(404).json({ message: 'No config found' })
      }

      delete config.graph_ql_api_config.private_key
      delete config.client_secret

      res.json(config)
    } catch (err) {
      console.log(err.stack)
      res.status(500).json({
        error: 'Failed to fetch app config',
      })
    }
  }
}
