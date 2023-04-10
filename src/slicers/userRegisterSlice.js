import {createSlice} from '@reduxjs/toolkit'


const userRegisterSlice = createSlice({
    name: 'userInfo',
    initialState: {},
    reducers: {
        requestRegister: (state, action) => {
            return { loading: true }
        },
        successRegister: (state, action) => {
            return { loading: false, userInfo: action.payload }
        },
        failRegister: (state, action) => {
            return { loading: false, error: action.payload }
        },
    }
});

export const {requestRegister, successRegister, failRegister} = userRegisterSlice.actions;
export default userRegisterSlice.reducer;