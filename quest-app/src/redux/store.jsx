import { configureStore } from "@reduxjs/toolkit";
import postReducer  from "./slices/postSlice";
import commentReducer from "./slices/commentSlice";
import likeReducer from "./slices/likeSlice";
import authReducer from "./slices/authSlice";
import  userReducer  from "./slices/userSlice";

export const store =configureStore({
    reducer:{
        post:postReducer,
        comment:commentReducer,
        like:likeReducer,
        auth:authReducer,
        user:userReducer
    }
})