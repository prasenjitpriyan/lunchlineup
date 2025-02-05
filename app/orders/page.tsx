'use client'

import { useState } from 'react'
import { orders } from '@/data/orders'

export default function OrderTrackingPage() {
  const [search, setSearch] = useState('')

  const filteredOrders = orders.filter(
    (order) =>
      order.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      order.meal.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="px-4 md:px-20 py-20 bg-my-color-02 text-my-color-04 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Order Tracking</h1>
        <input
          type="text"
          placeholder="Search employee or meal..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-md text-my-color-03"
        />
      </header>

      {/* Order Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-my-color-03 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-my-color-01 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Employee</th>
              <th className="px-6 py-3 text-left">Meal</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-t border-my-color-01">
                  <td className="px-6 py-4">{order.employeeName}</td>
                  <td className="px-6 py-4">{order.meal}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Ordered'
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
