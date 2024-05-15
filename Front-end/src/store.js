import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from './Slices/tokenSlice';
import authenticationReducer from './Slices/authentication';
import userInformationReducer from "./Slices/userInformation";

 const store = configureStore({
    reducer: {
        token: tokenReducer,
        authentication: authenticationReducer,
        userInformation: userInformationReducer,
    },

   
});

export default store;