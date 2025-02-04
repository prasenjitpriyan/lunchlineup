'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeSidebar = () => setIsOpen(false)

  return (
    <>
      {/* Toggle Button (Visible when sidebar is closed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 text-my-color-04 bg-my-color-01 hover:text-my-color-02 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 fixed top-4 left-4 z-50"
          aria-label="Open Sidebar"
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-my-color-01 text-my-color-04 p-6 shadow-lg transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button (Inside Sidebar) */}
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 text-my-color-04 hover:text-my-color-02"
          aria-label="Close Sidebar"
        >
          <FiX size={24} />
        </button>

        {/* Sidebar Links */}
        <ul className="mt-8 space-y-4">
          <li className="hover:text-my-color-02 cursor-pointer">
            <Link href="/" onClick={closeSidebar}>
              Home
            </Link>
          </li>
          <li className="hover:text-my-color-02 cursor-pointer">
            <Link href="/dashboard" onClick={closeSidebar}>
              Dashboard
            </Link>
          </li>
          <li className="hover:text-my-color-02 cursor-pointer">
            <Link href="/menumanagement" onClick={closeSidebar}>
              Menu Management
            </Link>
          </li>
          <li className="hover:text-my-color-02 cursor-pointer">
            <Link href="/orders" onClick={closeSidebar}>
              Orders
            </Link>
          </li>
          <li className="hover:text-my-color-02 cursor-pointer">
            <Link href="/notifications" onClick={closeSidebar}>
              Notifications
            </Link>
          </li>
        </ul>
      </aside>
    </>
  )
}

export default Sidebar
