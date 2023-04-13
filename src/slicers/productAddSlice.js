import { createSlice } from "@reduxjs/toolkit";

const productAddSlice = createSlice({
    name: 'product',
    initialState: {},
    reducers: {
        requestAdd: (state, action) => {
            return { loading: true }
        },
        successAdd: (state, action) => {
            return { loading: false, success: true, product: action.payload}
        },
        failAdd: (state, action) => {
            return { loading: false, error: action.payload }
        },
        resetAdd: (state, action) => {
            return {  }
        }
    }
});

export const { requestAdd, successAdd, failAdd, resetAdd} = productAddSlice.actions;
export default productAddSlice.reducer;