import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false); // state for loading status
  const [error, setError] = useState(false); // state for holding error status
  const [success, setSuccess] = useState(false); // state for holding success status

  const registerUser = async (userData) => {
    try {
      setLoading(true); // set loading status to true
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/users',
        userData
      );
      const data = response.data;
      console.log('User created:', data);
      setSuccess(true); // set success status to true
      setLoading(false); // set loading status to false
    } catch (error) {
      console.error('Error creating user:', error);
      setError(true); // set error status to true
      setLoading(false); // set loading status to false
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render loading message if loading is true */}
      {loading && <p>Loading...</p>}
      {/* Render error message if error is true */}
      {error && <p>Error: Failed to create user. Please try again.</p>}
      {/* Render success message if success is true */}
      {success && <p>Success: User created successfully!</p>}
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
