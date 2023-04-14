import { request, success, fail } from "../slicers/orderSlice";
import { requestDetails, successDetails, failDetails } from "../slicers/orderDetailsSlice";
import { requestPay, successPay, failPay, reset } from "../slicers/orderPaySlice";
import { requestList, successList, failList } from "../slicers/orderListMyRequest"
import { requestOrder, successOrder, failOrder } from "../slicers/orderListSlice";
import axios from 'axios';
import { requestDeliver, successDeliver, failDeliver } from "../slicers/orderDeliverSlice";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
            dispatch(request())
            const {userLogin:{userInfo}} = getState()

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const {data} = await axios.post(`https://ecommerce-ap.herokuapp.com/api/orders`, order, config)
            dispatch(success(data))
    } catch (err) {
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(fail(error))
    }
}

export const getOrderDetails= (id) => async (dispatch, getState) => {
    try {
            dispatch(requestDetails())
            const {userLogin:{userInfo}} = getState()

            const config = {
                headers:{
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const {data} = await axios.get(`https://ecommerce-ap.herokuapp.com/api/orders/${id}`, config)
            dispatch(successDetails(data))
    } catch (err) {
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failDetails(error))
    }
}


export const payOrder= (orderId, paymentResult) => async (dispatch, getState) => {
    try {
            dispatch(requestPay())
            const {userLogin:{userInfo}} = getState()

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            console.log(orderId.id);
            console.log(paymentResult);
            const {data} = await axios.put(`https://ecommerce-ap.herokuapp.com/api/orders/${orderId.id}/pay`, paymentResult, config)
            dispatch(successPay(data))
    } catch (err) {
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failPay(error))
    }
}

export const listMyOrders= () => async (dispatch, getState) => {
    try {
            dispatch(requestList())
            const {userLogin:{userInfo}} = getState()

            const config = {
                headers:{
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data} = await axios.get(`https://ecommerce-ap.herokuapp.com/api/orders/myorders`,  config)
            dispatch(successList(data))
    } catch (err) {
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failList(error))
    }
}

export const allOrders= () => async (dispatch, getState) => {
    try{
        dispatch(requestOrder())
        
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get('https://ecommerce-ap.herokuapp.com/api/orders', config)

        console.log(data);
        dispatch(successOrder(data))
    }catch(err){
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failOrder(error))
    }
}

export const deliverOrder= (order) => async (dispatch, getState) => {
    try {
        console.log(order);
            dispatch(requestDeliver())
            const {userLogin:{userInfo}} = getState()

            const config = {
                headers:{
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data} = await axios.put(`https://ecommerce-ap.herokuapp.com/api/orders/${order._id}/deliver`, {},  config)
            dispatch(successDeliver(data))
    } catch (err) {
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failDeliver(error))
    }
}