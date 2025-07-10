import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../components/utils/axiosInstance.js"
import { toast } from "sonner";

// Register user thunk
export const registerUserThunk = createAsyncThunk("auth/registerUser",
    async ({ fullName, username, password }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/users/register", {
            fullName,
            username,
            password,
        });
        toast.success("Registered successfully!");
        return response.data;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage;
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
})

// Login user thunk
export const loginUserThunk = createAsyncThunk(
    "auth/loginUser",
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/users/login", {
                username,
                password,
            });
            toast.success("Login successful!");
            return response.data;
        } catch (error) {
            console.error(error);
            const errorOutput = error?.response?.data?.errMessage;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput);
        }
    }
);

// Get user profile thunk
export const getProfileThunk = createAsyncThunk("auth/getProfile",
    async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/users/get-profile");
        return response.data;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage;
        return rejectWithValue(errorOutput);
    }
});

// Update user profile thunk
export const updateProfileThunk = createAsyncThunk("auth/updateProfile",
    async ({ fullName, username }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put("users/update-profile", {
            fullName,
            username
        });
        toast.info("Profile updated!");
        return response.data;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage;
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});

// Delete user account thunk
export const deleteUserThunk = createAsyncThunk("users/deleteAccount",
    async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete("/users/delete-account");
        toast.error("Sorry to see you go, Account deleted successfully!")
        return response.data;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage;
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
})