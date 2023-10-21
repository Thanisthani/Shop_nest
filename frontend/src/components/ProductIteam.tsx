import { product } from '../types/products.type'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import { Dispatch, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { convertProductToCart } from '../utils'
import { CartItem } from '../types/cart.type'
import { addCart } from '../features/cart/cartSlice'

const ProductIteam = ({ product }: { product: product }) => {
  const dispatch: Dispatch<any> = useDispatch()

  const cartItems = useSelector((state: any) => state.cart)

  const addCartItem = async (item: CartItem) => {
    try {
      const existingItem = await cartItems.cartItem.find(
        (x: any) => x._id === product._id
      )

      console.log('existing item', existingItem, cartItems.cartItem)
      const quantity = (await existingItem) ? existingItem.quantity + 1 : 1

      if (product.countInStock < quantity) {
        alert('Sorry. Product is out of stock')
        return
      }
      dispatch(addCart({ ...item, quantity: quantity }))
    } catch (error) {
      console.log('add cart', error)
    }
  }
  return (
    <Card>
      <Link to={'/product/' + product.slug}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={'/product/' + product.slug}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            {' '}
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={async () =>
              addCartItem(await convertProductToCart(product))
            }
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProductIteam
