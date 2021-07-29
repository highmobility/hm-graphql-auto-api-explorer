import database from '../database'

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
      await database.query(
        `insert into config(
          env,
          app_id,
          client_private_key,
          client_certificate,
          client_id,
          client_secret,
          auth_url,
          token_url
        ) values($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          env,
          appId,
          clientPrivateKey,
          clientCertificate,
          clientId,
          clientSecret,
          authUrl,
          tokenUrl,
        ]
      )

      res.json({
        message: 'Config saved',
      })
    } catch (err) {
      console.log(err.stack)
      res.status(500)
      res.json({
        error: 'Failed to update config',
      })
    }
  }
}
