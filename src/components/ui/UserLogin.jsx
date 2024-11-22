import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import Input from './Input';

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for error message

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous error
    // Check for hardcoded admin credentials
    if (email === 'gajuparikshek@gmail.com' && password === '12345678') {
      // Save a fake token and role in localStorage
      localStorage.setItem('token', 'admin-token');
      localStorage.setItem('role', 'admin');
      // Redirect to the dashboard
      navigate('/dashboard');
      return;
    }
    // Continue with API call for other users
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error('Invalid email or password');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token); // Save token in localStorage
      // Redirect to the user-specific dashboard or home
      navigate('/');
    } catch (err) {
      setError(err.message); // Set the error message to display
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-600 text-white px-4">
      <div className="bg-white text-center p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">User Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-left text-gray-600 mb-1">Email</label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full text-black placeholder-gray-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-left text-gray-600 mb-1">Password</label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full text-black placeholder-gray-500"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3">
            Login
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message */}
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/register-options')}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
