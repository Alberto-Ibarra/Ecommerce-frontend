import { request, success, fail, logout } from "../slicers/userSlice";
import { requestRegister, successRegister, failRegister } from "../slicers/userRegisterSlice";
import {requestDetails, successDetails, failDetails, reset} from "../slicers/userDetailsSlice"
import { requestUpdateProfile, successUpdateProfile, failUpdateProfile } from "../slicers/userUpdateProfile";
import { resetOrder } from "../slicers/orderListMyRequest";
import { requestList, successList, failList, resetList } from "../slicers/userList";
import { requestDelete, successDelete, failDelete } from "../slicers/userDeleteSlice";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    try {
            dispatch(request())
            const config = {
                headers:{
                    'Content-Type': 'application/json'
                }
            }
            const {data} = await axios.post('https://ecommerce-ap.herokuapp.com/api/users/login', {email,password}, config)
            dispatch(success())
            localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        // console.log(error);
        dispatch(fail(error))
    }
}


export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch(logout())
    dispatch(reset())
    dispatch(resetOrder())
    dispatch(resetList())
}

export const register = (name, email, password) => async (dispatch) => {
    try {
            dispatch(requestRegister())
            const config = {
                headers:{
                    'Content-Type': 'application/json'
                }
            }
            const {data} = await axios.post('https://ecommerce-ap.herokuapp.com/api/users', {name, email,password}, config)
            dispatch(successRegister())
            //user login success right after register
            dispatch(success())
            localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failRegister(error))
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
            dispatch(requestDetails())
            const {userLogin:{userInfo}} = getState()

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const {data} = await axios.get(`https://ecommerce-ap.herokuapp.com/api/users/${id}`, config)
            dispatch(successDetails(data))
    } catch (err) {
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failDetails(error))
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
            dispatch(requestUpdateProfile())
            const {userLogin:{userInfo}} = getState()

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const {data} = await axios.put(`https://ecommerce-ap.herokuapp.com/api/users/profile`, user, config)
            dispatch(successUpdateProfile(data))
    } catch (err) {
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failUpdateProfile(error))
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
            dispatch(requestList())
            const {userLogin:{userInfo}} = getState()

            const config = {
                headers:{
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            console.log('checkpoint');
            const {data} = await axios.get(`https://ecommerce-ap.herokuapp.com/api/users`, config)
            dispatch(successList(data))
            console.log('checkpoint2');
    } catch (err) {
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failList(error))
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
            dispatch(requestDelete())
            const {userLogin:{userInfo}} = getState()

            const config = {
                headers:{
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const {data} = await axios.delete(`https://ecommerce-ap.herokuapp.com/api/users/${id}`, config)
            dispatch(successDelete(data))
    } catch (err) {
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failDelete(error))
    }
}