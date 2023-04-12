import {createSlice} from '@reduxjs/toolkit'

const orderListSlice = createSlice({
    name: 'orders',
    initialState: [],
    reducers: {
        requestList: (state, action) => {
            return {loading: true }
        },
        successList: (state, action) => {
            return { loading: false, orders: action.payload };
        },
        failList: (state, action) => {
            return { loading: false, error: action.payload }
        },
        resetOrder: (state, action) => {
            return { orders: [] }
        },
    }
});



export const { requestList, successList, failList, resetOrder } = orderListSlice.actions;

export default orderListSlice.reducer;