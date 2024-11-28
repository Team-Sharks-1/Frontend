import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button'; // Import Button as a named export

const RegisterOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-600 text-white px-4">
      <div className="bg-white text-center p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Register as</h1>
        <p className="mb-6 text-gray-600">Choose an option to register:</p>
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/register/user')} 
            className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3"
          >
            User
          </Button>
          <Button 
            onClick={() => navigate('/register/professional')} 
            className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3"
          >
            Professional Service Provider
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterOptions;
