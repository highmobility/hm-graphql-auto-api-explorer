import { knex } from '../database'
import { FLEET_AUTH_STATUS } from '../utils/fleet'
import Auth from './Auth'
import VehicleService from './VehicleService'

export default class WebhookService {
  static async handleClearanceChangedWebhook(vin, event) {
    if (!event) {
      console.log('handleClearanceChangedWebhook::No event found')
      return false
    }

    const newStatus = event.action
    const vehicle = await knex('vehicles').where({ vin }).first()
    if (!vehicle) {
      console.log('handleClearanceChangedWebhook::No vehicle found')
      return false
    }

    await knex('vehicles')
      .where({ vin })
      .update({
        fleet_clearance: newStatus,
        pending: newStatus !== FLEET_AUTH_STATUS.APPROVED,
      })

    if (newStatus === FLEET_AUTH_STATUS.APPROVED) {
      console.log(
        'handleClearanceChangedWebhook::getting fleet access token for vehicle:',
        { vehicle }
      )
      await Auth.getFleetVehicleAccessToken(vehicle)
      const properties = (await knex('properties').select()) || []
      const propertiesToFetch = properties.map((property) => property.unique_id)
      await VehicleService.fetchProperties(vehicle, propertiesToFetch)
    } else {
      console.log(
        'handleClearanceChangedWebhook::deleting access token',
        vehicle
      )
      await knex('access_tokens').where({ vehicle_id: vehicle.id }).del()
      await knex('vehicles').where({ vin }).update({
        pending: true,
        fleet_clearance: newStatus,
      })
    }

    return true
  }
}
