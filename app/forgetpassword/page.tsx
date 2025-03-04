'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-my-color-02">
      <div className="bg-my-color-03 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-my-color-04 mb-6">
          Forgot Password
        </h1>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded bg-my-color-04 text-my-color-02 focus:ring-2 focus:ring-my-color-01 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-my-color-01 text-my-color-04 font-semibold p-3 rounded-lg hover:bg-green-600 transition"
          >
            Send Reset Link
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/login" className="text-my-color-01 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
