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
  updateFrequency = 15
  selectedVehicleId = null
  pinnedProperties = []
  shownProperties = []

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

  pinProperty(property) {
    const uniqueId = getPropertyUniqueId(property)
    this.pinnedProperties = uniq([...this.pinnedProperties, uniqueId])
  }

  unPinProperty(property) {
    const uniqueId = getPropertyUniqueId(property)
    this.pinnedProperties = this.pinnedProperties.filter(
      (id) => id !== uniqueId
    )
  }

  showProperty(property) {
    const uniqueId = getPropertyUniqueId(property)
    this.shownProperties = uniq([...this.shownProperties, uniqueId])
  }

  hideProperty(property) {
    const uniqueId = getPropertyUniqueId(property)
    this.shownProperties = this.shownProperties.filter((id) => id !== uniqueId)
  }

  isPropertyPinned(property) {
    const uniqueId = getPropertyUniqueId(property)
    return this.pinnedProperties.includes(uniqueId)
  }

  isPropertyShown(property) {
    const uniqueId = getPropertyUniqueId(property)
    return this.shownProperties.includes(uniqueId)
  }
}
