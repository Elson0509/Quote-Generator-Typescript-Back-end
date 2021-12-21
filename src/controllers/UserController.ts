import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import User from '../schemas/User'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    const users = await User.find()
    return res.json(users)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const user = await User.create({ _id: uuid(), ...req.body })
    return res.json(user)
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
