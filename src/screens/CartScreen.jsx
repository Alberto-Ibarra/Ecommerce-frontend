import React, {useEffect} from 'react';
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card  } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const CartScreen = () => {
    const {productId} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    console.log(cartItems);
    const [searchParams] = useSearchParams()
    const qty = searchParams.get('qty')

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    useEffect(()=>{
            dispatch(addToCart(productId, qty))
    },[dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        if (!userInfo) {
        navigate('/login')
        } else {
            navigate('/shipping')
        }
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => {
                            return (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        {item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={item.qty} onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map(x => (
                                                <option key={x+1} value={x+1}>{x+1} </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                                <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0)}) items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='w-100' disabled={cartItems.length === 0} onClick={checkOutHandler}>
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
            <Col md={2}>
                
            </Col>
        </Row>
    )
}

export default CartScreen
