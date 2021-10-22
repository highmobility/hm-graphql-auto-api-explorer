import { knex } from '../database'
import GraphQlService from './GraphQlService'
import Auth from './Auth'

class VehicleService {
  static async fetchProperties({ id, pending, vin }, properties) {
    const accessToken = await Auth.getAccessToken(id)
    const appConfig = await knex('app_config').first()
    if (!appConfig) {
      return res.status(404).json({ message: 'No app config found' })
    }
    const graphQl = new GraphQlService(
      appConfig.graph_ql_api_config,
      accessToken
    )

    const propertiesToFetch = properties
    if (pending) {
      propertiesToFetch.push('universal.brand')
      propertiesToFetch.push('universal.vin')
    }

    const graphQlResponse = await graphQl.fetchProperties(propertiesToFetch)

    if (pending) {
      const brand =
        graphQlResponse.universal &&
        graphQlResponse.universal.brand &&
        graphQlResponse.universal.brand.data
      const vin =
        graphQlResponse.universal &&
        graphQlResponse.universal.vin &&
        graphQlResponse.universal.vin.data

      if (brand && vin) {
        await knex('vehicles').where('id', id).update({
          vin,
          brand,
          pending: false,
        })
      }
    }

    await knex('logs').insert({
      vin,
      response: JSON.stringify(graphQlResponse),
    })

    return graphQlResponse
  }
}

export default VehicleService
