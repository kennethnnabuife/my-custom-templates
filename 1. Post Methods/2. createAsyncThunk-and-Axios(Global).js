import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for registering a user
export const registerUser = createAsyncThunk('user/registerUser', async (userData) => {
  const response = await axios.post('http://localhost:5000/api/register', userData);
  console.log('User created:', response.data);
  return response.data; // Returns the data from the response
});

// Async thunk for logging in a user
export const loginUser = createAsyncThunk('user/loginUser', async (userCheck) => {
  const response = await axios.post('http://localhost:5000/api/login', userCheck);
  console.log('User logged in:', response.data);
  return response.data; // Returns the data from the response
});

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.user = null;
      });
  },
});

// Export the async thunks and the reducer
export { registerUser, loginUser };
export default userSlice.reducer;



// RegisterForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from './userSlice';

const RegisterForm = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
  });
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const success = useSelector((state) => state.user.success);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Render loading message if loading is true */}
        {loading && <p>Loading...</p>}
        {/* Render error message if error is not null */}
        {error && <p>Error occurred while registering user</p>}
        {/* Render success message if success is true */}
        {success && <p>User registered successfully!</p>}
        <label>
          Username:
          <input type="text" name="username" value={user.username} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
         
         

// LoginForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './userSlice';

const LoginForm = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
  });
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const success = useSelector((state) => state.user.success);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        {/* Render loading message if loading is true */}
        {loading && <p>Loading...</p>}
        {/* Render error message if error is not null */}
        {error && <p>Error occurred while logging in</p>}
        {/* Render success message if success is true */}
        {success && <p>User logged in successfully!</p>}
        <label>
          Username:
          <input type="text" name="username" value={user.username} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

