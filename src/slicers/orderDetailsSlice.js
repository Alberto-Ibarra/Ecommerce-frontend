import {createSlice} from '@reduxjs/toolkit'

const orderDetailsSlice = createSlice({
    name: 'order',
    initialState: {loading: true, orderItems: [], shippingAddress: {}, order:null},
    reducers: {
        requestDetails: (state, action) => {
            return { ...state, loading: true }
        },
        successDetails: (state, action) => {
            const order = action.payload;
            const itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
            return { loading: false, order: { ...order, itemsPrice } };
        },
        failDetails: (state, action) => {
            return { loading: false, error: action.payload }
        },
    }
});



export const { requestDetails, successDetails, failDetails } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;