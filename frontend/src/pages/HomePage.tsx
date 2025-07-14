import { useEffect, useReducer } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import type { Product } from '../types/product'
import ProductItem from '../components/ProductItem'

type State = {
  products: Product[]
  loading: boolean
  error: string
}

type Action =
  | { type: 'FETCH_REQUEST' }
  | { type: 'FETCH_SUCCESS'; payload: Product[] }
  | { type: 'FETCH_FAIL'; payload: string }

const initialState: State = {
  products: [],
  loading: true,
  error: '',
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default function HomePage() {
  const [{ products, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const { data } = await axios.get('/api/product')
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err: unknown) {
        let errorMessage = 'An error occurred'
        if (err instanceof Error) {
          errorMessage = err.message
        }
        dispatch({ type: 'FETCH_FAIL', payload: errorMessage })
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
              <ProductItem product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}
