import { Router } from 'express'
import UserController from './controllers/UserController'

const routes = Router()

routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.find)
routes.post('/users', UserController.store)
routes.delete('/users/:id', UserController.delete)

export default routes
