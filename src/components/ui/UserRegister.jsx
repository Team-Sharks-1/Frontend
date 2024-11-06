import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button'; // Assuming Button component is available in the same directory
import Input from './Input'; // Assuming Input component is available

const UserRegister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Registration logic here, e.g., an API call to register the user
    console.log('Registering user with', { name, location, email, password });

    // Navigate to the user dashboard or login page after successful registration
    navigate('/login/user'); // Redirect to login or dashboard as needed
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-600 text-white px-4">
      <div className="bg-white text-center p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">User Registration</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-left text-gray-600 mb-1">Name</label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-left text-gray-600 mb-1">Location</label>
            <Input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location"
              required
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-left text-gray-600 mb-1">Email Address</label>
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
              placeholder="Create a password"
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3">
            Register
          </Button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/login-options')}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
