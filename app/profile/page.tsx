'use client'

import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'

export default function ProfilePage() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {session?.user?.image && (
        <Image
          width={50}
          height={50}
          src={session.user.image}
          alt="User Avatar"
          className="w-24 h-24 rounded-full"
        />
      )}
      <input type="file" />
      <button className="mt-2 p-2 bg-blue-500 text-white">Upload Image</button>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="mt-4 p-2 bg-red-500 text-white"
      >
        Logout
      </button>
    </div>
  )
}
