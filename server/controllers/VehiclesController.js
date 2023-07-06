import { knex } from '../database'
import { camelCase } from 'lodash'
import Auth from '../services/Auth'
import VehicleService from '../services/VehicleService'
import { FLEET_AUTH_STATUS } from '../utils/fleet'

export default class VehiclesController {
  async index(req, res) {
    try {
      const vehicles = await knex('vehicles').select()
      const accessTokens = await knex('access_tokens').select()

      const response = vehicles.map((vehicle) => {
        const scopeString =
          accessTokens.find(
            (accessToken) => accessToken.vehicle_id === vehicle.id
          )?.scope || ''
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
      const {
        id: vehicleId,
        pending,
        fleet_clearance: fleetClearance,
        vin,
      } = await knex('vehicles').where('id', id).first()
      if (!vehicleId) {
        return res.status(404).json({ message: 'No vehicle found' })
      }

      if (fleetClearance && fleetClearance !== FLEET_AUTH_STATUS.APPROVED) {
        return res.status(403).json({
          error: `Not authorized`,
        })
      }

      const properties = await VehicleService.fetchProperties(
        { id, pending, vin },
        req.body.properties
      )

      res.json(properties)
    } catch (err) {
      console.log('Failed to fetch vehicle data', err, 'data:', err?.response)
      res
        .status(500)
        .json({ error: 'Failed to fetch data, try removing some properties' })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params

      const vehicle = await knex('vehicles').where('id', id).first()

      if (!vehicle) {
        return res.status(404).json({ message: 'No vehicle found' })
      }

      try {
        if (vehicle.fleet_clearance) {
          await Auth.revokeFleetClearance(vehicle)
        }

        const accessToken = await Auth.getAccessToken(vehicle.id)

        await Auth.revokeToken(accessToken)
      } catch (e) {
        console.error("Failed to revoke token. Maybe it's already revoked?", e)
      }

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
