import { knex } from '../database'

export default class ConfigController {
  async store(req, res) {
    const {
      env,
      appId,
      clientPrivateKey,
      clientCertificate,
      clientId,
      clientSecret,
      authUrl,
      tokenUrl,
    } = req.body

    try {
      await knex('config').insert({
        env: env,
        app_id: appId,
        client_private_key: clientPrivateKey,
        client_certificate: clientCertificate,
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
        error: 'Failed to update config',
      })
    }
  }
}
