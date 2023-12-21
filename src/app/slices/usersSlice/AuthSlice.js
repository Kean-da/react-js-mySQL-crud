import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: (localStorage.getItem("userInfo")) ? JSON.parse(localStorage.getItem('userInfo')) : null,
};

export const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        logoutAuth: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
        }
    },
});

export const { setCredentials, logoutAuth }     = authSlice.actions;

export const selectUserInfo                     = (state) => state.auth.userInfo;

export default authSlice.reducer;