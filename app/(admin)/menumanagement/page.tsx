'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { MenuItem } from '@/types/MenuItem'

export default function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    price: '',
    dietaryTags: [] as string[],
    image: null as File | null
  })

  // Fetch menu items from API
  useEffect(() => {
    async function fetchMenuItems() {
      try {
        const res = await fetch('/api/menuitems')
        if (!res.ok) throw new Error('Failed to fetch menu items')
        const data = await res.json()
        setMenuItems(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchMenuItems()
  }, [])

  // Handle text input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setNewItem((prev) => ({
      ...prev,
      [name]:
        name === 'dietaryTags'
          ? value.split(',').map((tag) => tag.trim())
          : value
    }))
  }

  // Handle image file input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setNewItem((prev) => ({ ...prev, image: file }))
  }

  // Handle form submission
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', newItem.title)
    formData.append('description', newItem.description)
    formData.append('price', newItem.price)
    formData.append('dietaryTags', JSON.stringify(newItem.dietaryTags))
    if (newItem.image) formData.append('image', newItem.image)

    try {
      const res = await fetch('/api/menuitems', {
        method: 'POST',
        body: formData
      })
      if (!res.ok) throw new Error('Failed to add menu item')

      const newMenuItem = await res.json()
      setMenuItems([...menuItems, newMenuItem])
      setShowAddModal(false)
      setNewItem({
        title: '',
        description: '',
        price: '',
        dietaryTags: [],
        image: null
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="px-4 md:px-20 py-20 bg-my-color-02 text-my-color-04 min-h-screen">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-my-color-04 mb-4 sm:mb-0">
          Menu Management
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-my-color-01 text-my-color-04 py-3 px-6 rounded-md shadow-md hover:bg-my-color-06 transition-colors duration-300"
        >
          Add New Menu Item
        </button>
      </header>

      {/* Table */}
      <section className="overflow-x-auto bg-my-color-03 shadow-md rounded-lg">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-my-color-01 text-white">
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Dietary Tags</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr
                key={item._id}
                className="border-t border-my-color-01 hover:bg-my-color-02 transition-colors"
              >
                <td className="px-6 py-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="rounded-md shadow-md"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-my-color-04">
                  {item.title}
                </td>
                <td className="px-6 py-4 text-my-color-04">{item.price}</td>
                <td className="px-6 py-4">
                  {item.dietaryTags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs text-white bg-gray-500 px-2 py-1 rounded-full mr-2"
                    >
                      {tag}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button className="bg-yellow-500 text-white py-1 px-4 rounded-md hover:bg-yellow-600 transition-colors">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition-colors">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 p-4">
          <div className="bg-my-color-03 p-6 rounded-lg shadow-lg w-full max-w-md relative">
            {/* Close Button */}
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>

            <h3 className="text-xl font-semibold mb-4">Add New Menu Item</h3>
            <form onSubmit={handleAddItem}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newItem.title}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                  placeholder="Enter meal title"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={newItem.description}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                  placeholder="Enter meal description"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newItem.price}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                  placeholder="Enter price"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Dietary Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="dietaryTags"
                  value={newItem.dietaryTags.join(', ')}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                  placeholder="Vegan, Gluten-Free"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border p-2 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="bg-my-color-01 text-white py-2 px-4 rounded-md"
              >
                Add Item
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
