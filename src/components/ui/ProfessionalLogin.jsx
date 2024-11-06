import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button'; // Assuming you have the Button component in the same directory
import Input from './Input'; // Assuming Input component is available

const ProfessionalLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add logic to handle professional login, e.g., calling an API endpoint
    console.log('Logging in professional with', email, password);

    // Navigate to the professional dashboard or homepage after login
    navigate('/professional-dashboard'); // Replace with the actual route for professionals
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-600 text-white px-4">
      <div className="bg-white text-center p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Professional Login</h1>
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
              className="w-full"
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
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3">
            Login
          </Button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/register-options')}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default ProfessionalLogin;
