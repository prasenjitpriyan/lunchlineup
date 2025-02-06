'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role] = useState('employee')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Signup failed')
      }

      // Automatically log the user in after signup
      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (signInResult?.error) {
        throw new Error(signInResult.error)
      }

      // Redirect user based on role
      if (role === 'admin') {
        router.push('/dashboard')
      } else {
        router.push('/dailymenu')
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('An unexpected error occurred')
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-my-color-02">
      <div className="bg-my-color-03 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-my-color-04 mb-6">
          Create New Account
        </h1>
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <a href="/login" className="text-my-color-01 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
