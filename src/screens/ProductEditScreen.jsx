import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { fetchProductDetails, editProduct } from '../actions/productActions'
import { resetEdit } from '../slicers/productEditSlice'

const ProductEditScreen = () => {
    const {id: productId} = useParams();
    
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productDetails = useSelector((state) => state.productDetails)
    const {loading, error, product} = productDetails

    const productEdit = useSelector((state) => state.productEdit)
    const {loading: loadingEdit, error: errorEdit, success: successEdit } = productDetails

    console.log(productId);


    useEffect(()=>{
        if(successEdit){
            dispatch(resetEdit())
            navigate('/admin/productlist')
        }else{
            if(!product.name || product._id !== productId){
                dispatch(fetchProductDetails(productId))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
        
    }, [ dispatch, productId, product.name, product, successEdit, navigate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formdata = new FormData()
        formdata.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers:{
                    'Content-type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('http://localhost:5000/api/upload', formdata, config)
            console.log(data);
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.log(error);
            setUploading(false)
        }
    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(editProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingEdit && <Loader/>}
                {errorEdit && <Message variant='danger'>{errorEdit}</Message>}
                {loading ? (
                    <Loader/>
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ): (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e)=> setName(e.target.value)}
                                ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e)=> setPrice(e.target.value)}
                                ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image'
                                value={image}
                                onChange={(e)=> setImage(e.target.value)}
                                ></Form.Control>
                                <Form.Control type='file' controlId='image-file' Label='Choose file' custom onChange={uploadFileHandler}>
                                    
                                </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>brand</Form.Label>
                            <Form.Control
                                type='brand'
                                placeholder='Enter brand'
                                value={brand}
                                onChange={(e)=> setBrand(e.target.value)}
                                ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Stock'
                                value={countInStock}
                                onChange={(e)=> setCountInStock(e.target.value)}
                                ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>category</Form.Label>
                            <Form.Control
                                type='category'
                                placeholder='Enter category'
                                value={category}
                                onChange={(e)=> setCategory(e.target.value)}
                                ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>description</Form.Label>
                            <Form.Control
                                type='description'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e)=> setDescription(e.target.value)}
                                ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default ProductEditScreen
