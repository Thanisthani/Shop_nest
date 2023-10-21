import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { product } from '../../types/products.type'
import productService from '../../api/productService'

const initialState: product = {
  name: '',
  brand: '',
  category: '',
  countInStock: 0,
  description: '',
  image: '',
  numReviews: 0,
  price: 0,
  rating: 0,
  slug: '',
}

export const getProduct = createAsyncThunk(
  'product/fetch',
  async (data: string, thunkAPI) => {
    try {
      const response = await productService.fetchProduct(data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.name = action.payload.name
      state.brand = action.payload.brand
      state.category = action.payload.category
      state.countInStock = action.payload.countInStock
      state.description = action.payload.description
      state.image = action.payload.image
      state.numReviews = action.payload.numReviews
      state.price = action.payload.price
      state.rating = action.payload.rating
      state.slug = action.payload.slug
    })
  },
})

export default productSlice.reducer
