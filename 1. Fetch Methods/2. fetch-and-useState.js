import React, { useState, useEffect } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
        setError(true);
      }
    };
    fetchUsers();
  }, []);

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
              <div key={user.id}>
                <img src={user.image} alt={user.name} />
                <div>{user.name}</div>
                <button onClick={() => handleAddToCart(product)}>
                  Add User
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
