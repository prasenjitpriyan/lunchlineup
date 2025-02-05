import { MenuItem } from '@/types/MenuItem'

export const menuItems: MenuItem[] = [
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
    description: 'A delicious pizza topped with tomatoes, cheese, and veggies',
    price: '$13.50',
    dietaryTags: ['Vegetarian'],
    image: '/my.webp'
  }
]
