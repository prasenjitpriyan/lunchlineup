import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { getSessionUser } from '@/utils/getSessionUser'
import MenuItemModel from '@/models/MenuItem'
import cloudinary from '@/lib/cloudinary'

interface Params {
  id: string
}

// GET===/api/menuitems/:id
export const GET = async (
  request: Request,
  { params }: { params: Params }
): Promise<NextResponse> => {
  try {
    await connectToDatabase()
    const menuitem = await MenuItemModel.findById(params.id)
    if (!menuitem)
      return new NextResponse('MenuItem Not Found', { status: 404 })
    return new NextResponse(JSON.stringify(menuitem), { status: 200 })
  } catch {
    return new NextResponse('Something Went Wrong', { status: 500 })
  }
}

// DELETE===/api/menuitems/:id
export const DELETE = async ({
  params
}: {
  params: Params
}): Promise<NextResponse> => {
  try {
    const menuItemId = params.id
    const sessionUser = await getSessionUser()

    // Check for session
    if (!sessionUser || !sessionUser.userId) {
      return new NextResponse('User ID is required', { status: 401 })
    }
    const { userId } = sessionUser
    await connectToDatabase()

    const menuitem = await MenuItemModel.findById(menuItemId)
    if (!menuitem)
      return new NextResponse('MenuItem Not Found', { status: 404 })

    // Verify ownership
    if (menuitem.owner.toString() !== userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    await menuitem.deleteOne()

    return new NextResponse('MenuItem Deleted', { status: 200 })
  } catch {
    return new NextResponse('Something Went Wrong', { status: 500 })
  }
}

// PUT===/api/menuitems/:id
export const PUT = async (
  request: Request,
  { params }: { params: Params }
): Promise<NextResponse> => {
  try {
    await connectToDatabase()
    const sessionUser = await getSessionUser()
    if (!sessionUser || !sessionUser.userId) {
      return new NextResponse('User ID is required', { status: 401 })
    }

    const { id } = params
    const { userId } = sessionUser
    const formData = await request.formData()

    // Get menu item to update
    const existingMenuItem = await MenuItemModel.findById(id)

    if (!existingMenuItem) {
      return new NextResponse('MenuItem does not exist', { status: 404 })
    }

    // Verify ownership
    if (existingMenuItem.owner.toString() !== userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    let imageUrl = ''

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
      price: formData.get('price'),
      dietaryTags: formData.get('dietaryTags'),
      image: imageUrl || existingMenuItem.image
    }

    // Update menu item in database
    const updatedMenuItem = await MenuItemModel.findByIdAndUpdate(
      id,
      menuItemData,
      { new: true }
    )

    return new NextResponse(JSON.stringify(updatedMenuItem), { status: 200 })
  } catch {
    return new NextResponse('Failed to update MenuItem', { status: 500 })
  }
}
