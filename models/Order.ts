import { Schema, model, models } from 'mongoose'
import { Order } from '@/types/Order'

const OrderSchema = new Schema<Order>(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    meal: { type: String, required: true },
    status: { type: String, enum: ['Ordered', 'Pending'], required: true }
  },
  { timestamps: true }
)

const OrderModel = models.Order || model<Order>('Order', OrderSchema)

export default OrderModel
