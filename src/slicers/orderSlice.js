import {createSlice} from '@reduxjs/toolkit'

const orderSlice = createSlice({
    name: 'order',
    initialState: {},
    reducers: {
        request: (state, action) => {
            return { loading: true }
        },
        success: (state, action) => {
            return { loading: false, success:true,  order: action.payload }
        },
        fail: (state, action) => {
            return { loading: false, error: action.payload }
        },
    }
});



export const { request, success, fail } = orderSlice.actions;

export default orderSlice.reducer;