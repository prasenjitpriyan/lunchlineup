'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const Home: React.FC = () => {
  const router = useRouter()

  return (
    <div className="flex justify-center items-center px-4 md:px-20 py-20 bg-my-color-02 text-my-color-04 min-h-screen">
      <div className="relative text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-my-color-01">LunchLineup</span>
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Your daily workday lunch specials, just a click away! Choose your meal
          and enjoy a hassle-free lunch experience.
        </p>
        <button
          onClick={() => router.push('/login')}
          className="bg-my-color-01 hover:bg-my-color-03 text-black hover:text-my-color-04 text-lg font-semibold px-6 py-3 rounded-full transition-all"
        >
          View Today&apos;s Menu 🍽️
        </button>
      </div>
    </div>
  )
}

export default Home
