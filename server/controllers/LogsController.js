import { format } from 'date-fns'
import LogsService from '../services/LogsService'

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
}
