import { knex } from '../database'
import { Parser } from 'json2csv'
import { format } from 'date-fns'

export default class LogsController {
  async csv(req, res) {
    try {
      const logs = await knex('logs').select()
      const parser = new Parser({
        fields: ['vin', 'request_time', 'response'],
        'default-value': 'DEFAULT_VALUE',
      })
      const csv = parser.parse(logs)

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
}
