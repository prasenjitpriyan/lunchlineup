/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import MenuItemModel from '@/models/MenuItem'
import cloudinary from '@/lib/cloudinary'

export async function GET() {
  try {
    await connectToDatabase()
    const menuItems = await MenuItemModel.find()
    return NextResponse.json(menuItems, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching menu items', error },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()

    // Parse form data
    const formData = await req.formData()
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = formData.get('price') as string
    const dietaryTags = JSON.parse(formData.get('dietaryTags') as string)
    const imageFile = formData.get('image') as File | null

    let imageUrl = ''
    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      // Upload image to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: 'uploads' }, (error, result) => {
            if (error) reject(error)
            else resolve(result)
          })
          .end(buffer)
      })

      imageUrl = (uploadResult as any).secure_url
    }

    // Save menu item in MongoDB
    const newMenuItem = await MenuItemModel.create({
      title,
      description,
      price,
      dietaryTags,
      image: imageUrl
    })

    return NextResponse.json(newMenuItem, { status: 201 })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { error: 'Failed to add menu item' },
      { status: 500 }
    )
  }
}
