import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchProducts } from '../actions/productActions';



const HomeScreen = () => {
    const dispatch = useDispatch()
    const productListState = useSelector((state) => state.productsList);
    const {products, loading, error} = productListState

    useEffect(()=>{
        dispatch(fetchProducts()) 
    },[dispatch])


    return (
        <>
            <h1>Latest Products</h1>
            {loading 
            ? <Loader/>
            : error 
            ? <Message>{error} </Message>
            : (
                <Row>
                {products.map(product =>{
                    return(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                    )
                })}
            </Row>
            )}
        </>
    )
}

export default HomeScreen



