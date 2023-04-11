import {createSlice} from '@reduxjs/toolkit'

const orderPaySlice = createSlice({
    name: 'order',
    initialState: {},
    reducers: {
        requestPay: (state, action) => {
            return {loading: true }
        },
        successPay: (state, action) => {
            return { loading: false, success: true };
        },
        failPay: (state, action) => {
            return { loading: false, error: action.payload }
        },
        reset: (state, action) => {
            return {}
        }
    }
});



export const { requestPay, successPay, failPay, reset } = orderPaySlice.actions;

export default orderPaySlice.reducer;