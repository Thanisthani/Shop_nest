import React, { Dispatch, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CartItem } from '../types/cart.type'
import { toast } from 'react-toastify'
import { addCart, deleteCart } from '../features/cart/cartSlice'
import { Helmet } from 'react-helmet-async'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const CartPage = () => {
  const dispatch: Dispatch<any> = useDispatch()

  const navigate = useNavigate()

  const cartItems = useSelector((state: any) => state.cart)

  const updateQuantity = async (item: CartItem, quantity: number) => {
    if (item.countInStock < quantity) {
      toast.warn('Sorry, Product is out of stock')
      return
    }

    dispatch(addCart({ ...item, quantity: quantity }))
  }

  const CheckoutHandler = async () => {
    navigate('/signin')
  }

  const DeleteItemHandler = async (product: CartItem) => {
    dispatch(deleteCart(product))
  }

  useEffect(() => {
    console.log(cartItems.cartItem)
  }, [])

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={6}>
          {cartItems.cartItem.length === 0 ? (
            <div>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </div>
          ) : (
            <ListGroup>
              {cartItems.cartItem.map((item: CartItem) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded thumbnail"
                      />
                      {'  '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() => updateQuantity(item, item.quantity - 1)}
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => DeleteItemHandler(item)}
                      >
                        <i className="fas fa-trash" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    subtotal (
                    {cartItems.cartItem.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : $
                    {cartItems.cartItem.reduce(
                      (a, c) => a + c.price * c.quantity,
                      0
                    )}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={CheckoutHandler}
                      disabled={cartItems.cartItem.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CartPage
