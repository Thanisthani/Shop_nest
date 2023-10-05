import { sampleProducts } from '../data'
import {
  getAllProductRepo,
  getProductRepo,
} from '../database/repository/productRepository'

export const getAllProductsService = async () => {
  const products = await getAllProductRepo()
  return products
}

export const getProductService = async (slug: string) => {
  const product = getProductRepo(slug)
  return product
}
