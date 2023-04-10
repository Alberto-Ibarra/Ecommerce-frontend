import {createSlice} from '@reduxjs/toolkit'


const userUpdateProfileSlice = createSlice({
    name: 'userInfo',
    initialState: {},
    reducers: {
        requestUpdateProfile: (state, action) => {
            return { loading: true }
        },
        successUpdateProfile: (state, action) => {
            return { loading: false, success:true, userInfo: action.payload }
        },
        failUpdateProfile: (state, action) => {
            return { loading: false, error: action.payload }
        },
    }
});

export const {requestUpdateProfile, successUpdateProfile, failUpdateProfile} = userUpdateProfileSlice.actions;
export default userUpdateProfileSlice.reducer;