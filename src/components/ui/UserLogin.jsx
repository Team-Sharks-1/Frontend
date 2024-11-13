import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserLogin.css'; // Assuming you have a CSS file for styling

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for error message

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous error
    const isAuthenticated = true; // Simulating a successful login    

    try {
      // Simulate an API call
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      // On successful login, navigate to the dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message); // Set the error message to display
    }
  
    if (isAuthenticated) {
      navigate('/service-details'); // Redirect to ServiceDetailsPage after successful login
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">User Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;
