import { Link, useParams } from "react-router-dom"
import { useGetOrderDetailsQuery, usePayOrderMutation } from "../Hooks/orderHooks"
import { useContext } from "react"
import { Store } from "../Store"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import { getError } from "../utils"
import type { ApiError } from "../types/ApiError"
import { Helmet } from "react-helmet-async"
import Col from "react-bootstrap/esm/Col"
import { Card, ListGroup, Row } from "react-bootstrap"
import { toast } from "react-toastify"

export default function OrderPage () {
    const { state } = useContext (Store)
    const { userInfo } = state
    
    const params = useParams()
    const { id: orderId } = params

    const { data: order, error, isLoading, refetch } = useGetOrderDetailsQuery(orderId!)
    const { mutateAsync: payOrder, isLoading: loadingPay } = usePayOrderMutation();

    const handleConfirmPayment = async () => {
        try {
            await payOrder({ orderId });
            toast.success('Payment confirmed!');
            refetch();
        } catch (err) {
            toast.error(getError(err as ApiError));
        }
    };

    return isLoading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
    ) : !order ? (
        <MessageBox variant="danger">Order Not Found</MessageBox>
    ) : (
        <div>
            <Helmet>
                <title>Order {orderId}</title>
            </Helmet>
            <h1 className="my-3">Order {orderId}</h1>
            <Row>
                <Col md={8}>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Shipping</Card.Title>
                        <Card.Text>
                            <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                            <strong>Address: </strong> {order.shippingAddress.address},
                            {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                            {order.shippingAddress.country}
                        </Card.Text>
                        {order.isDelivered ? (
                            <MessageBox variant="success">
                                Delivered at {order.deliveredAt}
                            </MessageBox>
                        ) : (
                            <MessageBox variant="danger">Not Delivered</MessageBox>
                        )}
                    </Card.Body>
                </Card>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Payment</Card.Title>
                        <Card.Text>
                            <strong>Method:</strong> {order.paymentMethod}
                        </Card.Text>
                        {order.isPaid ? (
                            <MessageBox variant="success">
                                Paid at {order.paidAt} by {order.paymentMethod}
                            </MessageBox>
                        ) : (
                            <>
                                <MessageBox variant="danger">Not Paid</MessageBox>
                                <button
                                    className="btn btn-success mt-2"
                                    onClick={handleConfirmPayment}
                                    disabled={loadingPay}
                                >
                                    {loadingPay ? 'Confirming...' : `Confirm Payment by ${order.paymentMethod}`}
                                </button>
                            </>
                        )}
                    </Card.Body>
                </Card>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Order Items</Card.Title>
                        <ListGroup variant="flush">
                            {order.orderItems.map((item) => (
                                <ListGroup.Item key={item._id}>
                                    <Row className="align-items-center">
                                        <Col md={6}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="img-fluid rounded thumbnail"
                                            />
                                          <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={3}>
                                            <span>{item.quantity}</span>   
                                        </Col>
                                        <Col md={3}>${item.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card.Body> 
                </Card>
                </Col>
                <Col md={4}>
                <Card>
                    <Card.Body>
                        <Card.Title>Order Summary</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>Order Total</strong></Col>
                                    <Col><strong>${order.totalPrice.toFixed(2)}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>    
                </Card>
                
                </Col>
            </Row>
        </div>
    )
}