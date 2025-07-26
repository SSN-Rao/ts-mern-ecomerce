import type { ApiError } from './types/ApiError'
import type { CartItem } from './types/Cart'
import type { Product } from './types/product'

export const getError = (error: ApiError) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}


export const convertProductToCartItem = (product: Product): CartItem => {
  const cartItem: CartItem = {
     _id: product._id,
     name: product.name,
    image: product.image,
    slug: product.slug,
    quantity: 1,
    countInStock: product.countInStock,
    price: product.price,
    
  }
  return cartItem
}