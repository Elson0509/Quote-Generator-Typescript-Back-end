import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import User from '../schemas/User'
// import * as dotenv from 'dotenv'
// import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    console.log('index')
    const users = await User.find()
    return res.json(users)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const { email, username, password } = req.body

    try {
      // check if email already stored
      const existedEmail = await User.findOne({ email })
      if (existedEmail) {
        return res.status(400).send({
          message: 'Email already in use.'
        })
      }

      // check if username already stored
      const existedUsername = await User.findOne({ username: username })
      console.log(existedUsername)
      if (existedUsername) {
        return res.status(400).send({
          message: 'Username already in use.'
        })
      }

      // creating activationtoken
      const activationtoken = crypto.randomBytes(20).toString('hex')

      // hashing password
      let hashedPassword : string
      try {
        hashedPassword = await bcrypt.hash(password, 12)
      } catch (err) {
        return res.status(500).send({
          message: 'There was a problem when creating the user. please try again.'
        })
      }

      // storing user
      const user = await User.create({
        _id: uuid(),
        email,
        username,
        password: hashedPassword,
        activationtoken
      })

      // TODO send email

      return res.json(user)
    } catch (err) {
      return res.status(400).send({
        message: 'There was an error. Try again.'
      })
    }
  }

  public async find (req: Request, res: Response): Promise<Response> {
    const user = await User.findById(req.params.id).exec()
    return res.json(user || {})
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const response = await User.findByIdAndDelete(req.params.id).exec()
    return res.json(response)
  }
}

export default new UserController()
