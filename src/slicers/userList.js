import {createSlice} from '@reduxjs/toolkit'


const userListSlice = createSlice({
    name: 'users',
    initialState: {users: []},
    reducers: {
        requestList: (state, action) => {
            return { loading: true }
        },
        successList: (state, action) => {
            return { loading: false, users: action.payload }
        },
        failList: (state, action) => {
            return { loading: false, error: action.payload }
        },
        resetList: (state, action) => {
            return { users: [] }
        },
    }
});

export const {requestList, successList, failList, resetList} = userListSlice.actions;
export default userListSlice.reducer;