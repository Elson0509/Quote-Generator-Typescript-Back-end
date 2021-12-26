import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import Quote from '../schemas/Quote'
import * as dotenv from 'dotenv'

dotenv.config()

class QuoteController {
  public async store (req: Request, res: Response): Promise<Response> {
    
  }
}

export default new QuoteController()
