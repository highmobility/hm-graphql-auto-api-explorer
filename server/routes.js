import { Router } from 'express'
import AppConfigController from './controllers/AppConfigController'
import OauthController from './controllers/OauthController'
import VehiclesController from './controllers/VehiclesController'

const appConfigController = new AppConfigController()
const oAuthController = new OauthController()
const vehiclesController = new VehiclesController()
const configController = new ConfigController()

const router = new Router()

router.post('/app-config', appConfigController.store)
router.get('/app-config', appConfigController.get)

router.put('/config', configController.update)
router.get('/config', configController.get)
// POST: /properties/pin
// DELETE: /properties/pin

router.get('/vehicles', vehiclesController.index)
router.post('/vehicles/data/:id', vehiclesController.getData)
router.delete('/vehicles/:id/delete', vehiclesController.delete)
router.get('/auth/callback', oAuthController.callback)

export default router
