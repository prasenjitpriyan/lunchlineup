import { Document, Types } from 'mongoose'

export interface MenuItem extends Document {
  title: string
  description: string
  price: number
  dietaryTags: string[]
  image: string
  createdBy: Types.ObjectId
}
