import { Container, Navbar, Nav } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>ShopNest</Navbar.Brand>
            <Nav>
              <a href="/" className="nav-link">
                Cart
              </a>
              <a href="/" className="nav-link">
                Sign In
              </a>
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
