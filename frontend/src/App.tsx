import { useContext, useEffect } from 'react'
import './index.css'
import { Navbar, Container, Nav, Badge, NavDropdown, Form, FormControl, InputGroup, Button } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Store } from './Store'

function App() {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store)

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
  }, [mode])

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' })
  }

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin'
  }

  return (
    <div className="d-flex flex-column vh-100">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar
          className="d-flex flex-column align-items-stretch p-2 pb-0 mb-3"
          bg="dark"
          variant="dark"
          expand="lg"
        >
          <div>
            <LinkContainer to="/">
              <Navbar.Brand>eCommerce</Navbar.Brand>
            </LinkContainer>

            <Form className="flex-grow-1 d-flex me-auto">
              <InputGroup>
              <FormControl 
              type="text"
              name="q"
              id="q"
              placeholder="Search Products..."
              aria-label="Search Products"
              aria-describedby="button-search"
              ></FormControl>
               <Button variant="outline-primary" id="button-search" className="p-2">
                <i className="fas fa-search"></i>
              </Button>
              </InputGroup>
            </Form>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto align-items-center">
                <Link
                  to="#"
                  className="nav-link header-link"
                  onClick={switchModeHandler}
                >
                  <i
                    className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}
                  ></i>{' '}
                  {mode === 'light' ? 'Light' : 'Dark'}
                </Link>
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger" className="ms-1">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown
                    className="header-link"
                    title={`Hello, ${userInfo.name}`}
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
                <Link to="/orderhistory" className="nav-link">
                  Order History
                </Link>
                <Link to="/cart" className="nav-link header-link p-0"> 
                  {(
                    <span className="cart-badge">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40px"
                    height="40px"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="ms-1"
                    style={{ verticalAlign: 'middle' }}
                  >
                    <path d="M0 1a1 1 0 0 1 1-1h1.5a.5.5 0 0 1 .485.379L3.89 4H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 13H4a.5.5 0 0 1-.491-.408L1.01 2H1a1 1 0 0 1-1-1zm3.14 4l1.25 6.5h7.22l1.25-6.5H3.14zM5.5 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                  <span>Cart</span>
                </Link>
              </Nav>
            </Navbar.Collapse>
            </div>
            <div className="sub-header">
                  <div className='d-flex'>
                    <Link to="#" className="nav-link header-link p-1">
                    <i className="fas fa-bars"></i> All
                    </Link>
                    {['Todays Deals', 'Gifts', 'On Sale'].map((x) => (
                      <Link
                      key={x}
                      className="nav-link header-link p-1 px-3"
                      to={`/search?tag=${x}`}
                      >
                      {x}
                      </Link>
                    ))}
                  </div>
            </div>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
  )
}

export default App
