import { request, success, fail, logout } from "../slicers/userSlice";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    try {
            dispatch(request())
            const config = {
                headers:{
                    'Content-Type': 'application/json'
                }
            }
            const {data} = await axios.post('http://localhost:5000/api/users/login', {email,password}, config)
            dispatch(success())
            localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(fail(error))
    }
}


export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch(logout())
}