import { CartItem } from '../types/cart.type'
import { product } from '../types/products.type'

export const convertProductToCart = async (product: product) => {
  const cartItem: CartItem = await {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    quantity: 1,
  }

  return cartItem
}

// image: string | undefined
// slug: string
// quantity: number
// countInStock: number
// price: number
// _id: string
// name: string
