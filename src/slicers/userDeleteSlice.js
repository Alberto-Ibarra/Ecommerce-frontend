import {createSlice} from '@reduxjs/toolkit'


const userDeleteSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        requestDelete: (state, action) => {
            return { loading: true }
        },
        successDelete: (state, action) => {
            return { loading: false, success: true }
        },
        failDelete: (state, action) => {
            return { loading: false, error: action.payload }
        },
    }
});

export const {requestDelete, successDelete, failDelete} = userDeleteSlice.actions;
export default userDeleteSlice.reducer;