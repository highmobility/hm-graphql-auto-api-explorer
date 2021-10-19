import { knex } from '../database'
import GraphQlService from '../services/GraphQlService'
import { camelCase } from 'lodash'
import Auth from '../services/Auth'
import PropertyValues from '../services/PropertyValues'

export default class VehiclesController {
  async index(req, res) {
    try {
      const vehicles = await knex('vehicles').select()
      const accessTokens = await knex('access_tokens').select()

      const response = vehicles.map((vehicle) => {
        const scopeString = accessTokens.find(
          (accessToken) => accessToken.vehicle_id === vehicle.id
        ).scope
        const parsedScope = scopeString
          .split(' ')
          .map((item) => {
            const [capabilityName, method, propertyName] = item.split('.')
            if (method !== 'get') return null
            return `${camelCase(capabilityName)}.${camelCase(propertyName)}`
          })
          .filter(Boolean)

        return {
          ...vehicle,
          scope: parsedScope,
        }
      })

      res.json(response)
    } catch (err) {
      console.log(err.stack)
      res.status(500).json({
        error: 'Failed to get vehicles',
      })
    }
  }

  async getData(req, res) {
    try {
      const { id } = req.params
      const { properties: propertiesToFetch } = req.body
      const { id: vehicleId, pending: vehiclePending } = await knex('vehicles')
        .where('id', id)
        .first()
      if (!vehicleId) {
        return res.status(404).json({ message: 'No vehicle found' })
      }

      const accessToken = await Auth.getAccessToken(vehicleId)
      const appConfig = await knex('app_config').first()
      if (!appConfig) {
        return res.status(404).json({ message: 'No app config found' })
      }
      const graphQl = new GraphQlService(
        appConfig.graph_ql_api_config,
        accessToken
      )

      if (vehiclePending) {
        propertiesToFetch.push('universal.brand')
        propertiesToFetch.push('universal.vin')
      }

      const graphQlResponse = await graphQl.fetchProperties(propertiesToFetch)

      await PropertyValues.saveValues(vehicleId, graphQlResponse)

      if (vehiclePending) {
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

      const newProperties = await knex('property_values')
        .where({ vehicle_id: vehicleId })
        .whereIn('property_unique_id', propertiesToFetch)
        .select()
      res.json(newProperties)
    } catch (err) {
      console.log('Failed to fetch vehicle data', err)
      res.status(500).json({ error: 'Failed to fetch vehicle data' })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params

      const { id: vehicleId } = await knex('vehicles').where('id', id).first()

      if (!vehicleId) {
        return res.status(404).json({ message: 'No vehicle found' })
      }

      const accessToken = await Auth.getAccessToken(vehicleId)
      await Auth.revokeToken(accessToken)

      await knex('vehicles').where({ id }).delete()

      res.json({
        message: 'Vehicle deleted',
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: 'Failed to delete vehicle',
      })
    }
  }
}
