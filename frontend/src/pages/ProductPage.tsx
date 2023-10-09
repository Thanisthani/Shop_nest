import { Dispatch, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProduct } from '../features/product/productSlice'
import { product } from '../types/products.type'
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import Rating from '../components/Rating'
import { CartItem } from '../types/cart.type'
import { addCart } from '../features/cart/cartSlice'
import { convertProductToCart } from '../utils'
import { toast } from 'react-toastify'

const ProductPage = () => {
  const params = useParams()
  const dispatch: Dispatch<any> = useDispatch()

  const cartItems = useSelector((state: any) => state.cart)

  const { slug } = params

  const product = useSelector((state: any) => state.product)

  useEffect(() => {
    dispatch(getProduct(slug!))
  }, [])

  const addCartItem = async (item: CartItem) => {
    try {
      const existingItem = await cartItems.cartItem.find(
        (x: any) => x._id === product._id
      )

      console.log('existing item', existingItem, cartItems.cartItem)
      const quantity = (await existingItem) ? existingItem.quantity + 1 : 1

      if (product.countInStock < quantity) {
        toast.warn('Sorry. Product is out of stock')
        return
      }
      dispatch(addCart({ ...item, quantity: quantity }))
      toast.success('Product added to the cart')
    } catch (error) {
      console.log('add cart', error)
    }
  }

  return (
    <div className="mt-2">
      {product && (
        <div>
          <Row>
            <Col md={6}>
              <img className="large" src={product.image} alt={product.name} />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Helmet>
                    <title>{product.name}</title>
                  </Helmet>
                  <h1>{product.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    numReviews={product.numReviews}
                    rating={product.rating}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>$ {product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ? (
                            <Badge bg="success">In Stock</Badge>
                          ) : (
                            <Badge bg="danger">Out of Stock</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <div className="d-grid">
                          <Button
                            onClick={async () => {
                              addCartItem(await convertProductToCart(product))
                            }}
                            variant="primary"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  )
}

export default ProductPage
