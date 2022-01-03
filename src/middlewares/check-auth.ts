import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const checkauto = (req: Request, res: Response, next: NextFunction) => {
  // accessing token in the header
  try {
    const token = req.headers.authorization.split(' ')[1] // Authorization: 'Bearer TOKEN'
    if (!token) {
      return res.status(401).send({
        message: 'Error in authentication.'
      })
    }
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_PRIVATE_KEY) // validating token
    req.userData = {
      id: decodedToken.userId,
      username: decodedToken.username,
    } // after this point this information can be accessed
    next()
  } catch (err) {
    return res.status(401).send({
      message: 'Error in authentication.'
    })
  }
}

export default checkauto
