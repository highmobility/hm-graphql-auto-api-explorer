import { generateJWT } from '../auth'
import { knex } from '../database'

export default class VehiclesController {
  async index(req, res) {
    try {
      const vehicles = await knex('vehicles').select()

      res.json(vehicles)
    } catch (err) {
      console.log(err.stack)
      res.status(500).json({
        error: 'Failed to get vehicles',
      })
    }
  }

  async getData(req, res) {
    try {
      const { vehicleId } = req.params
      const { access_token } = await knex('access_tokens')
        .where('vehicle_id', vehicleId)
        .first()

      const { env, app_id } = await knex('config').first()

      const jwt = generateJWT(access_token, app_id, env)

      res.json({ jwt })
    } catch (err) {
      console.log('Failed to fetch vehicle data', err)
    }
  }
}
