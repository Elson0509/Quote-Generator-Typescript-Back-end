import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import Author from '../schemas/Author'

class AuthorController {
  public async index (req: Request, res: Response): Promise<Response> {
    const authors = await Author.find()
    return res.json(authors)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const { name } = req.body

    try {
      const author = await Author.create({ _id: uuid(), name })
      return res.json(author)
    } catch (err) {
      return res.status(400).send({
        message: 'There was an error. Try again.'
      })
    }
  }

  public async find (req: Request, res: Response): Promise<Response> {
    try {
      const author = await Author.findById(req.params.id).exec()
      if (!author) {
        return res.status(400).send({
          message: 'Author not found.'
        })
      }
      return res.json(author)
    } catch (err) {
      return res.status(400).send({
        message: 'There was an error. Try again.'
      })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const response = await Author.findByIdAndDelete(req.params.id).exec()
      return res.json(response)
    } catch (err) {
      return res.status(400).send({
        message: 'There was an error. Try again.'
      })
    }
  }
}

export default new AuthorController()
