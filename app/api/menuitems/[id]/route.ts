import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { getSessionUser } from '@/utils/getSessionUser'
import MenuItemModel from '@/models/MenuItem'
import cloudinary from '@/lib/cloudinary'

// GET===/api/menuitems/:id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    const menuitem = await MenuItemModel.findById(params.id)
    if (!menuitem)
      return NextResponse.json('MenuItem Not Found', { status: 404 })

    return NextResponse.json(menuitem, { status: 200 })
  } catch {
    return NextResponse.json('Something Went Wrong', { status: 500 })
  }
}

// DELETE===/api/menuitems/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.userId) {
      return NextResponse.json('User ID is required', { status: 401 })
    }

    await connectToDatabase()
    const menuitem = await MenuItemModel.findById(params.id)
    if (!menuitem)
      return NextResponse.json('MenuItem Not Found', { status: 404 })

    // Verify ownership
    if (menuitem.owner.toString() !== sessionUser.userId) {
      return NextResponse.json('Unauthorized', { status: 401 })
    }

    await menuitem.deleteOne()
    return NextResponse.json('MenuItem Deleted', { status: 200 })
  } catch {
    return NextResponse.json('Something Went Wrong', { status: 500 })
  }
}

// PUT===/api/menuitems/:id
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    const sessionUser = await getSessionUser()
    if (!sessionUser || !sessionUser.userId) {
      return NextResponse.json('User ID is required', { status: 401 })
    }

    const formData = await request.formData()

    // Get menu item to update
    const existingMenuItem = await MenuItemModel.findById(params.id)
    if (!existingMenuItem) {
      return NextResponse.json('MenuItem does not exist', { status: 404 })
    }

    // Verify ownership
    if (existingMenuItem.owner.toString() !== sessionUser.userId) {
      return NextResponse.json('Unauthorized', { status: 401 })
    }

    let imageUrl = existingMenuItem.image

    // Handle image upload with Cloudinary if a new image is provided
    const file = formData.get('image') as File | null
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

    // Prepare the updated menu item data
    const menuItemData = {
      title: formData.get('title'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      dietaryTags: JSON.parse(formData.get('dietaryTags') as string),
      image: imageUrl
    }

    // Update menu item in database
    const updatedMenuItem = await MenuItemModel.findByIdAndUpdate(
      params.id,
      menuItemData,
      { new: true }
    )

    return NextResponse.json(updatedMenuItem, { status: 200 })
  } catch {
    return NextResponse.json('Failed to update MenuItem', { status: 500 })
  }
}
