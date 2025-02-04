import Image from 'next/image'

export default function DailyMenuPage() {
  const menuItems = [
    {
      id: 1,
      title: 'Grilled Chicken Salad',
      description: 'Fresh chicken with mixed greens, vinaigrette',
      price: '$12.99',
      dietaryTags: ['Gluten-Free'],
      image: '/my.webp'
    },
    {
      id: 2,
      title: 'Vegan Buddha Bowl',
      description: 'Rice, chickpeas, avocado, veggies, and tahini dressing',
      price: '$10.50',
      dietaryTags: ['Vegan', 'Gluten-Free'],
      image: '/my.webp'
    },
    {
      id: 3,
      title: 'Beef Burrito',
      description:
        'Seasoned beef wrapped in a soft tortilla with cheese and salsa',
      price: '$11.00',
      dietaryTags: ['Contains Dairy'],
      image: '/my.webp'
    },
    {
      id: 4,
      title: 'Vegetarian Pizza',
      description:
        'A delicious pizza topped with tomatoes, cheese, and veggies',
      price: '$13.50',
      dietaryTags: ['Vegetarian'],
      image: '/my.webp'
    }
  ]

  return (
    <div className="px-4 md:px-20 py-20 bg-my-color-02 text-my-color-04 min-h-screen">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-semibold">Today&apos;s Lunch Menu</h1>
        <p className="text-lg text-gray-600">Choose your meal for today!</p>
        <p className="text-sm text-gray-500">February 4, 2025</p>
      </header>

      {/* Menu List */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg">
            <Image
              src={item.image}
              alt={item.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
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
            <button className="w-full py-2 bg-blue-500 text-white rounded-md mt-4">
              Select
            </button>
          </div>
        ))}
      </section>

      {/* Footer */}
      <div className="text-center mt-6">
        <button className="py-2 px-6 bg-green-500 text-white rounded-md">
          Submit Selection
        </button>
      </div>
    </div>
  )
}
