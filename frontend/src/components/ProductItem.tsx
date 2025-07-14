import { Button, Card } from 'react-bootstrap'
import type { Product } from '../types/product'
import { Link } from 'react-router-dom'
import Rating from './Rating'

function ProductItem({ product }: { product: Product }) {
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
          <Button>Add to Cart</Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProductItem
