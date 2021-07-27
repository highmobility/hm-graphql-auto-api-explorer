import { makeAutoObservable } from 'mobx'

export const ENVIRONMENTS = {
  DEVELOP: 'DEVELOP',
  PRODUCTION: 'PRODUCTION',
}

export default class InitialConfig {
  focusedInput = null
  env = ENVIRONMENTS.DEVELOP
  appId = ''
  clientPrivateKey = ''
  clientCertificate = ''
  clientId = ''
  clientSecret = ''
  authUrl = ''
  tokenUrl = ''

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
}
