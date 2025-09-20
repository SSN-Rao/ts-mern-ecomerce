import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Form, Button } from "react-bootstrap"
import { Store } from "../Store"
import CheckoutSteps from "../components/CheckoutSteps"

export default function ShippingAddressPage() {
    const navigate = useNavigate()
    const { state, dispatch } = useContext(Store)
    const {
        cart: { shippingAddress, paymentMethod },
    } = state

    const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || 'SadaPay')

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName })
        localStorage.setItem('paymentMethod', paymentMethodName)
        navigate('/placeorder')
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <div className="container small-container">
                <Helmet>
                    <title>Payment Method</title>
                </Helmet>
                <h1 className="my-3">Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <Form.Check
                            type="radio"
                            id="SadaPay"
                            label="SadaPay"
                            value="SadaPay"
                            checked={paymentMethodName === 'SadaPay'}
                            onChange={(e) => setPaymentMethodName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <Form.Check
                            type="radio"
                            id="JazzCash"
                            label="JazzCash"
                            value="JazzCash"
                            checked={paymentMethodName === 'JazzCash'}
                            onChange={(e) => setPaymentMethodName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <Form.Check
                            type="radio"
                            id="EasyPaisa"
                            label="EasyPaisa"
                            value="EasyPaisa"
                            checked={paymentMethodName === 'EasyPaisa'}
                            onChange={(e) => setPaymentMethodName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <Button type="submit">Continue</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}