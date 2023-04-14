import {createSlice} from '@reduxjs/toolkit'

const orderDeliverSlice = createSlice({
    name: 'order',
    initialState: {},
    reducers: {
        requestDeliver: (state, action) => {
            return {loading: true }
        },
        successDeliver: (state, action) => {
            return { loading: false, success: true };
        },
        failDeliver: (state, action) => {
            return { loading: false, error: action.payload }
        },
        resetDeliver: (state, action) => {
            return {}
        }
    }
});



export const { requestDeliver, successDeliver, failDeliver, resetDeliver } = orderDeliverSlice.actions;

export default orderDeliverSlice.reducer;