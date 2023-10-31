import React, { Dispatch, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckOutSteps from '../components/CheckOutSteps'
import { Button, Form } from 'react-bootstrap'
import { addShippingAddress } from '../features/cart/cartSlice'

const ShippingAddressPage = () => {
  const userInfo = useSelector((state: any) => state.user)

  const cartItems = useSelector((state: any) => state.cart)

  const distpatch: Dispatch = useDispatch()

  const navigate = useNavigate()

  const [fullName, setFullName] = useState(
    cartItems.shippingAddress.fullName || ''
  )
  const [address, setAddress] = useState(
    cartItems.shippingAddress.address || ''
  )
  const [city, setCity] = useState(cartItems.shippingAddress.city || '')
  const [country, setCountry] = useState(
    cartItems.shippingAddress.country || ''
  )
  const [postalCode, setPostalCode] = useState(
    cartItems.shippingAddress.postalCode || ''
  )

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping')
    }
    console.log('fullname', cartItems.shippingAddress.fullName)
  }, [userInfo, navigate])

  const submitHandler = async (e: React.SyntheticEvent) => {
    await e.preventDefault()

    await distpatch(
      addShippingAddress({ fullName, address, city, country, postalCode })
    )
    navigate('/paymentMethod')
  }

  return (
    <div>
      <Helmet>
        <title>Shipping Adddress</title>
      </Helmet>
      <CheckOutSteps step1 step2 />
      <div className="container small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ShippingAddressPage
