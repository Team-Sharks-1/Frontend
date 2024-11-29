import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfessionalRegister.css'; // Import the CSS file

const services = [
  { id: 'electrician', name: 'Electrician', icon: 'Wrench', description: 'Licensed electricians for all your electrical needs' },
  { id: 'plumber', name: 'Plumber', icon: 'Wrench', description: 'Expert plumbers for repairs and installations' },
  { id: 'gardener', name: 'Gardener', icon: 'Brush', description: 'Professional garden and landscape maintenance' },
  { id: 'tutor', name: 'Tutor', icon: 'Book', description: 'Expert tutors in various subjects' },
  { id: 'maid', name: 'Maid', icon: 'Brush', description: 'Professional cleaning services' },
  { id: 'carpenter', name: 'Carpenter', icon: 'Hammer', description: 'Skilled carpenters for all woodwork' },
  { id: 'mechanic', name: 'Mechanic', icon: 'Car', description: 'Expert auto repair and maintenance' },
  { id: 'petcare', name: 'Pet Care', icon: 'Dog', description: 'Professional pet sitting and care' },
  { id: 'healthcare', name: 'Healthcare', icon: 'Heart', description: 'Home healthcare services' },
];

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
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

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
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate('/login/professional'), 2000);
      } else {
        setErrorMessage(data.error || 'Failed to register professional. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Professional Registration</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleRegister} className="register-form">
        <label>Type of Service</label>
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a Service Type</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
        
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
