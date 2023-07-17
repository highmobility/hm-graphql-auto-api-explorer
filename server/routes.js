import { Router } from 'express'
import AppConfigController from './controllers/AppConfigController'
import AuthController from './controllers/AuthController'
import VehiclesController from './controllers/VehiclesController'
import ConfigController from './controllers/ConfigController'
import PropertiesController from './controllers/PropertiesController'
import LogsController from './controllers/LogsController'
import WebhookController from './controllers/WebhookController'

const appConfigController = new AppConfigController()
const authController = new AuthController()
const vehiclesController = new VehiclesController()
const configController = new ConfigController()
const propertiesController = new PropertiesController()
const logsController = new LogsController()
const webhookController = new WebhookController()

const router = new Router()

router.post('/app-config', appConfigController.store)
router.get('/app-config', appConfigController.get)
router.delete('/app-config', appConfigController.reset)

router.put('/config', configController.update)
router.get('/config', configController.get)

router.get('/properties', propertiesController.get)
router.put('/properties', propertiesController.update)

router.get('/vehicles', vehiclesController.index)
router.get('/vehicles/fleet', vehiclesController.clearedFleetVehicles)
router.get('/vehicles/:id/refresh', vehiclesController.refresh)
router.post('/vehicles/:id/data', vehiclesController.getData)
router.delete('/vehicles/:id/delete', vehiclesController.delete)

router.get('/auth/callback', authController.oAuthCallback)
router.post('/auth/fleet', authController.fleetAuth)

router.get('/logs/csv', logsController.csv)

router.post('/webhook', webhookController.handleIncomingWebhook)

export default router
