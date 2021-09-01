import { knex } from '../database'

export default class PropertiesController {
  async get(req, res) {
    try {
      const properties = await knex('properties').select('*')

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
      const properties = req.body.properties
      await knex.transaction(async (trx) => {
        await trx('properties').select('*').delete()
        await trx('properties').insert(
          properties.map((property) => ({
            unique_id: property.id,
            pinned: property.pinned,
          }))
        )
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
