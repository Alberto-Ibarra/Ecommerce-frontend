import { createSlice } from "@reduxjs/toolkit";

const productCreateReviewSlice = createSlice({
    name: 'product',
    initialState: {},
    reducers: {
        requestProductReview: (state, action) => {
            return { loading: true }
        },
        successProductReview: (state, action) => {
            return { loading: false, success: true }
        },
        failProductReview: (state, action) => {
            return { loading: false, error: action.payload }
        },
        resetProductReview: (state, action) => {
            return { }
        }
    }
});

export const { requestProductReview, successProductReview, failProductReview, resetProductReview} = productCreateReviewSlice.actions;
export default productCreateReviewSlice.reducer;