import { Router } from 'express'
import ConfigController from './controllers/ConfigController'

const configController = new ConfigController()

const router = new Router()
router.post('/config', configController.store)

export default router
