import React, { Dispatch, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPaymentMethod } from '../features/cart/cartSlice'
import { Helmet } from 'react-helmet-async'
import CheckOutSteps from '../components/CheckOutSteps'
import { Button, Form } from 'react-bootstrap'

const PaymentMethodPage = () => {
  const cartItems = useSelector((state: any) => state.cart)

  const dispatch: Dispatch = useDispatch()

  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState(
    cartItems.paymentMethod || ''
  )

  useEffect(() => {
    if (!cartItems.shippingAddress) {
      navigate('/shippingAddress')
    }
  }, [cartItems.shippingAddress, navigate])

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await dispatch(addPaymentMethod(paymentMethod))
    await navigate('/')
  }
  return (
    <div>
      <Helmet>
        <title>Payment Method</title>
      </Helmet>
      <CheckOutSteps step1 step2 step3 />
      <div className="container samll-container">
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Paypal"
              label="Paypal"
              value="Paypal"
              checked={paymentMethod == 'Paypal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethod == 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default PaymentMethodPage
