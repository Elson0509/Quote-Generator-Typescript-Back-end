import { Schema, model, Document } from 'mongoose'

interface author {
  _id: string,
  name: string
}

interface comment {
  _id: string,
  userId: string,
  comment: string
}

interface genre {
  _id: string,
  genre: string
}

interface userProposed {
  _id: string,
  name: string
}

interface star {
  _idUser: string,
  grade: number
}

interface QuoteInterface extends Document {
  _id?: string
  quote?: string
  author?: author
  comments?: comment[]
  genre?: genre
  userProposed?: userProposed
  stars?: star[]
}

const QuoteSchema = new Schema(
  {
    _id: String,
    quote: String,
    author: { _id: String, name: String },
    comments: [{ _id: String, userId: String, comment: String }],
    genre: { _id: String, genre: String },
    userProposed: { _id: String, name: String },
    stars: [{ _idUser: String, grade: Number }]
  },
  {
    timestamps: true
  }
)

export default model<QuoteInterface>('Quote', QuoteSchema)
