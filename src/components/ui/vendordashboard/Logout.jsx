import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Remove JWT token from localStorage (or wherever it is stored)
    localStorage.removeItem('jwt_token'); // Clear the token to log out the user

    // Optionally, you can clear other user data as well
    // localStorage.removeItem('user_id'); // If you store any other user-related info

    // Redirect to the login options page after logging out
    navigate('/login-options'); // Adjust the URL to where you want the user to go after logout
  }, [navigate]);

  return <p>Logging out...</p>; // Display a logging out message while the effect is running
}

export default Logout;
