'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-my-color-02">
      <div className="bg-my-color-03 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-my-color-04 mb-6">
          Welcome Back
        </h1>
        <form className="space-y-4">
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
          <button
            type="submit"
            className="w-full bg-my-color-01 text-white font-semibold p-3 rounded-lg hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link
            href="/forgetpassword"
            className="text-my-color-01 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="mt-4 text-center text-my-color-04">
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-my-color-01 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
