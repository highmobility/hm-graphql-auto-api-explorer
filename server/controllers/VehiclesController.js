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
}
