import axios from './axios'

const fetchProducts = async () => {
  const response = axios.get('/products/get')

  return response
}

const fetchProduct = async (slug: string) => {
  const response = axios.get('/products/get/' + slug)

  return response
}

const productService = {
  fetchProducts,
  fetchProduct,
}

export default productService
