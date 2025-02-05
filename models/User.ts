import { Schema, model, models, Document } from 'mongoose'
import { User } from '@/types/User'

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required']
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    role: {
      type: String,
      default: 'employee'
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const UserModel = models.User || model<User>('User', UserSchema)

export default UserModel
