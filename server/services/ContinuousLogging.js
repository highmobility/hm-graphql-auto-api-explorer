import { knex } from '../database'
import schedule from 'node-schedule'
import VehicleService from './VehicleService'

class ContinuousLogging {
  job = null

  async fetch() {
    try {
      const config = await knex('config').first()
      const shouldFetch = config && config.continuous_database_logging
      if (!shouldFetch) return

      const vehicles = await knex('vehicles').select()
      const properties = (await knex('properties').select()) || []
      const propertiesToFetch = properties.map((property) => property.unique_id)
      await Promise.all(
        vehicles.map((vehicle) =>
          VehicleService.fetchProperties(vehicle, propertiesToFetch)
        )
      )
    } catch (e) {
      console.log('Failed to fetch vehicle data', e)
    }
  }

  createJob() {
    this.job = schedule.scheduleJob('*/10 * * * *', this.fetch) // Log every 10 minutes
  }
}

export default ContinuousLogging
