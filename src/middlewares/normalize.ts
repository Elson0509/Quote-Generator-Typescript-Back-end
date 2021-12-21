import normalizeEmail from 'normalize-email'
import { Request, Response, NextFunction } from 'express'

const normalize = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'POST') {
    for (const [key, value] of Object.entries(req.body)) {
      if (key === 'email' && typeof (value) === 'string') {
        req.body[key] = normalizeEmail(value)
      }
    }
  }
}

export default normalize
