import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';

//sets up redux store with one reducer that manages state under slice in the store
export default configureStore({
    reducer: {
        auth: authReducer,
    },
})