import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import productService from '../api/productService'
import { product } from '../types/products.type'

const HomePage = () => {
  const [products, setProducts] = useState<product[]>([])

  const fetchData = async () => {
    const res = await productService.fetchProduct()
    console.log(res)
    setProducts(res.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Row>
      {products &&
        products.map((product) => (
          <Col key={product.slug} sm="6" md="4" lg="3">
            <Link to={'/product/' + product.slug}>
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h2>{product.name}</h2>
              <p>${product.price}</p>
            </Link>
          </Col>
        ))}
    </Row>
  )
}

export default HomePage
