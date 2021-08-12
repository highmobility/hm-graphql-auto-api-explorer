import { knex } from '../database'

export default class ConfigController {
  async get(req, res) {
    try {
      const config = await knex('config').first()

      res.json(config)
    } catch (err) {
      console.log(err.stack)
      res.status(500).json({
        error: 'Failed to get config',
      })
    }
  }

  async update(req, res) {
    try {
      let config = await knex('config').first()
      if (!config) {
        config = await knex('config').insert({
          view: req.body.view,
          updateFrequency: req.body.updateFrequency,
          selected_vehicle_id: req.body.selectedVehicleId,
          google_maps_api_key: req.body.googleMapsApiKey,
        })
      }

      res.json(config)
    } catch (err) {
      console.log(err.stack)
      res.status(500).json({
        error: 'Failed to fetch config',
      })
    }
  }
}
