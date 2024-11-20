import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Perform any necessary logout operations here

    navigate('/login-options'); // Redirect to the login options page after logging out
  }, [navigate]);

  return <p>Logging out...</p>;
}

export default Logout;
