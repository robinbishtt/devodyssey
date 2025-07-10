import { createSlice } from "@reduxjs/toolkit";
import { addCommentThunk, deleteCommentThunk, likeBlogThunk, viewBlogThunk } from "./interact.thunk";

const interactSlice = createSlice({
    name: "interact",
    initialState: {
        comment: [],
        likes: [],
        views: 0,
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // Add comment
            .addCase(addCommentThunk.pending, (state) => { state.loading = true; })
            .addCase(addCommentThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.comment = action.payload.blog.comments;
            })
            .addCase(addCommentThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Delete comment
            .addCase(deleteCommentThunk.pending, (state) => { state.loading = true; })
            .addCase(deleteCommentThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.comment = action.payload.blog.comments;
            })
            .addCase(deleteCommentThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Like
            .addCase(likeBlogThunk.pending, (state) => { state.loading = true; })
            .addCase(likeBlogThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.likes = action.payload.blog.likes;
            })
            .addCase(likeBlogThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // View
            .addCase(viewBlogThunk.pending, (state) => { state.loading = true; })
            .addCase(viewBlogThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.views = action.payload.blog.views;
            })
            .addCase(viewBlogThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default interactSlice.reducer;
