import {createSlice} from '@reduxjs/toolkit'


const userDetailsSlice = createSlice({
    name: 'user',
    initialState: {user: null},
    reducers: {
        requestDetails: (state, action) => {
            return { ...state, loading: true }
        },
        successDetails: (state, action) => {
            return { loading: false, user: action.payload }
        },
        failDetails: (state, action) => {
            return { loading: false, error: action.payload }
        },
        reset: (state, action) => {
            return { user: {} }
        },
    }
});

export const {requestDetails, successDetails, failDetails, reset} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;