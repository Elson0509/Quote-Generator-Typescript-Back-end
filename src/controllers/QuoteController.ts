import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import Quote from '../schemas/Quote'

class QuoteController {
  public async index (req: Request, res: Response): Promise<Response> {
    const quotes = await Quote.find()
    return res.json(quotes)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const { quote, authorId, authorName, genreId, genreName } = req.body

    try {
      const quoteSaved = await Quote.create({
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
          _id: req.userData.id,
          name: req.userData.username
        }
      })
      return res.json(quoteSaved)
    } catch (err) {
      return res.status(400).send({
        message: 'There was an error. Try again.',
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

  public async comment (req: Request, res: Response): Promise<Response> {
    const { comment, quoteId } = req.body
    try {
      const quote = await Quote.findById(quoteId).exec()
      if (!quote) {
        return res.status(400).send({
          message: 'Quote not found.'
        })
      }
      quote.comments.push({
        _id: uuid(),
        userId: req.userData.id,
        username: req.userData.username,
        comment
      })
      quote
        .save()
        .then(() => {
          return res.json(quote)
        })
        .catch(() => {
          return res.status(400).send({
            message: 'There was an error. Try again.'
          })
        })
    } catch (err) {
      return res.status(400).send({
        message: 'There was an error. Try again.'
      })
    }
  }

  public async starRate (req: Request, res: Response): Promise<Response> {
    const { grade, quoteId } = req.body
    try {
      const quote = await Quote.findById(quoteId).exec()
      if (!quote) {
        return res.status(400).send({
          message: 'Quote not found.'
        })
      }
      const stars = [...quote.stars]
      console.log(stars)
      const userRate = stars.find(el => el._idUser === req.userData.id)
      if (userRate) {
        // It already had a rate
        userRate.grade = grade
      } else {
        stars.push({ _idUser: req.userData.id, grade })
      }
      quote.stars = stars

      quote
        .save()
        .then(() => {
          return res.json(quote)
        })
        .catch(() => {
          return res.status(400).send({
            message: 'There was an error. Try again.'
          })
        })
    } catch (err) {
      return res.status(400).send({
        message: 'There was an error. Try again.'
      })
    }
  }
}

export default new QuoteController()
