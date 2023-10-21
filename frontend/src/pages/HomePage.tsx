import { Col, Row } from 'react-bootstrap'

import ProductIteam from '../components/ProductIteam'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { product } from '../types/products.type'
import { useEffect } from 'react'

const HomePage = () => {
  const products = useSelector((state: any) => state.products)

  return (
    <Row className="mt-5">
      <Helmet>
        <title>ShopNest</title>
      </Helmet>
      {products.products &&
        products.products.map((product: product) => (
          <Col key={product.slug} sm="6" md="4" lg="3">
            <ProductIteam product={product} />
          </Col>
        ))}
    </Row>
  )
}

export default HomePage
