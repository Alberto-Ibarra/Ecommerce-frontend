import React, {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import Rating from '../components/Rating';
import { fetchProductDetails, createProductReview } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { resetProductReview } from '../slicers/productCreateReviewSlice';

const ProductScreen = () => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState()
    
    const {id: productId} = useParams();
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const {product, loading, error} = productDetails; 

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin

    const productReviewCreate = useSelector((state) => state.productCreateReview);
    const { success: successProductReview, error: errorProductReview} = productDetails; 

    const navigate = useNavigate();

    // console.log(productId);
    useEffect(()=>{
        if(successProductReview){
            alert('Review Submitted!')
            setRating(0)
            setComment('')
            dispatch(resetProductReview())
        }
        dispatch(fetchProductDetails(productId))
    },[dispatch, productId, successProductReview])

    const addToCartHandler = () => {
        console.log(typeof(productId));
        console.log(productId);
        navigate(`/cart/${productId}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(productId, {
            rating,
            comment
        }))
    }

    return (
        <>
            <Link className='btn btn-light my-3' to="/">Go Back</Link>

            {loading 
            ? <Loader/>
            : error 
            ? <Message>{error} </Message>
            : (
                <>
                <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>

                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>{product.name}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color='gold'/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: {product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty:</Col>
                                        <Col>
                                            <Form.Control as='select' value={qty} onChange={(e)=> setQty(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map(x => (
                                                    <option key={x+1} value={x+1}>{x+1} </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button
                                    onClick={addToCartHandler}
                                    className='w-100' 
                                    type='button' 
                                    disabled={product.countInStock === 0 }>Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && <Message>No Reviews</Message>}
                    <ListGroup variant='flush'>
                        {product.reviews.map(review => (
                            <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} color='gold'/>
                            <p>{review.createdAt.substring(0,10)}</p>
                            <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h2>Write a review</h2>
                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                            {userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                            <option value=''>Select...</option>
                                            <option value='1'>1 - poor</option>
                                            <option value='2'>2 - fair</option>
                                            <option value='3'>3 - good</option>
                                            <option value='4'>4 - very good</option>
                                            <option value='5'>5 - excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='comment'>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control as='textarea' row='3' value={comment} onChange={(e)=> setComment(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Button type='submit' variant='primary'>Submit</Button>
                                </Form>
                                ) : 
                                <Message>Please <Link to='/login'>Sign in</Link> to write a review</Message>
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            </>
            )}

            
        </>
    )
}

export default ProductScreen
