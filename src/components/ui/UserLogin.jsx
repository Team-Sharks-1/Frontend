import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserLogin.css'; // Assuming you have a CSS file for styling

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace the following with your actual authentication logic
    const isAuthenticated = true; // Simulating a successful login

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
