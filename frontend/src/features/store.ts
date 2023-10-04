import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './products/productsSlice'
import productReducer from './product/productSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    products: productsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
