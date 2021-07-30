import App from './App'
import InitialConfig from './InitialConfig'
import Properties from './Properties'

const stores = {
  app: new App(),
  initialConfig: new InitialConfig(),
  properties: new Properties(),
}

export default stores
