import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import User from '../schemas/User'
import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import mailer from '../config/mailer'
import path from 'path'

dotenv.config()

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const users = await User.find()
    return res.json(users)
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { email, username, password } = req.body

    try {
      // check if email already stored
      const existedEmail = await User.findOne({ email })
      if (existedEmail) {
        return res.status(400).send({
          message: 'Email already in use.',
        })
      }

      // check if username already stored
      const existedUsername = await User.findOne({ username: username })
      if (existedUsername) {
        return res.status(400).send({
          message: 'Username already in use.',
        })
      }

      // creating activationtoken
      const activationtoken = crypto.randomBytes(20).toString('hex')

      // hashing password
      let hashedPassword: string
      try {
        hashedPassword = await bcrypt.hash(password, 12)
      } catch (err) {
        return res.status(500).send({
          message:
            'There was a problem when creating the user. please try again.',
        })
      }

      // storing user
      const user = await User.create({
        _id: uuid(),
        email,
        username,
        password: hashedPassword,
        activationtoken,
        activated: false,
      })

      // sending welcome email
      mailer
        .send({
          template: path.resolve('./src/views/mail/auth/welcomeuser'),
          message: {
            to: email,
          },
          locals: { token: activationtoken, name: username },
        })
        .catch((err) => {
          console.log(err)
          return res.status(400).send({
            message: 'There was an error sending welcome email. Try again.',
          })
        })

      return res.json(user)
    } catch (err) {
      return res.status(400).send({
        message: 'There was an error. Try again.',
      })
    }
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const user = await User.findById(req.params.id).exec()
    return res.json(user || {})
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const response = await User.findByIdAndDelete(req.params.id).exec()
    return res.json(response)
  }

  public async activate(req: Request, res: Response): Promise<Response> | void {
    const { token } = req.params
    // check if email already stored
    try {
      const existedTokenUser = await User.findOne({ activationtoken: token })
      if (existedTokenUser) {
        existedTokenUser.activated = true
        existedTokenUser.activationtoken = null
        existedTokenUser
          .save()
          .then(() => {
            // return res.json('Ativacted')
            return res.render(
              path.resolve('./src/views/mail/auth/activated/activated.ejs')
            )
          })
          .catch(() => {
            return res.render(
              path.resolve(
                './src/views/mail/auth/error_activation/error_activation.ejs'
              )
            )
          })
      } else {
        return res.render(
          path.resolve(
            './src/views/mail/auth/error_activation/error_activation.ejs'
          )
        )
      }
    } catch (err) {
      return res.status(400).send({
        message: 'There was an error. Try again.',
      })
    }
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    let userFound
    try {
      userFound = await User.findOne({ email, activated: true })
    } catch (err) {
      return res.status(500).send({
        message: 'There is a problem in the database. Try again',
      })
    }
    if (userFound) {
      // user found
      // validating hash
      let isValidPassword = false
      try {
        isValidPassword = await bcrypt.compare(password, userFound.password)
      } catch (error) {
        return res.status(500).send({
          message: 'Login error. Please verify your credencials',
        })
      }
      if (isValidPassword) {
        let token: string
        try {
          token = jwt.sign(
            { userId: userFound._id, username: userFound.username },
            process.env.JWT_TOKEN_PRIVATE_KEY
          )
        } catch (error) {
          return res.status(500).send({
            message: 'There is an error when trying to log in. Try again',
          })
        }
        res.send({
          userId: userFound._id,
          username: userFound.username,
          token,
        })
      } else {
        return res.status(400).send({
          message: 'Login error. Please verify your credencials',
        })
      }
    } else {
      return res.status(404).send({
        message: 'User not found',
      })
    }
  }

  public async forgotPass (req: Request, res: Response): Promise<Response> {
    const { email } = req.body
    let userFound
    try {
      userFound = await User.findOne({ email, activated: true })
    } catch (err) {
      return res.status(500).send({
        message: 'There is a problem in the database. Try again.',
      })
    }

    if (!userFound) {
      return res.status(400).send({
        message: 'User not found.',
      })
    }

    // creating token to reset password
    const token = crypto.randomBytes(20).toString('hex')

    // updating user with new information
    userFound.resetToken = token
    userFound
      .save()
      .then(() => {
        // sending email
        mailer
          .send({
            template: path.resolve('./src/views/mail/auth/reseting_pass'),
            message: {
              to: email
            },
            locals: { token, name: userFound.username }
          })
          .then(() => {
            return res.send({
              message: 'An email has been sent. Verify your mailbox, please.'
            })
          })
          .catch((err) => {
            console.log(err)
            return res.status(400).send({
              message: 'There was an error sending welcome email. Try again.'
            })
          })
      })
      .catch(() => {
        return res.status(500).send({
          message: 'There is a problem in the database. Try again.'
        })
      })
  }

  public async resetPass (req: Request, res: Response): Promise<Response> {
    const { email, token, password } = req.body
    let userFound
    try {
      userFound = await User.findOne({ email, resetToken: token, activated: true })
    } catch (err) {
      return res.status(500).send({
        message: 'There is a problem in the database. Try again.'
      })
    }

    if (!userFound) {
      return res.status(400).send({
        message: 'User not found.'
      })
    }

    // updating user with new information
    userFound.resetToken = null
    userFound.password = await bcrypt.hash(password, 12)
    userFound
      .save()
      .then(() => {
        return res.send({
          message: 'Password successfully updated.'
        })
      })
      .catch(() => {
        return res.status(500).send({
          message: 'There is a problem in the database. Try again.'
        })
      })
  }
}

export default new UserController()
