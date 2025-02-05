import { Document } from 'mongoose'

export interface Notification extends Document {
  message: string
  timestamp: Date
}
