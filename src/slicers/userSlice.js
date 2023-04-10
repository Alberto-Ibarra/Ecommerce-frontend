import {createSlice} from '@reduxjs/toolkit'

const userLoginSlice = createSlice({
    name: 'userInfo',
    initialState: {},
    reducers: {
        request: (state, action) => {
            return { loading: true }
        },
        success: (state, action) => {
            return { loading: false, userInfo: action.payload }
        },
        fail: (state, action) => {
            return { loading: false, error: action.payload }
        },
        logout: (state, action) => {
            return {  }
        }
    }
});



export const { request, success, fail, logout } = userLoginSlice.actions;

export default userLoginSlice.reducer;
