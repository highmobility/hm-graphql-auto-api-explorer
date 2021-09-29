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

  async getFleetVehicles(req, res) {
    try {
      const appConfig = await knex('app_config').first()
      const vehicles = await knex('vehicles').select()
      const authorizedVehicles = await Auth.getFleetVehicles(appConfig)
      console.log('vehicles', vehicles)

      res.send(
        authorizedVehicles.filter(
          (authorizedVehicle) =>
            !vehicles.some(
              (connectedVehicle) =>
                connectedVehicle.vin === authorizedVehicle.vin
            )
        )
      )
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err.message,
      })
    }
  }
}
