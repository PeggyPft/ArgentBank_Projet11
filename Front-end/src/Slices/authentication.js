import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
};

const authentication = createSlice ({
    name: 'authentication',
    initialState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        },
    },
});

export const {login, logout} = authentication.actions;
export default authentication.reducer;