import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Form, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import {savePaymentMethod} from '../actions/cartActions';
import CheckoutSteps from '../components/checkoutSteps';




const PaymentScreen = () => {
    const cart = useSelector(state => state.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {shippingAddress} = cart
    console.log(shippingAddress);

    if(!shippingAddress){
        navigate('/shipping')
    }

    const [payment, setPayment] = useState('Paypal')


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(payment))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
        <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check type='radio' label="PayPal or Credit Card" id='PayPal' name='paymentMethod' value='PayPal' checked onChange={(e)=>setPayment(e.target.value)}></Form.Check>
                        {/* <Form.Check type='radio' label="Stripe" id='Strip' name='paymentMethod' value='Stripe' onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check> */}
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>Countinue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
