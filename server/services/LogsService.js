import { knex } from '../database'
import { Parser } from 'json2csv'
import VehicleService from './VehicleService'

export default class LogsService {
  static async createCsv() {
    const logs = await knex('logs').select()
    const parser = new Parser({
      fields: ['vin', 'request_time', 'response'],
      'default-value': 'DEFAULT_VALUE',
    })

    return parser.parse(logs)
  }

  static async fetchData(vin) {
    try {
      const config = await knex('config').first()
      const shouldFetch = config && config.continuous_database_logging
      if (!shouldFetch) return

      const vehicle = await knex('vehicles').where({ vin }).first()
      if (!vehicle) return

      const properties = (await knex('properties').select()) || []
      const propertiesToFetch = properties.map((property) => property.unique_id)

      await VehicleService.fetchProperties(vehicle, propertiesToFetch)
    } catch (e) {
      console.log('Failed to fetch vehicle data', e)
    }
  }
}
