import { Schema, model, Document } from 'mongoose'

interface AuthorInterface extends Document {
  _id: string,
  name: string
}

const AuthorSchema = new Schema(
  {
    _id: String,
    name: String
  },
  {
    timestamps: true
  }
)

export default model<AuthorInterface>('Author', AuthorSchema)
