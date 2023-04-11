import { request, success, fail } from "../slicers/orderSlice";
import axios from 'axios';

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
            const {data} = await axios.post(`http://localhost:5000/api/orders`, order, config)
            dispatch(success(data))
    } catch (err) {
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(fail(error))
    }
}