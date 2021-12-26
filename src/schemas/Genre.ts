import { Schema, model, Document } from 'mongoose'

interface GenreInterface extends Document {
  _id: string,
  name: string
}

const GenreSchema = new Schema(
  {
    _id: String,
    name: String
  },
  {
    timestamps: true
  }
)

export default model<GenreInterface>('Genre', GenreSchema)
