import { Dispatch, useEffect } from 'react'
import { Container, Navbar, Nav, Badge, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { getAllProducts } from './features/products/productsSlice'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { signOutUser } from './features/user/userSlice'

function App() {
  const dispatch: Dispatch<any> = useDispatch()

  const navigate = useNavigate()

  const cartItems = useSelector((state: any) => state.cart)

  const userInfo = useSelector((state: any) => state.user)

  const signOutHandler = async () => {
    await dispatch(signOutUser())
    await navigate('/signin')
  }

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])
  return (
    <div className="d-flex flex-column vh-100">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>ShopNest</Navbar.Brand>
            <Nav>
              <Link to="/cart" className="nav-link">
                Cart
                {cartItems.cartItem.length > 0 && (
                  <Badge pill bg="danger">
                    {cartItems.cartItem.reduce(
                      (a: any, c: any) => a + c.quantity,
                      0
                    )}
                  </Badge>
                )}
              </Link>
              {userInfo.name ? (
                <NavDropdown
                  title={userInfo.name}
                  id="basic-nav-dropdown bg-dark"
                >
                  <Link
                    to="#signout"
                    className="dropdown-item"
                    onClick={signOutHandler}
                  >
                    Sign Out
                  </Link>
                </NavDropdown>
              ) : (
                <Link to="/signin" className="nav-link">
                  Sign In
                </Link>
              )}
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
