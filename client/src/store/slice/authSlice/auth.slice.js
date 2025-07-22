import { createSlice } from "@reduxjs/toolkit";
import { deleteUserThunk, getProfileThunk, loginUserThunk, logoutUserThunk, registerUserThunk, updateProfileThunk } from "./auth.thunk";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        deleteUser: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUserThunk.pending, (state) => { state.loading = true; })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.responseData.user;
                state.token = action.payload.token;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = action.payload.success;
                state.error = action.error.message;
            })

            // Register
            .addCase(registerUserThunk.pending, (state) => { state.loading = true; })
            .addCase(registerUserThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.responseData.user;
                state.token = action.payload.token;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(registerUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = action.payload.success;
                state.error = action.error.message;
            })

            // Get profile
            .addCase(getProfileThunk.fulfilled, (state, action) => {
                state.user = action.payload.responseData;
                state.isAuthenticated = !!action.payload.responseData?._id; // or true if user exists
                state.loading = false;
            })
            .addCase(getProfileThunk.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
            })

            // Logout user
            .addCase(logoutUserThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUserThunk.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Delete user
            .addCase(deleteUserThunk.pending, (state) => { state.loading = true; })
            .addCase(deleteUserThunk.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            })
            .addCase(deleteUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Update profile
            .addCase(updateProfileThunk.pending, (state) => { state.loading = true; })
            .addCase(updateProfileThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.responseData.user;
            })
            .addCase(updateProfileThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const { deleteUser } = authSlice.actions;
export default authSlice.reducer;
