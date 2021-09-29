import Auth from '../services/Auth'

export default class AuthController {
  async oAuthCallback(req, res) {
    try {
      await Auth.authorizeVehicle(req)

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
      const { vin } = req.body
      if (!vin) {
        return res.status(400).send({ error: 'VIN is required' })
      }

      await Auth.authorizeFleetVehicle(vin)
      res.send({ message: 'Vehicle added' })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err.message,
      })
    }
  }
}
