import { Schema, model } from 'mongoose'
import { Iuser } from '../types/userType'

const userSchema: Schema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean },
})

export default model<Iuser>('user', userSchema)
