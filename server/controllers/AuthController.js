import OAuth from '../services/OAuth'

export default class AuthController {
  async oAuthCallback(req, res) {
    try {
      await OAuth.initAccessToken(req)

      res.redirect(
        `http://${req.hostname}${
          req.hostname === 'localhost' ? ':3000' : ''
        }/dashboard`
      )
    } catch (err) {
      console.log(err)
      res.redirect(
        `http://${req.hostname}${
          req.hostname === 'localhost' ? ':3000' : ''
        }/connect?error=${err.message}`
      )
    }
  }

  async fleetAuth(req, res) {
    try {
      const { vin, brand } = req.body
      if (!vin || !brand) {
        return res.status(400).send({ error: 'No vin or brand ' })
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: 'Failed to authorize fleet vehicle',
      })
    }
  }
}
