import Image from 'next/image'
import { menuItems } from '@/data/menuitems'

export default function DailyMenuPage() {
  return (
    <div className="px-4 md:px-20 py-20 bg-my-color-02 text-my-color-04 min-h-screen">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-semibold">Today&apos;s Lunch Menu</h1>
        <p className="text-lg text-gray-200">Choose your meal for today!</p>
        <p className="text-sm text-gray-100">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </header>

      {/* Menu List */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-my-color-03 p-4 rounded-lg shadow-lg"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-400 mb-2">{item.description}</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-medium">{item.price}</span>
              <div className="flex space-x-2">
                {item.dietaryTags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs text-white bg-gray-500 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button className="w-full py-2 bg-my-color-01 text-white rounded-md mt-4">
              Select
            </button>
          </div>
        ))}
      </section>

      {/* Footer */}
      <div className="text-center mt-6">
        <button className="py-2 px-6 bg-my-color-03 text-my-color-01 rounded-md">
          Submit Selection
        </button>
      </div>
    </div>
  )
}
