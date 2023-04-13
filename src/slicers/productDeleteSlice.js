import { createSlice } from "@reduxjs/toolkit";

const productDeleteSlice = createSlice({
    name: 'product',
    initialState: {
        product: { }
    },
    reducers: {
        requestDelete: (state, action) => {
            return { loading: true }
        },
        successDelete: (state, action) => {
            return { loading: false, success: true }
        },
        failDelete: (state, action) => {
            return { loading: false, error: action.payload }
        }
    }
});

export const { requestDelete, successDelete, failDelete } = productDeleteSlice.actions;
export default productDeleteSlice.reducer;