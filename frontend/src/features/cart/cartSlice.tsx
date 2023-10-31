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
    deleteAllCart: (state) => {
      try {
        state.cartItem = []
        state.shippingAddress = {}
        state.shippingPrice = 0
        state.itemsPrice = 0
        state.totalPrice = 0
        state.taxPrice = 0
        state.paymentMethod = ''
        localStorage.removeItem('CartItems')
        localStorage.removeItem('ShippingAddress')
      } catch (error) {
        console.log('Delete all cart error', error)
      }
    },
    addShippingAddress: (state, action) => {
      try {
        const newAddress = action.payload
        localStorage.setItem('ShippingAddress', JSON.stringify(newAddress))
        return { ...state, shippingAddress: newAddress }
      } catch (error) {
        console.log('Add shipping address error', error)
      }
    },
  },
})

export const { addCart, deleteCart, addShippingAddress } = cartSlice.actions

export default cartSlice.reducer
