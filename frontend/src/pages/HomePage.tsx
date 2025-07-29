import { Row, Col } from 'react-bootstrap'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ProductItem from '../components/ProductItem'
import { Helmet } from 'react-helmet-async'
import { useGetProductsQuery } from '../productHooks'
import type { ApiError } from '../types/ApiError'
import { getError } from '../utils'

export default function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery()
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">
      {getError(error as unknown as ApiError)}
    </MessageBox>
  ) : (
    <Row>
      <Helmet>
        <title>TS eCommerce</title>
      </Helmet>
      {products!.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3} >
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  )
}
 