import { knex } from '../database'

class PropertyValues {
  static async saveValues(vehicleId, graphQlResponse) {
    try {
      if (!graphQlResponse) return

      for (const [capabilityName, properties] of Object.entries(
        graphQlResponse
      )) {
        if (!properties) return

        for (const [propertyName, propertyValue] of Object.entries(
          properties
        )) {
          await PropertyValues.updateOrCreate(
            vehicleId,
            `${capabilityName}.${propertyName}`,
            propertyValue
          )
        }
      }
    } catch (e) {
      console.log('Failed to save property values:', e)
    }
  }

  static async updateOrCreate(vehicleId, propertyUniqueId, value) {
    const newData = {
      value: value ? JSON.stringify(value) : null,
    }

    if (value) {
      newData.updated_at = new Date()
    }

    const propertyRow = await knex('property_values')
      .where({
        property_unique_id: propertyUniqueId,
        vehicle_id: vehicleId,
      })
      .first()

    if (propertyRow) {
      if (propertyRow.value && !value) {
        return
      }

      return await knex('property_values')
        .where({ property_unique_id: propertyUniqueId })
        .first()
        .update(newData)
    }

    return await knex('property_values').insert({
      property_unique_id: propertyUniqueId,
      vehicle_id: vehicleId,
      ...newData,
    })
  }
}

export default PropertyValues
