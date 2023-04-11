import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Asynchronous action using Redux Thunk middleware
export const registerUser = (userData) => async (dispatch) => {
  dispatch(registerUserStart());
  try {
    const response = await axios.post('/api/register', userData);
    dispatch(registerUserSuccess(response.data));
    console.log('User registered:', response.data);
  } catch (error) {
    dispatch(registerUserFailure(error));
    console.error('Error registering user:', error);
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    registerUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerUserSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    registerUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export action creators
export const { registerUserStart, registerUserSuccess, registerUserFailure } = userSlice.actions;

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
