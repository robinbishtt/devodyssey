import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice/auth.slice";
import BlogsReducer from "./slice/blogSlice/blogs.slice";
import interactReducer from "./slice/blogSlice/interactionSlice/interact.slice";

export const store = configureStore({
    reducer: {
        authReducer,
        blogs: BlogsReducer,
        interactReducer,
    },
});
