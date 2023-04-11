import { createSlice } from '@reduxjs/toolkit';

// Define the user registration action
export const registerUser = (userData) => async (dispatch) => {
  dispatch(registerUserPending());

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log('User registered:', data);
    dispatch(registerUserFulfilled(data));
  } catch (error) {
    console.error('Error registering user:', error);
    dispatch(registerUserRejected(error.message));
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
    registerUserPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerUserFulfilled: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    registerUserRejected: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export user reducer and actions
export const { registerUserPending, registerUserFulfilled, registerUserRejected } =
  userSlice.actions;
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

