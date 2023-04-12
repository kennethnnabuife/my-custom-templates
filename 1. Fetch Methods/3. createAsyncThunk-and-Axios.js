// usersSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [], loading: true, error: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default usersSlice.reducer;



import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './usersSlice';

const App = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="home">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>An error occurred...</div>
      ) : (
        <div>
          <div className="home-heading">List of users</div>
          <div className="user-details">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <img src={user.image} alt={user.name} />
                <div>{user.name}</div>
                <button onClick={() => handleAddToCart(user)}>Add User</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
