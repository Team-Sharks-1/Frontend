import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfessionalRegister.css'; // Import the CSS file

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
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Professional Registration</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if any */}
      {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message if any */}
      <form onSubmit={handleRegister} className="register-form">
        <label>Type of Service</label>
        <input
          type="text"
          name="serviceType"
          value={formData.serviceType}
          onChange={handleInputChange}
          placeholder="Enter your service type (e.g., Plumber, Electrician)"
          required
        />
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
          required
        />
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Enter your address"
          required
        />
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          required
        />
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="Enter your phone number"
          required
        />
        <label>Service License ID</label>
        <input
          type="text"
          name="licenseId"
          value={formData.licenseId}
          onChange={handleInputChange}
          placeholder="Enter your service license ID"
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Create a password"
          required
        />
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default ProfessionalRegister;
