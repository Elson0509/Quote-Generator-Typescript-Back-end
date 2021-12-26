import { Router } from 'express'
import AuthorController from '../controllers/AuthorController'

const routes = Router()

routes.get('/author', AuthorController.index)
routes.get('/author/:id', AuthorController.find)
routes.post('/author', AuthorController.store)
routes.delete('/author/:id', AuthorController.delete)

export default routes
