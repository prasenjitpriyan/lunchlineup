import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import MenuItemModel from '@/models/MenuItem'
import cloudinary from '@/lib/cloudinary'

export async function GET() {
  try {
    await connectToDatabase()
    const menuItems = await MenuItemModel.find().populate('createdBy')
    return NextResponse.json(menuItems, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching menu items', error },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase()
    const formData = await req.formData()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = Number(formData.get('price'))
    const dietaryTags = JSON.parse(formData.get('dietaryTags') as string)
    const file = formData.get('image') as File | null

    let imageUrl = ''

    if (file) {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const uploadResponse = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'uploads' },
            (error, result) => {
              if (error) return reject(error)
              if (result) return resolve(result)
              reject(new Error('No result from Cloudinary'))
            }
          )
          stream.end(buffer)
        }
      )

      imageUrl = uploadResponse.secure_url
    }

    const newMenuItem = new MenuItemModel({
      title,
      description,
      price,
      dietaryTags,
      image: imageUrl
    })

    await newMenuItem.save()
    return NextResponse.json(newMenuItem, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating menu item', error },
      { status: 500 }
    )
  }
}
