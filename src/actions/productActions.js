import {request, success, fail} from '../slicers/productSlice';
import axios from 'axios';

export const fetchProducts = () => async (dispatch) => {
    try{
        dispatch(request())
        const {data} = await axios.get('http://localhost:5000/api/products')
        dispatch(success(data))
    }catch(err){
        const error =  err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(fail(error))
    }
}