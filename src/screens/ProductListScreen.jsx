import React, { useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Button, Table, Row, Col} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { fetchProducts } from '../actions/productActions'


const ProductListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productList = useSelector(state => state.productsList)
    const { loading, error, products } = productList
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(fetchProducts())
            console.log('test');
        }else{
            navigate('/login')
        }
}, [dispatch, navigate])

    const deleteHandler = (id) => {
        if(window.confirm(`Are you sure?`)){
            //delete prodcuts
        }
    }

    const createProductHandler = () => {
        console.log('test');
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'>Create Product</i>
                    </Button>
                </Col>
            </Row>


            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {products && products.map(product=>(
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(product._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default ProductListScreen