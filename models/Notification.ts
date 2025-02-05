import { Schema, model, models } from 'mongoose'
import { Notification } from '@/types/Notification'

const NotificationSchema = new Schema<Notification>(
  {
    message: { type: String, required: true },
    timestamp: { type: Date, required: true }
  },
  { timestamps: true }
)

const NotificationModel =
  models.Notification || model<Notification>('Notification', NotificationSchema)

export default NotificationModel
