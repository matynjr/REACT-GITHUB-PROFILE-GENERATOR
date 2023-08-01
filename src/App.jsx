import React, { useState } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';

const App = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUser(response.data);
    } catch (error) {
      setError('User not found. Please check the username.');
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={handleChange} />
        <button type="submit">Generate Profile</button>
      </form>
      {error && <p className="error">{error}</p>}
      <UserProfile user={user} />
    </div>
  );
};

export default App;
