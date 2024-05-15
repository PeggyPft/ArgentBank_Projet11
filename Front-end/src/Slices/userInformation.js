import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    firstName: '',
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
        clearUserInformation(state){
            return initialState;
        },    
    },
});

export const {setUserInformation, clearUserInformation} = userInformation.actions;
export default userInformation.reducer;