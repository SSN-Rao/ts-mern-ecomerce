import { Button, Card } from 'react-bootstrap'
import type { Product } from '../types/product'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import { useContext } from 'react'
import { Store } from '../Store'
import type { CartItem } from '../types/Cart'
import { convertProductToCartItem } from '../utils'
import { toast } from 'react-toastify'

function ProductItem({ product }: { product: Product }) {
  const {state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state
  

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find ((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of stock')
      return
  }

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    })
    toast.success('Product added to cart')
  }

  return (
    <Card className="h-100 d-flex flex-column">
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          className="card-img-top product-image"
          alt={product.name}
        />
      </Link>
      <Card.Body className="d-flex flex-column justify-content-end">
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of Stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(convertProductToCartItem(product))}>Add to Cart</Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProductItem
