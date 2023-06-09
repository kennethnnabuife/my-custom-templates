import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt from "jsonwebtoken";

// Define your async thunks for registering and logging in users
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        userData
      );
      return response.data;
    } catch (error) {
      // Extract the error message from the server-side response and pass it as part of the action payload
      const errorMessage = error.response?.data?.message || "An error occurred";
      return thunkAPI.rejectWithValue({ error: errorMessage });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCheck, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        userCheck
      );
      return response.data;
    } catch (error) {
      // Extract the error message from the server-side response and pass it as part of the action payload
      const errorMessage = error.response?.data?.message || "An error occurred";
      return thunkAPI.rejectWithValue({ error: errorMessage });
    }
  }
);

// Define the initial state for your auth slice
const initialState = {
  token: localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")) : null,
  username: null,
  email: null,
  registerLoading: false,
  registerSuccess: false,
  registerError: null,
  loginLoading: false,
  loginSuccess: false,
  loginError: null,
};

// Define your auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      state.username = null;
      state.email = null;
      state.registerLoading = false;
      state.registerSuccess = false;
      state.registerError = null;
      state.loginLoading = false;
      state.loginSuccess = false;
      state.loginError = null;
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerSuccess = false;
        state.registerError = null;
        state.registerLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.registerError = null;
        state.registerSuccess = true;
        state.token = action.payload;
        state.username = jwt.decode(state.token).username;
        state.email = jwt.decode(state.token).email;
        localStorage.setItem("authToken", state.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        // Store the error message in the state
        state.registerLoading = false;
        state.registerSuccess = false;
        state.registerError = action.payload.error;
      })
    
      .addCase(loginUser.pending, (state) => {
        state.loginSuccess = false;
        state.loginError = null;
        state.loginLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginError = null;
        state.loginSuccess = true;
        state.token = action.payload;
        state.username = jwt.decode(state.token).username;
        state.email = jwt.decode(state.token).email;
        localStorage.setItem("authToken", state.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        // Store the error message in the state
        state.loginLoading = false;
        state.loginSuccess = false;
        state.loginError = action.payload.error;
      });
  },
});

// Export the auth slice reducer and actions
export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
