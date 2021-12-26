import { Router } from 'express'
import QuoteController from '../controllers/QuoteController'

const routes = Router()

routes.get('/quote', QuoteController.index)
routes.get('/quote/:id', QuoteController.find)
routes.post('/quote', QuoteController.store)
routes.delete('/quote/:id', QuoteController.delete)

export default routes
