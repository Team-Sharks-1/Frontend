import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfessionalLogin.css'; // Import the CSS file

function ProfessionalLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // To display error messages if login fails

  // Handle form submission
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/login_professional', {  // Ensure the correct endpoint is used
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token in localStorage
        localStorage.setItem('jwt_token', data.token);

        // Optionally, store other user details like the ID or name if needed
        // localStorage.setItem('user_id', data.professional.id); // Example if you want to store user info

        // If login is successful, navigate to the dashboard or any other page
        navigate('/vendor/dashboard');
      } else {
        // If an error occurs, set an error message to display
        setErrorMessage(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      // Handle any network or unexpected errors
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Professional Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if any */}
      <form onSubmit={handleLogin} className="login-form">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default ProfessionalLogin;
