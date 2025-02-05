import { Schema, model, models } from 'mongoose'
import { MenuItem } from '@/types/MenuItem'

const MenuItemSchema = new Schema<MenuItem>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    dietaryTags: { type: [String], required: true },
    image: { type: String },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

const MenuItemModel =
  models.MenuItem || model<MenuItem>('MenuItem', MenuItemSchema)

export default MenuItemModel
