import { knex } from '../database'

export default class PropertiesController {
  async get(req, res) {
    try {
      const properties = await knex('properties').select('*')

      // If no property values, it's a new app and should show default properties
      const propertyValues = await knex('property_values').select('*')
      if (propertyValues.length < 1) return res.json(null)

      res.json(properties)
    } catch (err) {
      console.log(err.stack)
      res.status(500).json({
        error: 'Failed to get properties',
      })
    }
  }

  async update(req, res) {
    try {
      const properties = req.body.properties || []
      await knex.transaction(async (trx) => {
        await trx('properties').select('*').delete()
        if (properties.length > 0) {
          await trx('properties').insert(
            properties.map((property) => ({
              unique_id: property.id,
              pinned: property.pinned,
            }))
          )
        }
      })

      res.json({ message: 'Properties updated' })
    } catch (err) {
      console.log(err.stack)
      res.status(500).json({
        error: 'Failed to update properties',
      })
    }
  }
}
