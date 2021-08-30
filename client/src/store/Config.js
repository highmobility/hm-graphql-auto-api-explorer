import { makeAutoObservable } from 'mobx'
import uniq from 'lodash/uniq'
import { getPropertyUniqueId } from '../utils/properties'

export const VIEWS = {
  GRID: 'GRID',
  LIST: 'LIST',
  MAP: 'MAP',
}

export default class Config {
  focusedInput = null
  graphQlApiConfig = ''
  clientId = ''
  clientSecret = ''
  authUrl = ''
  tokenUrl = ''

  view = VIEWS.GRID
  updateFrequency = 15
  selectedVehicleId = null
  pinnedProperties = ['diagnostics.speed']
  shownProperties = [
    'adas.status',
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
    'vehicleLocation.heading',
    'seats.personsDetected',
    'charging.status',
    'charging.pluggedIn',
  ]
  googleMapsApiKey = ''

  constructor() {
    makeAutoObservable(this)
  }

  setFocusedInput(value) {
    this.focusedInput = value
  }

  setGraphQlApiConfig(graphQlApiConfig) {
    this.graphQlApiConfig = graphQlApiConfig
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
    this.updateFrequency = frequency || 15
  }

  setSelectedVehicleId(vehicleId) {
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

  showProperties(propertyUniqueIds = []) {
    this.shownProperties = uniq([...this.shownProperties, ...propertyUniqueIds])
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

  setGoogleMapsApiKey(key) {
    this.googleMapsApiKey = key
  }
}
