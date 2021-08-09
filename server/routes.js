import { Router } from 'express'
import ConfigController from './controllers/ConfigController'
import OauthController from './controllers/OauthController'
import VehiclesController from './controllers/VehiclesController'
import GraphQlService from './services/GraphQlService'

const configController = new ConfigController()
const oAuthController = new OauthController()
const vehiclesController = new VehiclesController()

const router = new Router()

router.post('/config', configController.store)
router.get('/vehicles', vehiclesController.index)
router.get('/auth/callback', oAuthController.callback)
router.post('/vehicle-data/:vehicleId', vehiclesController.getData)

export default router
