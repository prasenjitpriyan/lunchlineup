'use client'

import { useState } from 'react'

type Notification = {
  id: number
  message: string
  timestamp: string
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    message: 'Reminder: Submit your lunch choice by 11 AM!',
    timestamp: '2025-02-04 09:30 AM'
  },
  {
    id: 2,
    message: 'Today’s special: Grilled Chicken Salad! 🍽️',
    timestamp: '2025-02-03 08:00 AM'
  }
]

export default function NotificationPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [newMessage, setNewMessage] = useState('')

  const handleSendNotification = () => {
    if (!newMessage.trim()) return

    const newNotification: Notification = {
      id: notifications.length + 1,
      message: newMessage,
      timestamp: new Date().toLocaleString()
    }

    setNotifications([newNotification, ...notifications])
    setNewMessage('')
  }

  return (
    <div className="px-4 md:px-20 py-20 bg-my-color-02 text-my-color-04 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Notifications</h1>
      </header>

      {/* Send Notification */}
      <div className="mb-6 p-4 bg-my-color-03 shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-2">Send a Notification</h2>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter notification message..."
          className="w-full border p-2 rounded-md mb-2"
        ></textarea>
        <button
          onClick={handleSendNotification}
          className="bg-my-color-01 text-white py-2 px-4 rounded-md"
        >
          Send Notification 📢
        </button>
      </div>

      {/* Notification List */}
      <div className="bg-my-color-03 shadow-md rounded-md">
        <h2 className="text-xl font-semibold p-4 border-b">
          Recent Notifications
        </h2>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className="p-4 border-b">
                <p>{notification.message}</p>
                <p className="text-sm text-my-color-01">
                  {notification.timestamp}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-4 text-gray-500">No notifications sent yet.</p>
        )}
      </div>
    </div>
  )
}
