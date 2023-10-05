import { model, Schema } from 'mongoose'
import { Iproduct } from '../types/productType'

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  numReviews: { type: Number, required: true },
})

export default model<Iproduct>('Product', productSchema)
