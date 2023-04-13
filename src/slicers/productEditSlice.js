import { createSlice } from "@reduxjs/toolkit";

const productEditSlice = createSlice({
    name: 'product',
    initialState: {product:{}},
    reducers: {
        requestEdit: (state, action) => {
            return { loading: true }
        },
        successEdit: (state, action) => {
            return { loading: false, success: true, product: action.payload}
        },
        failEdit: (state, action) => {
            return { loading: false, error: action.payload }
        },
        resetEdit: (state, action) => {
            return { product:{} }
        }
    }
});

export const { requestEdit, successEdit, failEdit, resetEdit} = productEditSlice.actions;
export default productEditSlice.reducer;