import { knex } from '../database'
import VehicleService from './VehicleService'
import { Parser } from 'json2csv'

export default class LogsService {
  static async createCsv() {
    const logs = await knex('logs').select()

    const parsedValues = []
    logs.forEach(({ vin, request_time, response }, rowIndex) => {
      parsedValues[rowIndex] = { vin, requestTime: request_time }
      if (!response) return
      Object.entries(response).forEach(([capabilityName, properties]) => {
        if (!properties) return
        Object.entries(properties).forEach(([propertyName, propertyValue]) => {
          if (!propertyValue) return
          parsedValues[rowIndex] = {
            ...parsedValues[rowIndex],
            ...LogsService.getPropertyValueFields(
              `${capabilityName}.${propertyName}`,
              propertyValue
            ),
          }
        })
      })
    })

    const sortedValues = parsedValues.sort(
      (a, b) => a.requestTime - b.requestTime
    )

    // return sortedValues
    const parser = new Parser()
    return parser.parse(sortedValues)
  }

  static getPropertyValueFields(propertyName, propertyValue, fields = {}) {
    if (Array.isArray(propertyValue)) {
      propertyValue.forEach((innerValue, propertyIndex) => {
        return LogsService.getPropertyValueFields(
          `${propertyName}${propertyIndex + 1}`,
          innerValue,
          fields
        )
      })

      return fields
    }

    if (propertyValue?.data?.value) {
      fields[`${propertyName}`] = propertyValue?.data?.value

      if (propertyValue?.data?.unit) {
        fields[`${propertyName}.unit`] = propertyValue?.data?.unit
      }
    } else if (propertyValue?.value) {
      fields[`${propertyName}`] = propertyValue?.value

      if (propertyValue?.unit) {
        fields[`${propertyName}.unit`] = propertyValue?.unit
      }
    } else if (
      typeof propertyValue?.data === 'object' &&
      propertyValue?.data !== null
    ) {
      Object.entries(propertyValue?.data).forEach(([innerName, innerValue]) => {
        fields = LogsService.getPropertyValueFields(
          `${propertyName}.${innerName}`,
          innerValue,
          fields
        )
      })
    } else if (propertyValue?.data) {
      fields = LogsService.getPropertyValueFields(
        propertyName,
        propertyValue?.data,
        fields
      )
    } else {
      fields[`${propertyName}`] = propertyValue
    }

    if (propertyValue.timestamp) {
      fields[`${propertyName}.timestamp`] = propertyValue.timestamp
    }

    return fields
  }

  static async fetchData(vin) {
    try {
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
