import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../components/utils/axiosInstance.js";
import { toast } from "sonner";

// Create blog thunk
export const createBlogThunk = createAsyncThunk("blogs/write", async ({ title, content, tags }, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.post("/blogs/create-blog", {
            title,
            content,
            tags
        });
        toast.info("Published");
        return response.data.responseData;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage;
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});

// Update blog thunk
export const updateBlogThunk = createAsyncThunk("/blogs/dashboard/editBlog", async ({ id }, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.put(`/blogs/${id}/update`);
        toast.info("Blog Updated");
        return response.data.responseData;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage;
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});

// Delete blog thunk
export const deleteBlogThunk = createAsyncThunk("blogs/delete/", async ({ id }, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.delete(`/blogs/${id}/delete`);
        toast.info("Blog deleted");
        return response.data.responseData;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage;
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});

// Get a single blog thunk
export const getSingleBlogThunk = createAsyncThunk(`/blogs`, async ({ id }, rejectWithValue) => {
    try {
        const response = await axiosInstance.get(`/blogs/${id}`);
        return response.data.responseData;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage;
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});

// Get all blogs thunk
export const getAllBlogsThunk = createAsyncThunk("/blogs/getAllBlogs", async (_, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.get("/blogs/");
        return response.data.responseData;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage;
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});

// Get search blog thunk
export const searchBlogThunk = createAsyncThunk("/blogs/", async ({ query }, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.get("/blogs/search-blogs",
            {
                params: { keyword: query }
            });
        return response.data.responseData;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage;
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});
