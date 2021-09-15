import { knex } from '../database'
import GraphQlService from '../services/GraphQlService'
import { camelCase } from 'lodash'
import axios from 'axios'

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
      const { id: vehicleId, pending: vehiclePending } = await knex('vehicles')
        .where('id', id)
        .first()
      if (!vehicleId) {
        return res.status(404).json({ message: 'No vehicle found' })
      }

      const { access_token } = await knex('access_tokens')
        .where('vehicle_id', vehicleId)
        .first()
      const appConfig = await knex('app_config').first()
      if (!appConfig) {
        return res.status(404).json({ message: 'No app config found' })
      }
      const graphQl = new GraphQlService(
        appConfig.graph_ql_api_config,
        access_token
      )

      const properties = await graphQl.fetchProperties(
        req.body.properties,
        vehiclePending
      )

      if (vehiclePending) {
        const { brand, vin } =
          Object.values(properties).find(
            (value) => value && value.vin && value.brand
          ) || {}
        if (brand && brand.data && vin && vin.data) {
          await knex('vehicles').where('id', id).update({
            vin: vin.data,
            brand: brand.data,
            pending: false,
          })
        }
      }

      res.json(properties)
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

      const { access_token } = await knex('access_tokens')
        .where({ id: vehicleId })
        .first()

      const { token_url, client_id, client_secret } = await knex(
        'app_config'
      ).first()
      await axios.delete(token_url, {
        data: {
          token: access_token,
          client_id,
          client_secret,
        },
      })

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
