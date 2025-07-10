import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../components/utils/axiosInstance.js";
import { toast } from "sonner";

// Add comment thunk
export const addCommentThunk = createAsyncThunk("/blogs/addComment", async ({ text, id }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/blogs/${id}/comment`, {
            text,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage;
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});

// Delete comment thunk
export const deleteCommentThunk = createAsyncThunk("/blogs/deleteComment", async ({ blogId, commentId }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/blogs/${blogId}/comment/${commentId}`);
        toast.info("Comment deleted");
        return response.data;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage;
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});

// Like a blog thunk
export const likeBlogThunk = createAsyncThunk("/blogs/likeBlog", async ({ id }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`/blogs/${id}/like`);
        return response.data;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage;
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});

// View blog thunk
export const viewBlogThunk = createAsyncThunk("/blogs/viewBlog", async ({ id }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/blogs/${id}/view`);
        return response.data;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage;
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});