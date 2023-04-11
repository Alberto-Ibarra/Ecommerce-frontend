import {createSlice} from '@reduxjs/toolkit'

const orderDetailsSlice = createSlice({
    name: 'order',
    initialState: {orderItems: [], shippingAddress: {}},
    reducers: {
        requestDetails: (state, action) => {
            return { ...state, loading: true }
        },
        successDetails: (state, action) => {
            return { loading: false, order: action.payload }
        },
        failDetials: (state, action) => {
            return { loading: false, error: action.payload }
        },
    }
});



export const { requestDetails, successDetails, failDetials } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;