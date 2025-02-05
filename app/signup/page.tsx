'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-my-color-02">
      <div className="bg-my-color-03 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-my-color-04 mb-6">
          Create New Account
        </h1>
        <form className="space-y-4">
          {errorMessage && (
            <div className="text-red-500 text-center mb-4">{errorMessage}</div>
          )}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded bg-my-color-04 text-my-color-02 focus:ring-2 focus:ring-my-color-01 outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded bg-my-color-04 text-my-color-02 focus:ring-2 focus:ring-my-color-01 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded bg-my-color-04 text-my-color-02 focus:ring-2 focus:ring-my-color-01 outline-none"
            required
          />
          <input
            type="file"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
            className="w-full p-3 border rounded bg-my-color-04 text-my-color-02 focus:ring-2 focus:ring-my-color-01 outline-none"
          />
          <button
            type="submit"
            className="w-full bg-my-color-01 text-white font-semibold p-3 rounded-lg hover:bg-green-600 transition"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center text-my-color-04">
          <p>
            Already have an account?{' '}
            <Link href="/login" className="text-my-color-01 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
