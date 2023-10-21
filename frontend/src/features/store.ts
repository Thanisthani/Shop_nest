import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './products/productsSlice'
import productReducer from './product/productSlice'
import cartReducer from './cart/cartSlice'
import userReducer from './user/userSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
