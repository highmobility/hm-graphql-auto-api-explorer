import App from './App'
import Config from './Config'
import Properties from './Properties'
import Vehicles from './Vehicles'

const stores = {
  app: new App(),
  config: new Config(),
  properties: new Properties(),
  vehicles: new Vehicles(),
}

export default stores
