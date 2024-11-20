import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateAdminRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/admin/check-auth', {
          method: 'GET',
          credentials: 'include', // Ensure cookies are sent with the request
        });

        if (response.ok) {
          setIsAuthenticated(true); // User is authenticated
        } else {
          setIsAuthenticated(false); // User is not authenticated
        }
      } catch (err) {
        setIsAuthenticated(false); // Error occurred (e.g., no session)
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show loading while checking authentication
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />; // Redirect to login if not authenticated
  }

  return children; // If authenticated, render the children (Admin Dashboard)
};

export default PrivateAdminRoute;
