import axios from './axios'

const fetchProduct = async () => {
  const response = axios.get('/api/products')

  return response
}

const productService = {
  fetchProduct,
}

export default productService
