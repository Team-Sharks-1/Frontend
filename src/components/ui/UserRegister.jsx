import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import Input from './Input';

const UserRegister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // State for phone number
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for error message
  const [success, setSuccess] = useState(null); // State for success message

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setSuccess(null); // Clear any previous success messages

    // Client-side validation
    if (!name || !location || !email || !phone || !password) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    // Phone number validation (basic)
    const phoneRegex = /^[0-9]{10}$/; // Simple regex for a 10-digit phone number
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/register', { // Ensure correct API path
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, location, email, phone, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate('/login/user'), 2000); // Redirect to login after a short delay
      } else {
        // Set error message from server or generic error
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('An error occurred during registration. Please try again later.');
    }
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
              className="w-full text-black placeholder-gray-500"
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
              className="w-full text-black placeholder-gray-500"
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
              className="w-full text-black placeholder-gray-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-left text-gray-600 mb-1">Phone Number</label>
            <Input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
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
              placeholder="Create a password"
              required
              className="w-full text-black placeholder-gray-500"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3">
            Register
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message */}
          {success && <p className="text-green-500 mt-2">{success}</p>} {/* Display success message */}
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/login-options')}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
