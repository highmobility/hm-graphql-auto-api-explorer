import { Router } from 'express'
import AppConfigController from './controllers/AppConfigController'
import AuthController from './controllers/AuthController'
import VehiclesController from './controllers/VehiclesController'
import ConfigController from './controllers/ConfigController'
import PropertiesController from './controllers/PropertiesController'

const appConfigController = new AppConfigController()
const authController = new AuthController()
const vehiclesController = new VehiclesController()
const configController = new ConfigController()
const propertiesController = new PropertiesController()

const router = new Router()

router.post('/app-config', appConfigController.store)
router.get('/app-config', appConfigController.get)
router.delete('/app-config', appConfigController.reset)

router.put('/config', configController.update)
router.get('/config', configController.get)

router.get('/properties', propertiesController.get)
router.put('/properties', propertiesController.update)

router.get('/vehicles', vehiclesController.index)
router.post('/vehicles/data/:id', vehiclesController.getData)
router.delete('/vehicles/:id/delete', vehiclesController.delete)

router.get('/auth/callback', authController.oAuthCallback)
router.get('/auth/fleet', authController.fleetAuth)

export default router
