import { format } from 'date-fns'
import Crypto from '../services/Crypto'
import LogsService from '../services/LogsService'
import { knex } from '../database'

export default class LogsController {
  async csv(req, res) {
    try {
      const csv = await LogsService.createCsv()

      const response = res.status(200)
      if (req.query.download !== undefined) {
        response.attachment(
          `graphql-logs-${format(new Date(), 'yyyyMMddHHmm')}.csv`
        )
      }
      response.send(csv)
    } catch (err) {
      console.log('Failed to get logs', err)
      res.status(500).json({
        error: 'Failed to get logs',
      })
    }
  }

  async webhook(req, res) {
    try {
      const config = await knex('config').first()
      if (!config.continuous_database_logging) {
        return res.status(418).json({
          message: 'Logging is disabled',
        })
      }

      const IGNORED_WEBHOOKS = [
        'authorization_changed',
        'fleet_clearance_changed',
      ]
      const vin = req.body && req.body.vehicle && req.body.vehicle.vin
      if (!vin) {
        return res.status(401).json({ error: 'No VIN found' })
      }

      if (IGNORED_WEBHOOKS.includes(req.headers['x-hm-event'])) {
        return res.status(202).json({ message: 'Not logging this event' })
      }

      const validSignature = Crypto.validateSignature(
        req,
        config.webhook_secret
      )
      if (!validSignature) {
        return res.status(401).json({ error: 'Invalid secret' })
      }

      console.log(`Received webhook for VIN ${vin}`)
      await LogsService.fetchData(vin)

      await res.json({ message: 'Vehicle data updated' })
    } catch (err) {
      console.log('Failed to handle webhook', err)
      res.status(500).json({
        error: 'Something went wrong',
      })
    }
  }
}
