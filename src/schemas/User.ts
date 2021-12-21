import { Schema, model, Document } from 'mongoose'

interface UserInterface extends Document {
  _id?: string
  email?: string
  userName?: string
  password?: string
  resetPass?: string
  activatePass?: string
}

const UserSchema = new Schema(
  {
    _id: String,
    email: String,
    userName: String,
    password: String,
    resetPass: String,
    activatePass: String
  },
  {
    timestamps: true
  }
)

export default model<UserInterface>('User', UserSchema)
