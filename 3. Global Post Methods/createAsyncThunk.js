import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk for user registration
export const registerUser = createAsyncThunk('user/registerUser', async (userData) => {
  try {
    const response = await axios.post('/api/register', userData);
    console.log('User registered:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export user reducer
export default userSlice.reducer;



import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from './userSlice';

const UserRegistrationPage = () => {
  const dispatch = useDispatch();

  const handleRegistration = () => {
    const newUser = {
      username: 'johndoe',
      password: 'mypassword',
      email: 'johndoe@example.com',
      // additional user data
    };
    dispatch(registerUser(newUser));
  };

  return (
    <div>
      {/* Render user registration form */}
      <button onClick={handleRegistration}>Register User</button>
    </div>
  );
};

export default UserRegistrationPage;
