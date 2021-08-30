import { knex } from '../database'

export default class ConfigController {
  async get(req, res) {
    try {
      let config = await knex('config').first()
      if (!config) {
        config = await knex('config').insert({}, '*')
      }

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
      const newConfig = {
        view: req.body.view,
        update_frequency: req.body.updateFrequency,
        selected_vehicle_id: req.body.selectedVehicleId,
        google_maps_api_key: req.body.googleMapsApiKey,
      }

      let config = await knex('config').first()
      if (config) {
        config = (await knex('config').first().update(newConfig, '*'))[0]
      } else {
        config = (await knex('config').insert(newConfig, '*'))[0]
      }

      res.json(config)
    } catch (err) {
      console.log(err.stack)
      res.status(500).json({
        error: 'Failed to update config',
      })
    }
  }
}
