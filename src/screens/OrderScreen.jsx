import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, Link , useParams} from 'react-router-dom';
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';
import { reset } from '../slicers/orderPaySlice';
import { resetDeliver } from '../slicers/orderDeliverSlice';

const OrderScreen = () => {
    let [sdkReady, setSdkReady] =  useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orderId = useParams()

    const OrderDetails = useSelector(state=> state.orderDetails)
    const {order, loading, error} = OrderDetails

    const OrderPay = useSelector(state=> state.orderPay)
    const { loading: loadingPay, success: successPay} = OrderPay

    const OrderDeliver = useSelector(state=> state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver} = OrderDeliver

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const paypalClientId = process.env.PAYPAL_CLIENT_ID


    useEffect(()=>{
        if(!userInfo){
            navigate('/login')
        }

        const addPayPalScript = async () => {
            const {data: clientId} = await axios.get('https://ecommerce-ap.herokuapp.com/api/config/paypal')
            console.log(clientId);
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true,
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || successPay || successDeliver ){
            dispatch(reset())
            dispatch(resetDeliver())
            console.log(orderId.id);
            dispatch(getOrderDetails(orderId.id))
            console.log(orderId.id);
        } else if (!order.isPaid){
            if(!window.paypal){
                console.log(window.paypal);
                addPayPalScript()
            }else{
                setSdkReady(true)
                console.log(sdkReady);
            }
        }

    }, [dispatch, successPay, orderId, order, successDeliver])



    const successPaymentHandler = (payemntResult) => {
        console.log(payemntResult);
        dispatch(payOrder(orderId, payemntResult))
    }


    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : 
    <>
        <h2>Order # {order._id}</h2>
        <Row>
                <Col ms={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>  {order.user.email}</a></p>
                            <p>
                                <strong> Address: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode} {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant='success'> Delivered on {order.deliveredAt}</Message> : <Message variant='danger'>Not Delivered</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant='success'> Paid on {order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index)=> {
                                        return(
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        )
                                    })}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}
                                    {!sdkReady ? <Loader/> : (
                                        <PayPalScriptProvider options={{ "client-id": paypalClientId}}>
                                            <PayPalButtons createOrder={(data, actions) => {
                                                return actions.order.create({
                                                purchase_units: [
                                                    {
                                                    amount: {
                                                        value:order.totalPrice,
                                                    },
                                                    },
                                                ],
                                                });
                                            }}
                                            onApprove={(data, actions) => {
                                                try{
                                                    return actions.order.capture().then((details) => {
                                                        successPaymentHandler(details)
                                                        alert("Transaction completed by " + details.payer.name.given_name);
                                                    });
                                                }catch(error){
                                                    console.log(error)
                                                }
                                            }}
                                            onError={(error) => {
                                                console.log(error);
                                            }}
                                            />
                                        </PayPalScriptProvider>
                                    )}
                                </ListGroup.Item>
                            )}
                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type='button' className='btn btn-block' onClick={deliverHandler}>Mark as delivered</Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    </>
}

export default OrderScreen


