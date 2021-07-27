import ConnectVehiclePage from './components/ConnectVehiclePage'
import HomePage from './components/HomePage'
import InitialConfigPage from './components/InitialConfigPage'

export const PAGES = {
  HOME: 'HOME',
  INITIAL_CONFIG: 'INITIAL_CONFIG',
  CONNECT_VEHICLE: 'CONNECT_VEHICLE',
}

const routes = [
  {
    name: PAGES.HOME,
    path: '/',
    component: HomePage,
  },
  {
    name: PAGES.INITIAL_CONFIG,
    path: '/initial-config',
    component: InitialConfigPage,
  },
  {
    name: PAGES.CONNECT_VEHICLE,
    path: '/connect',
    component: ConnectVehiclePage,
  },
]

export default routes
