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
      const existingProperty = await knex('properties')
        .where({ unique_id: req.body.id })
        .first()

      if (existingProperty) {
        if (req.body.shown) {
          await knex('properties')
            .where({ unique_id: req.body.id })
            .update({ pinned: req.body.pinned })
        } else {
          await knex('properties').where({ unique_id: req.body.id }).delete()
        }
      } else {
        await knex('properties').insert({
          unique_id: req.body.id,
          pinned: req.body.pinned,
        })
      }

      res.json({ message: 'Property updated' })
    } catch (err) {
      console.log(err.stack)
      res.status(500).json({
        error: 'Failed to update property',
      })
    }
  }
}
