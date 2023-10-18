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
    addCart: (state, action) => {
      try {
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
      } catch (error) {
        console.log('Cart slice err', error)
      }
    },
    deleteCart: (state, action) => {
      try {
        // const cartItems  = state.cartItem.find(
        //   (item:CartItem) => item._id !== action.payload._id
        // )

        const newItem = action.payload

        const cartItems = state.cartItem.filter(
          (item: CartItem) => item._id !== newItem._id
        )

        localStorage.setItem('CartItems', JSON.stringify(cartItems))
        return { ...state, cartItem: cartItems }
      } catch (error) {
        console.log('Delete cart error', error)
      }
    },
  },
})

export const { addCart, deleteCart } = cartSlice.actions

export default cartSlice.reducer
