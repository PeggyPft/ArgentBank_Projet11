import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    firstName: '',
    userName: '',
    lastName: '',
    email: '',
    id: '',
};

const userInformation = createSlice({
    name: 'userInformation',
    initialState,
    reducers: {
        setUserInformation(state, action) {
            return {...state, ...action.payload};
        },
        clearUserInformation(state) {
            return initialState;
        },
        updateUserName(state,action) {
            state.userName = action.payload;
        },       
    },
});

export const {setUserInformation, clearUserInformation, updateUserName} = userInformation.actions;
export default userInformation.reducer;