import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button'; // Assuming you have a button component for actions
import { Link } from 'react-router-dom'; // For internal navigation (like profile editing)

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // User data
  const [error, setError] = useState(null); // Error handling
  const [serviceHistory, setServiceHistory] = useState([]); // Service history data

  // Fetch user data and service history when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/user', { // Replace with your API endpoint
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUser(data.user);
        setServiceHistory(data.serviceHistory); // Assuming the API returns service history as well
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Clear the user token or session
    navigate('/login/user'); // Redirect to the login page
  };

  return (
    <div className="min-h-screen bg-blue-600 text-white p-6">
      <div className="bg-white text-center p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        {error && <p className="text-red-500">{error}</p>}
        {user ? (
          <>
            <h1 className="text-2xl font-bold text-blue-600 mb-6">Welcome, {user.name}</h1>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <p><strong>Email:</strong> {user.email}</p>
                <Link to="/profile/edit" className="text-blue-600 hover:underline">Edit Profile</Link>
              </div>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Address:</strong> {user.address}</p>
            </div>

            {/* Service History */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-600">Service History</h2>
              {serviceHistory.length > 0 ? (
                <ul className="space-y-4">
                  {serviceHistory.map((service, index) => (
                    <li key={index} className="p-4 border-b">
                      <p><strong>Service:</strong> {service.name}</p>
                      <p><strong>Date:</strong> {new Date(service.date).toLocaleDateString()}</p>
                      <p><strong>Status:</strong> {service.status}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No services booked yet.</p>
              )}
            </div>

            {/* Buttons to Book a New Service */}
            <Button onClick={() => navigate('/service-details')} className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 mb-4">
              Book a New Service
            </Button>

            {/* Logout */}
            <Button onClick={handleLogout} className="w-full bg-red-600 text-white hover:bg-red-700 py-3">
              Logout
            </Button>
          </>
        ) : (
          <p>Loading your information...</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
