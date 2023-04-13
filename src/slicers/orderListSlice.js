import {createSlice} from '@reduxjs/toolkit'


const myOrdersSlice = createSlice({
    name: 'orders',
    initialState: {orders: []},
    reducers: {
        requestOrder: (state, action) => {
            return { loading: true }
        },
        successOrder: (state, action) => {
            return { loading: false, orders: action.payload }
        },
        failOrder: (state, action) => {
            return { loading: false, error: action.payload }
        },
    }
});

export const {requestOrder, successOrder, failOrder} = myOrdersSlice.actions;
export default myOrdersSlice.reducer;