import { knex } from '../database'
import argon2 from 'argon2'

export default class ConfigController {
  async get(req, res) {
    try {
      const config = await knex('config').first()

      delete config.basic_auth_password

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
        basic_auth_enabled: req.body.basicAuthEnabled,
        basic_auth_username: req.body.basicAuthUsername,
        continuous_database_logging: req.body.loggingEnabled,
      }

      if (req.body.basicAuthPassword) {
        const hashedPassword = await argon2.hash(req.body.basicAuthPassword)
        newConfig.basic_auth_password = hashedPassword
      }

      const config = (await knex('config').first().update(newConfig, '*'))[0]

      res.json(config)
    } catch (err) {
      console.log(err.stack)
      res.status(500).json({
        error: 'Failed to update config',
      })
    }
  }
}
