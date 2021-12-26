import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import Quote from '../schemas/Quote'

class QuoteController {
  public async index (req: Request, res: Response): Promise<Response> {
    const quotes = await Quote.find()
    return res.json(quotes)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const { quote, authorId, authorName, genreId, genreName, userId, userName } = req.body

    try {
      const quoteSaved = await Quote.create(
        {
          _id: uuid(),
          quote,
          author: {
            _id: authorId,
            name: authorName
          },
          genre: {
            _id: genreId,
            genre: genreName
          },
          userProposing: {
            _id: userId,
            name: userName
          }
        }
      )
      return res.json(quoteSaved)
    } catch (err) {
      return res.status(400).send({
        message: 'There was an error. Try again.'
      })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const response = await Quote.findByIdAndDelete(req.params.id).exec()
    return res.json(response)
  }

  public async find (req: Request, res: Response): Promise<Response> {
    try {
      const quote = await Quote.findById(req.params.id).exec()
      if (!quote) {
        return res.status(400).send({
          message: 'Quote not found.'
        })
      }
      return res.json(quote)
    } catch (err) {
      return res.status(400).send({
        message: 'There was an error. Try again.'
      })
    }
  }

  // TODO comments
  // TODO stars rate
}

export default new QuoteController()
