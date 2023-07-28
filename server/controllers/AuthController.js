import Auth from '../services/Auth'
import { knex } from '../database'

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
      const { vin, brand } = req.body
      if (!vin) {
        return res.status(400).send({ error: 'VIN is required' })
      }
      if (!brand) {
        return res.status(400).send({ error: 'Brand is required' })
      }

      await Auth.authorizeFleetVehicle(vin, brand)
      res.send({ message: 'Vehicle added' })
    } catch (err) {
      console.log(
        'fleetAuth error',
        err,
        err?.response?.data?.error_description,
        err?.response?.data?.errors?.[0]?.detail
      )

      res.status(500).json({
        error:
          (err.response &&
            err.response.data &&
            err.response.data.error_description) ||
          err.message,
      })
    }
  }
}
