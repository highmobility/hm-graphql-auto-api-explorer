import { makeAutoObservable } from 'mobx'
import uniq from 'lodash/uniq'

export const VIEWS = {
  GRID: 'GRID',
  LIST: 'LIST',
  MAP: 'MAP',
}

export const APP_TYPES = {
  DRIVER: 'DRIVER',
  FLEET: 'FLEET',
}

export default class Config {
  focusedInput = null
  graphQlApiConfig = ''
  clientId = ''
  clientSecret = ''
  authUrl = ''
  tokenUrl = ''
  appType = APP_TYPES.DRIVER

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

  setAppType(appType) {
    this.appType = APP_TYPES[appType] || APP_TYPES.DRIVER
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

  setPinnedProperties(propertyIds) {
    this.pinnedProperties = [...propertyIds]
  }

  setShownProperties(propertyIds) {
    this.shownProperties = [...propertyIds]
  }

  showProperties(propertyUniqueIds = []) {
    this.shownProperties = uniq([...this.shownProperties, ...propertyUniqueIds])
  }

  showProperty(propertyId) {
    this.shownProperties = uniq([...this.shownProperties, propertyId])
  }

  hideProperty(propertyId) {
    this.shownProperties = this.shownProperties.filter(
      (id) => id !== propertyId
    )
  }

  isPropertyPinned(propertyId) {
    return this.pinnedProperties.includes(propertyId)
  }

  isPropertyShown(propertyId) {
    return this.shownProperties.includes(propertyId)
  }

  setGoogleMapsApiKey(key) {
    this.googleMapsApiKey = key
  }
}
