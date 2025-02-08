import { Schema, model, models } from 'mongoose'
import { MenuItem } from '@/types/MenuItem'

const MenuItemSchema = new Schema<MenuItem>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    dietaryTags: { type: [String], required: true },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/pd420/image/upload/v1738992066/uploads/aib2ituznkc1ktsibmh6.jpg'
    }
  },
  { timestamps: true }
)

const MenuItemModel =
  models.MenuItem || model<MenuItem>('MenuItem', MenuItemSchema)

export default MenuItemModel
