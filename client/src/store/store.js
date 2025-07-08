import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user/user.slice";
import BlogsReducer from "./slice/blogs/blogs.slice";

export const store = configureStore({
    reducer: {
        userReducer,
        BlogsReducer,
    },
});
