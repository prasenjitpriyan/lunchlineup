'use client'

import Image from 'next/image'
import { useState } from 'react'

const menuItems = [
  {
    id: 1,
    title: 'Grilled Chicken Salad',
    description: 'Fresh chicken with mixed greens, vinaigrette',
    price: '$12.99',
    dietaryTags: ['Gluten-Free'],
    image: '/my.webp'
  },
  {
    id: 2,
    title: 'Vegan Buddha Bowl',
    description: 'Rice, chickpeas, avocado, veggies, and tahini dressing',
    price: '$10.50',
    dietaryTags: ['Vegan', 'Gluten-Free'],
    image: '/my.webp'
  },
  {
    id: 3,
    title: 'Beef Burrito',
    description:
      'Seasoned beef wrapped in a soft tortilla with cheese and salsa',
    price: '$11.00',
    dietaryTags: ['Contains Dairy'],
    image: '/my.webp'
  },
  {
    id: 4,
    title: 'Vegetarian Pizza',
    description: 'A delicious pizza topped with tomatoes, cheese, and veggies',
    price: '$13.50',
    dietaryTags: ['Vegetarian'],
    image: '/my.webp'
  }
]

export default function MenuManagementPage() {
  const [showAddModal, setShowAddModal] = useState(false)

  const handleDelete = (id: number) => {
    // Add delete functionality here (e.g., API call)
    console.log(`Deleting item with ID: ${id}`)
  }

  const handleEdit = (id: number) => {
    // Redirect to edit page or open modal
    console.log(`Editing item with ID: ${id}`)
  }

  return (
    <div className="px-4 md:px-20 py-20 bg-my-color-02 text-my-color-04 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Menu Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Add New Menu Item
        </button>
      </header>

      {/* Menu List */}
      <section>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Dietary Tags</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-6 py-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                </td>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">{item.price}</td>
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
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-yellow-500 text-white py-1 px-4 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white py-1 px-4 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Add New Menu Item Modal (conditional rendering) */}
      {showAddModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Menu Item</h3>
            {/* Form for adding new menu item */}
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded-md"
                  placeholder="Enter meal title"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  className="w-full border p-2 rounded-md"
                  placeholder="Enter meal description"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded-md"
                  placeholder="Enter price"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Dietary Tags
                </label>
                <input
                  type="text"
                  className="w-full border p-2 rounded-md"
                  placeholder="Enter tags (e.g., Vegan, Gluten-Free)"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
