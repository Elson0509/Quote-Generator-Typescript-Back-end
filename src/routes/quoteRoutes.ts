import { Router } from 'express'
import QuoteController from '../controllers/QuoteController'
import checkauto from '../middlewares/check-auth'

const routes = Router()

routes.get('/quote', QuoteController.index)
routes.get('/quote/:id', QuoteController.find)
routes.post('/quote', checkauto, QuoteController.store)
routes.delete('/quote/:id', QuoteController.delete)
routes.post('/comment', checkauto, QuoteController.comment)
routes.post('/grade', checkauto, QuoteController.starRate)

export default routes
