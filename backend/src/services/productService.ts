import { sampleProducts } from '../data'

export const getProductService = async (slug: string) => {
  return sampleProducts.find((x) => x.slug === slug)
}
