import { Router } from 'express'
import GenreController from '../controllers/GenreController'

const routes = Router()

routes.get('/genre', GenreController.index)
routes.get('/genre/:id', GenreController.find)
routes.post('/genre', GenreController.store)
routes.delete('/genre/:id', GenreController.delete)

export default routes
