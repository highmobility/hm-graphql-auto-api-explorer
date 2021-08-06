import { Router } from 'express'
import ConfigController from './controllers/ConfigController'
import OauthController from './controllers/OauthController'
import VehiclesController from './controllers/VehiclesController'

const configController = new ConfigController()
const oAuthController = new OauthController()
const vehiclesController = new VehiclesController()

const router = new Router()
router.post('/config', configController.store)
router.get('/vehicles', vehiclesController.index)
router.get('/auth/callback', oAuthController.callback)
// POST: properties/shown [1,2,3,4]
// GET: data, returns { properties, shownProperties, pinnedProperties }

export default router
