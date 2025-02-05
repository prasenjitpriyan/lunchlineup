'use client'

import Image from 'next/image'
import { useState } from 'react'
import { menuItems } from '@/data/menuitems'

export default function MenuManagementPage() {
  const [showAddModal, setShowAddModal] = useState(false)

  const handleDelete = (id: number) => {
    console.log(`Deleting item with ID: ${id}`)
  }

  const handleEdit = (id: number) => {
    console.log(`Editing item with ID: ${id}`)
  }

  return (
    <div className="px-4 md:px-20 py-20 bg-my-color-02 text-my-color-04 min-h-screen">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold mb-4 sm:mb-0">Menu Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-my-color-01 text-my-color-04 py-2 px-4 rounded-md"
        >
          Add New Menu Item
        </button>
      </header>

      {/* Responsive Table */}
      <section className="overflow-x-auto bg-my-color-03 shadow-md rounded-lg">
        <table className="w-full border-collapse">
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
              <tr key={item.id} className="border-t border-my-color-01">
                <td className="px-6 py-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="rounded-md"
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
                <td className="px-6 py-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-yellow-500 text-white py-1 px-4 rounded-md"
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

      {/* Add New Menu Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 p-4">
          <div className="bg-my-color-03 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Menu Item</h3>
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
                  className="bg-my-color-01 text-white py-2 px-4 rounded-md"
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
