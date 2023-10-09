import { createSlice } from '@reduxjs/toolkit'
import { Cart, CartItem } from '../../types/cart.type'

const initialState: Cart = {
  cartItem: localStorage.getItem('CartItems')
    ? JSON.parse(localStorage.getItem('CartItems')!)
    : [],
  shippingAddress: localStorage.getItem('ShippingAddress')
    ? JSON.parse(localStorage.getItem('ShippingAddress')!)
    : {},
  shippingPrice: 0,
  itemsPrice: 0,
  totalPrice: 0,
  taxPrice: 0,
  paymentMethod: '',
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state: Cart, action: any) => {
      const newItem = action.payload

      const existingItem = state.cartItem.find(
        (item: CartItem) => item._id === newItem._id
      )

      const cartItems = existingItem
        ? state.cartItem.map((item) =>
            item._id === newItem._id ? newItem : item
          )
        : [...state.cartItem, newItem]

      localStorage.setItem('CartItems', JSON.stringify(cartItems))

      return { ...state, cartItem: cartItems }
    },
  },
})

export default cartSlice.reducer
