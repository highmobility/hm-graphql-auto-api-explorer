import { makeAutoObservable } from 'mobx'
import uniq from 'lodash/uniq'
import { getPropertyUniqueId } from '../utils/properties'

export const ENVIRONMENTS = {
  DEVELOP: 'DEVELOP',
  PRODUCTION: 'PRODUCTION',
}

export const VIEWS = {
  GRID: 'GRID',
  LIST: 'LIST',
  MAP: 'MAP',
}

export default class Config {
  focusedInput = null
  env = ENVIRONMENTS.DEVELOP
  appId = '40AAAAC3C6467F0393FFD528'
  clientPrivateKey = ''
  clientCertificate = ``
  clientId = 'a415c1ec-ca0b-4340-a3fd-dbad217608ed'
  clientSecret = 'G7ioWDWJlRHvRTD6zV0dcaMS2822FxeS'
  authUrl =
    'https://sandbox.owner-panel.develop.high-mobility.net/hm_cloud/o/d36635af-a403-425e-82dd-1415557e376e/oauth'
  tokenUrl =
    'https://sandbox.api.develop.high-mobility.net/v1/d36635af-a403-425e-82dd-1415557e376e/oauth/access_tokens'

  view = VIEWS.GRID
  updateFrequency = 5
  selectedVehicleId = null
  pinnedProperties = [
    'charging.batteryCurrent',
    'charging.chargeMode',
    'diagnostics.engineOilTemperature',
    'diagnostics.batteryLevel',
    'diagnostics.speed',
  ]
  shownProperties = [
    'charging.batteryCurrent',
    'charging.chargeMode',
    'diagnostics.engineOilTemperature',
    'diagnostics.batteryLevel',
    'diagnostics.speed',
    'hood.lock',
    'vehicleLocation.coordinates',
    'diagnostics.odometer',
    'doors.positions',
    'diagnostics.fuelLevel',
    // 'vehicleLocation.heading', - waiting for api update
    'seats.personsDetected',
  ]

  constructor() {
    makeAutoObservable(this)
  }

  setFocusedInput(value) {
    this.focusedInput = value
  }

  setEnv(value) {
    this.env = value
  }

  setAppId(value) {
    this.appId = value
  }

  setClientPrivateKey(value) {
    this.clientPrivateKey = value
  }

  setClientCertificate(value) {
    this.clientCertificate = value
  }

  setClientId(value) {
    this.clientId = value
  }

  setClientSecret(value) {
    this.clientSecret = value
  }

  setAuthUrl(value) {
    this.authUrl = value
  }

  setTokenUrl(value) {
    this.tokenUrl = value
  }

  setView(view) {
    this.view = VIEWS[view] || VIEWS.GRID
  }

  setUpdateFrequency(frequency) {
    this.updateFrequency = frequency
  }

  setSelectedVehicle(vehicleId) {
    this.selectedVehicleId = vehicleId
  }

  pinProperty(propertyId) {
    this.pinnedProperties = uniq([...this.pinnedProperties, propertyId])
  }

  unPinProperty(propertyId) {
    this.pinnedProperties = this.pinnedProperties.filter(
      (id) => id !== propertyId
    )
  }

  showProperty(propertyConfig) {
    const uniqueId = getPropertyUniqueId(propertyConfig)
    this.shownProperties = uniq([...this.shownProperties, uniqueId])
  }

  hideProperty(propertyConfig) {
    const uniqueId = getPropertyUniqueId(propertyConfig)
    this.shownProperties = this.shownProperties.filter((id) => id !== uniqueId)
  }

  isPropertyPinned(propertyId) {
    return this.pinnedProperties.includes(propertyId)
  }

  isPropertyShown(propertyConfig) {
    const uniqueId = getPropertyUniqueId(propertyConfig)
    return this.shownProperties.includes(uniqueId)
  }
}
