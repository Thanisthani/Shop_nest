import React from 'react'
import { Row, Col } from 'react-bootstrap'

const CheckOutSteps = (props: {
  step1?: boolean
  step2?: boolean
  step3?: boolean
  step4?: boolean
}) => {
  return (
    <Row className="checkOutSteps">
      <Col className={props.step1 ? 'active' : ''}>SignIn</Col>
      <Col className={props.step2 ? 'active' : ''}>ShippingAddress</Col>
      <Col className={props.step3 ? 'active' : ''}>Payment</Col>
      <Col className={props.step4 ? 'active' : ''}>Place Order</Col>
    </Row>
  )
}

export default CheckOutSteps
