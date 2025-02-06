import Navbar from '@/components/ProfileLink'
import React from 'react'

const Dashboard = () => {
  return (
    <div className="px-4 md:px-20 py-20 bg-my-color-02 text-my-color-04 min-h-screen">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <Navbar />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-500 text-my-color-04 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl">120</p>
        </div>
        <div className="bg-green-500 text-my-color-04 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Today&apos;s Menu Items</h2>
          <p className="text-2xl">5</p>
        </div>
        <div className="bg-yellow-500 text-my-color-04 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Pending Orders</h2>
          <p className="text-2xl">8</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
