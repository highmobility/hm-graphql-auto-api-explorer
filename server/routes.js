import { Router } from 'express'
import ConfigController from './controllers/ConfigController'

const configController = new ConfigController()

const router = new Router()
router.post('/config', configController.store)
// POST: properties/shown [1,2,3,4]
// GET: data, returns { config, properties, shownProperties, pinnedProperties }

export default router
