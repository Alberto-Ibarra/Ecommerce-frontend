import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchProducts } from '../actions/productActions';



const HomeScreen = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const keyword = params.keyword;

    const productListState = useSelector((state) => state.productsList);
    const {products, loading, error} = productListState


    useEffect(() => {

            dispatch(fetchProducts(keyword));

    }, [dispatch, keyword]);

    // const products = []

    return (
        <>
            {/* <h1>Latest Products</h1>
            {loading 
            ? <Loader/>
            : error 
            ? <Message>{error} </Message>
            : ( */}
                <Row>
                {products && products.map(product =>{
                    return(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                    )
                })}
            </Row>
            {/* )} */}
        </>
    )
}

export default HomeScreen



