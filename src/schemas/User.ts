import { Schema, model, Document } from 'mongoose'

interface UserInterface extends Document {
  _id?: string
  email?: string
  username?: string
  password?: string
  resetPass?: string
  activationtoken?: string
  activated: boolean
}

const UserSchema = new Schema(
  {
    _id: String,
    email: String,
    username: String,
    password: String,
    resetPass: String,
    activationtoken: String,
    activated: Boolean
  },
  {
    timestamps: true
  }
)

export default model<UserInterface>('User', UserSchema)
