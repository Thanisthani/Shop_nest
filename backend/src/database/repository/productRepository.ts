import productModels from '../models/productModels'

export const getAllProductRepo = async () => {
  try {
    const products = await productModels.find()
    return products
  } catch (error) {
    console.log('Repo', error)
  }
}

export const getProductRepo = async (slug: String) => {
  try {
    const product = await productModels.findOne({ slug: slug })
    return product
  } catch (error) {
    console.log('Repo product', error)
  }
}
