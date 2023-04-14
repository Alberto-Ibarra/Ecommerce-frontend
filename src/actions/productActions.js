import {request, success, fail } from '../slicers/productSlice';
import {requestDetails, successDetails, failDetails} from '../slicers/productDetailsSlice';
import { requestDelete, successDelete, failDelete } from '../slicers/productDeleteSlice';
import { requestAdd, successAdd, failAdd, resetAdd } from '../slicers/productAddSlice';
import { requestEdit, successEdit, failEdit} from '../slicers/productEditSlice';
import { requestProductReview, successProductReview, failProductReview, resetProductReview } from '../slicers/productCreateReviewSlice';
import axios from 'axios';

export const fetchProducts = () => async (dispatch) => {
    try{
        dispatch(request())
        const {data} = await axios.get('http://localhost:5000/api/products')
        console.log(data);
        dispatch(success(data))
    }catch(err){
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(fail(error))
    }
}


export const fetchProductDetails = (id) => async (dispatch) => {
    try{
        dispatch(requestDetails())
        const {data} = await axios.get(`http://localhost:5000/api/products/${id}`,)
        console.log(data);
        dispatch(successDetails(data))
    }catch(err){
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failDetails(error))
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try{
        dispatch(requestDelete())

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`http://localhost:5000/api/products/${id}`, config)

        dispatch(successDelete())
    }catch(err){
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failDelete(error))
    }
}

export const addProduct = () => async (dispatch, getState) => {
    try{
        dispatch(requestAdd())

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const data = await axios.post(`http://localhost:5000/api/products`, {}, config)

        dispatch(successAdd(data))
    }catch(err){
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failAdd(error))
    }
}

export const editProduct = (product) => async (dispatch, getState) => {
    try{
        dispatch(requestEdit())

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            'Content-Type': 'application/json',
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const data = await axios.put(`http://localhost:5000/api/products/${product._id}`, product, config)

        dispatch(successEdit(data))
    }catch(err){
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failEdit(error))
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try{
        dispatch(requestProductReview())

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.post(`http://localhost:5000/api/products/${productId}/reviews`, review, config)

        dispatch(successProductReview())
    }catch(err){
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failProductReview(error))
    }
}