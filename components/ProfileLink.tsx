'use client'

import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import { IoClose } from 'react-icons/io5' // Import close icon

export default function Navbar() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav>
      {session && (
        <div className="fixed right-8 top-8 flex justify-center gap-4 items-center">
          <p>{session.user.name}</p>
          <button onClick={() => setIsOpen(true)}>
            <Image
              width={50}
              height={50}
              src={session.user.image || '/my.webp'}
              alt="Profile"
              className="w-10 h-10 rounded-full border-4 border-my-color-01"
            />
          </button>
        </div>
      )}

      {/* Profile Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-my-color-03 p-6 rounded-lg shadow-lg w-80 relative">
            {/* Header with Close Button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-my-color-04">
                Profile
              </h2>
              <button onClick={() => setIsOpen(false)}>
                <IoClose className="text-2xl text-my-color-04 hover:text-my-color-01" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col items-center">
              <Image
                width={80}
                height={80}
                src={session?.user.image || '/my.webp'}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-my-color-01"
              />
              <p className="mt-2 font-medium">{session?.user.name}</p>
              <p className="text-gray-400">{session?.user.email}</p>

              {/* Change Image Button */}
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg w-full">
                Change Image
              </button>

              {/* Logout Button */}
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg w-full"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
