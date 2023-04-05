import { createSlice } from "@reduxjs/toolkit";

const productDetailsSlice = createSlice({
    name: 'product',
    initialState: {
        product: { reviews: []}
    },
    reducers: {
        requestDetails: (state, action) => {
            return { loading: true, ...state.product }
        },
        successDetails: (state, action) => {
            return { loading: false, product: action.payload }
        },
        failDetails: (state, action) => {
            return { loading: false, error: action.payload }
        }
    }
});

export const { requestDetails, successDetails, failDetails } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;