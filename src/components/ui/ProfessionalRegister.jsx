import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button'; // Assuming Button component is available in the same directory
import Input from './Input'; // Assuming Input component is available

function ProfessionalRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    serviceType: '',
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
    licenseId: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState(''); // To display error messages if registration fails
  const [successMessage, setSuccessMessage] = useState(''); // To display success messages if registration succeeds

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/register_professionals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // If registration is successful, set a success message and navigate after a delay
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate('/login/professional'), 2000); // Redirect to login after a short delay
      } else {
        // If an error occurs, set an error message to display
        setErrorMessage(data.error || 'Failed to register professional. Please try again.');
      }
    } catch (error) {
      // Handle any network or unexpected errors
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
    // Navigate to the professional login or dashboard page after successful registration
    navigate('/login/professional'); // Redirect to login or dashboard as needed
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-600 text-white px-4">
      <div className="bg-white text-center p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Professional Registration</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="serviceType" className="block text-left text-gray-600 mb-1">Type of Service</label>
            <Input
              type="text"
              id="serviceType"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              placeholder="Enter your service type (e.g., Plumber, Electrician)"
              required
              className="w-full"
            />
          </div>
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
            <label htmlFor="address" className="block text-left text-gray-600 mb-1">Address</label>
            <Input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
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
            <label htmlFor="phoneNumber" className="block text-left text-gray-600 mb-1">Phone Number</label>
            <Input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              required
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="serviceLicenseID" className="block text-left text-gray-600 mb-1">Service License ID</label>
            <Input
              type="text"
              id="serviceLicenseID"
              value={serviceLicenseID}
              onChange={(e) => setServiceLicenseID(e.target.value)}
              placeholder="Enter your service license ID"
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

export default ProfessionalRegister;
