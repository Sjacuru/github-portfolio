import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Login component to authenticate users and store JWT token
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);
      // Request JWT token from backend
      const response = await axios.post(
        'http://localhost:8000/api/token/',
        params,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
      // Store token in localStorage
      localStorage.setItem('access_token', response.data.access);
      navigate('/ingredients');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError('Login failed: ' + (err.response?.data?.detail || 'Server error'));
    }
  };
  // Render login form
  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;