import { Document } from 'mongoose'

export interface Iproduct extends Document {
  name: string
  slug: string
  image: string
  category: string
  brand: string
  price: number
  countInStock: number
  description: string
  rating: number
  numReviews: number
}
