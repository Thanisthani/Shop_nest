import productService from '../../api/productService'
import { product } from '../../types/products.type'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface productState {
  products: product[]
  errMsg: string
}
const initialState: productState = {
  products: [],
  errMsg: '',
}

export const getAllProducts = createAsyncThunk('products/fetch', async () => {
  try {
    const response = await productService.fetchProducts()
    console.log(response.data, 'ressss')
    return response.data
  } catch (error) {
    // return 'aaaaaa'
  }
})

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload
    })
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.errMsg = action.payload as string
    })
  },
})

export default productsSlice.reducer
