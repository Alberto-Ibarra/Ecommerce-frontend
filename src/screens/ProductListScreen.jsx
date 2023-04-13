import React, { useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Button, Table, Row, Col} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { fetchProducts, deleteProduct, addProduct } from '../actions/productActions'
import { resetAdd } from '../slicers/productAddSlice';
import { successDelete } from '../slicers/userDeleteSlice';



const ProductListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productList = useSelector(state => state.productsList)
    const { loading, error, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { success, loading: loadingDelete, error: errorDelete } = productDelete

    const productAdd = useSelector(state => state.productAdd)
    const { success: successAdd, loading: loadingAdd, error: errorAdd, product:createdProduct } = productAdd

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(()=>{
        dispatch(resetAdd())
        if(!userInfo.isAdmin){
            navigate('/login')
        }
        if(successAdd){
            console.log(createdProduct);
            console.log(createdProduct.data._id);
            navigate(`/admin/productlist`)
        }else{
            dispatch(fetchProducts())
        }


}, [dispatch, navigate, success, createdProduct, successAdd, userInfo, successDelete, createdProduct])

    const deleteHandler = (id) => {
        if(window.confirm(`Are you sure?`)){
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(addProduct())
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

            {loadingDelete && <Loader /> }
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingAdd && <Loader /> }
            {errorAdd && <Message variant='danger'>{errorAdd}</Message>}
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