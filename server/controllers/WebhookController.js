import { knex } from '../database'
import Crypto from '../services/Crypto'
import LogsService from '../services/LogsService'
import WebhookService from '../services/WebhookService'

export default class WebhookController {
  async handleIncomingWebhook(req, res) {
    try {
      const vin = req?.body?.vehicle?.vin
      if (!vin) {
        return res.status(401).json({ error: 'No VIN found' })
      }
      console.log(`Received webhook for VIN ${vin}`)

      const config = await knex('config').first()
      const validSignature = Crypto.validateSignature(
        req,
        config.webhook_secret
      )
      if (!validSignature) {
        return res.status(401).json({ error: 'Invalid secret' })
      }

      if (req.headers['x-hm-event'] === 'fleet_clearance_changed') {
        await WebhookService.handleClearanceChangedWebhook(vin, req.body.event)
        res.json({ message: 'Fleet clearance updated' })
        return
      }

      // Log all webhook events except authorization_changed
      if (req.headers['x-hm-event'] === 'authorization_changed') {
        return res.status(202).json({ message: 'Not logging this event' })
      }
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
