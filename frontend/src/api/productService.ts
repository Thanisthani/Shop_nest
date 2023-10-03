import axios from './axios'

const fetchProduct = async () => {
  const response = axios.get('/products/get')

  return response
}

const productService = {
  fetchProduct,
}

export default productService
