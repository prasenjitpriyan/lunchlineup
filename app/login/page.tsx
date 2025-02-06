'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    })

    if (result?.error) {
      setError('Invalid credentials')
    } else {
      console.log('Login successful, fetching session...')
      const res = await fetch('/api/auth/session')
      const session = await res.json()
      console.log('Session Data:', session) // Log session data

      if (!session?.user?.role) {
        setError('User role not found, please check backend setup.')
        return
      }

      if (session.user.role === 'admin') {
        console.log('Redirecting to /dashboard')
        router.push('/dashboard')
      } else {
        console.log('Redirecting to /dailymenu')
        router.push('/dailymenu')
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-my-color-02">
      <div className="bg-my-color-03 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-my-color-04 mb-6">
          Welcome Back
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center">{error}</p>}
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
