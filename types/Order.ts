import { Document, Types } from 'mongoose'

export type OrderStatus = 'Ordered' | 'Pending'

export interface Order extends Document {
  employeeId: Types.ObjectId
  employeeName: string
  meal: string
  status: OrderStatus
}
