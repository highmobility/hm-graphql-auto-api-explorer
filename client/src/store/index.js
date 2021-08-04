import App from './App'
import Config from './Config'
import Properties from './Properties'

const stores = {
  app: new App(),
  config: new Config(),
  properties: new Properties(),
}

export default stores
