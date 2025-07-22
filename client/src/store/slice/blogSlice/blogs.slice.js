import { createSlice } from "@reduxjs/toolkit";
import {
    createBlogThunk,
    deleteBlogThunk,
    getAllBlogsThunk,
    getSingleBlogThunk,
    searchBlogThunk,
    updateBlogThunk
} from "./blogs.thunk";

const blogSlice = createSlice({
    name: "blogs",
    initialState: {
        blogList: [],
        currentBlog: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get all blogs
            .addCase(getAllBlogsThunk.pending, (state) => { state.loading = true; })
            .addCase(getAllBlogsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.blogList = action.payload;
            })
            .addCase(getAllBlogsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Get a single blog
            .addCase(getSingleBlogThunk.pending, (state) => { state.loading = true; })
            .addCase(getSingleBlogThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.currentBlog.unshift(action.payload);
            })
            .addCase(getSingleBlogThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Search blogs
            .addCase(searchBlogThunk.pending, (state) => { state.loading = true; })
            .addCase(searchBlogThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.blogList.unshift(action.payload);
            })
            .addCase(searchBlogThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Create blog
            .addCase(createBlogThunk.pending, (state) => { state.loading = true; })
            .addCase(createBlogThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.blogList.unshift(action.payload);
            })
            .addCase(createBlogThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Update blog
            .addCase(updateBlogThunk.pending, (state) => { state.loading = true; })
            .addCase(updateBlogThunk.fulfilled, (state, action) => {
                state.loading = false;
                const i = state.blogList.findIndex(b => b._id === action.payload._id);
                if (i !== -1) state.blogList[i] = action.payload;
            })
            .addCase(updateBlogThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Delete blog
            .addCase(deleteBlogThunk.pending, (state) => { state.loading = true; })
            .addCase(deleteBlogThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.blogList = state.blogList.filter(blog => blog._id !== action.meta.arg.id);
            })
            .addCase(deleteBlogThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default blogSlice.reducer;
