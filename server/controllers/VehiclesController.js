import { knex } from '../database'
import GraphQlService from '../services/GraphQlService'

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
      const { id } = req.params
      const { access_token } = await knex('access_tokens')
        .where('vehicle_id', id)
        .first()
      const config = await knex('app_config').first()
      const graphQl = new GraphQlService(
        config.graph_ql_api_config,
        access_token
      )

      const properties = await graphQl.fetchProperties(req.body.properties)

      res.json(properties)
    } catch (err) {
      console.log('Failed to fetch vehicle data', err)
      res.status(500).json({ error: 'Failed to fetch vehicle data' })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      await knex('vehicles').where({ id }).delete()

      res.json({
        message: 'Vehicle deleted',
      })
    } catch (err) {
      console.log(err.stack)
      res.status(500).json({
        error: 'Failed to delete vehicle',
      })
    }
  }
}
