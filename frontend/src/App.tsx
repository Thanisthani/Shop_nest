import { Dispatch, useEffect } from 'react'
import { Container, Navbar, Nav, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { getAllProducts } from './features/products/productsSlice'

function App() {
  const dispatch: Dispatch<any> = useDispatch()

  const cartItems = useSelector((state: any) => state.cart)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])
  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>ShopNest</Navbar.Brand>
            <Nav>
              <Link to="/cart" className="nav-link">
                Cart
                {cartItems
                  ? cartItems.cartItem.length > 0 && (
                      <Badge pill bg="danger">
                        {cartItems.cartItem.reduce(
                          (a: any, c: any) => a + c.quantity,
                          0
                        )}
                      </Badge>
                    )
                  : ''}
              </Link>
              <Link to="/cart" className="nav-link">
                Sign In
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container className="mt-10">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className="text-center">All right reserved</div>
      </footer>
    </div>
  )
}

export default App
