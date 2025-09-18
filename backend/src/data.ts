import bcrypt from 'bcryptjs'
import { User } from './models/userModel'
import type { Product } from './models/productModel'

export const sampleProducts: Product[] = [
  {
    name: 'Nice Slim Pant',
    slug: 'nice-slim-pant',
    category: 'Pants',
    image: '/images/nice-pant.jpg',
    price: 200,
    countInStock: 0,
    brand: 'Nike',
    rating: 4.2,
    numReviews: 10,
    description: 'High Quality product',
  },
  {
    name: 'Nice Shirt',
    slug: 'nice-shirt',
    category: 'Shirts',
    image: '/images/nice-shirt.jpg',
    price: 120,
    countInStock: 10,
    brand: 'Nike',
    rating: 4.5,
    numReviews: 10,
    description: 'A popular shirt',
  },
  {
    name: 'Adidas Shirt',
    slug: 'adidas-shirt',
    category: 'Shirts',
    image: '/images/adidas-shirt.jpg',
    price: 100,
    countInStock: 8,
    brand: 'Adidas',
    rating: 4.0,
    numReviews: 10,
    description: 'High Quality product',
  },

  {
    name: 'LG Watch',
    slug: 'lg-watch',
    category: 'watches',
    image: '/images/lg-watch.jpg',
    price: 180,
    countInStock: 25,
    brand: 'LG',
    rating: 4.5,
    numReviews: 10,
    description: 'Most Demanded Watch',
  },
]

export const sampleUsers: User[] = [
  {
    name: 'Joe',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: true,
  },
   {
    name: 'Jhon',
    email: 'user@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: false,
  }
]