import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import Genre from '../schemas/Genre'

class GenreController {
  public async index (req: Request, res: Response): Promise<Response> {
    const genres = await Genre.find()
    return res.json(genres)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const { name } = req.body

    try {
      const genre = await Genre.create({ _id: uuid(), name })
      return res.json(genre)
    } catch (err) {
      return res.status(400).send({
        message: 'There was an error. Try again.'
      })
    }
  }

  public async find (req: Request, res: Response): Promise<Response> {
    try {
      const genre = await Genre.findById(req.params.id).exec()
      if (!genre) {
        return res.status(400).send({
          message: 'Genre not found.'
        })
      }
      return res.json(genre)
    } catch (err) {
      return res.status(400).send({
        message: 'There was an error. Try again.'
      })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const response = await Genre.findByIdAndDelete(req.params.id).exec()
      return res.json(response)
    } catch (err) {
      return res.status(400).send({
        message: 'There was an error. Try again.'
      })
    }
  }
}

export default new GenreController()
