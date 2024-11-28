import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    // Clear the localStorage or sessionStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Redirect to the login page after logout
    navigate('/login/user');
  }, [navigate]);
  return (
    <div>
      <h2>Logging Out...</h2>
      <p>You will be redirected to the login page shortly.</p>
    </div>
  );
}
export default Logout;
