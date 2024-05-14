import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from './Slices/tokenSlice';

 const store = configureStore({
    reducer: {
        token: tokenReducer,
    },

   
});

export default store;