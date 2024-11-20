import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import Button from '../ui/Button'; // Correct path for Button component
import Input from '../ui/Input';   // Correct path for Input component
import { Button } from '../ui/Button';  // Use named import since Button is a named export


const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // To manage loading state

  // Handle the login process
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setLoading(true); // Start loading

    try {
      // Send API request to authenticate the admin
      const response = await fetch('http://localhost:3001/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Ensure cookies are sent with the request
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      // Redirect to the admin dashboard upon successful login
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid credentials, please try again.'); // Set user-friendly error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-600 text-white px-4">
      <div className="bg-white text-center p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Submit Button */}
          <Button
            type="submit"
            className={`w-full bg-blue-600 text-white hover:bg-blue-700 py-3 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading} // Disable button during loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
