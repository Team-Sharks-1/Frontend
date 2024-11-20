import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../ui/Button'; // Assuming you have a button component for actions

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  // Fetch users, services, and bookings data on page load
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Assuming you're using session-based authentication
        const response = await fetch('http://localhost:3001/api/admin/dashboard', {
          method: 'GET',
          credentials: 'include', // Include cookies (session) with the request
        });

        if (!response.ok) throw new Error('Failed to fetch dashboard data');

        const data = await response.json();
        setUsers(data.users);
        setServices(data.services);
        setBookings(data.bookings);
      } catch (err) {
        setError(err.message); // Display error if fetching fails
      }
    };

    fetchDashboardData();
  }, []);

  // Handle logout
  const handleLogout = () => {
    // Clear session or cookies on logout
    fetch('http://localhost:3001/api/admin/logout', {
      method: 'POST',
      credentials: 'include', // Include credentials for logout
    })
      .then(() => {
        navigate('/admin/login'); // Redirect to login page
      })
      .catch(err => {
        console.error('Logout failed', err);
        navigate('/admin/login'); // Redirect to login even if logout fails
      });
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="bg-white text-center p-8 rounded-lg shadow-lg max-w-6xl mx-auto">
        {error && <p className="text-red-500">{error}</p>} {/* Display any error */}

        <h1 className="text-2xl font-bold text-blue-600 mb-6">Admin Dashboard</h1>

        {/* Analytics Section */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-600 text-white p-4 rounded-md">
            <h3 className="text-xl">Users</h3>
            <p className="text-2xl">{users.length}</p>
          </div>
          <div className="bg-green-600 text-white p-4 rounded-md">
            <h3 className="text-xl">Services</h3>
            <p className="text-2xl">{services.length}</p>
          </div>
          <div className="bg-yellow-600 text-white p-4 rounded-md">
            <h3 className="text-xl">Bookings</h3>
            <p className="text-2xl">{bookings.length}</p>
          </div>
        </div>

        {/* User Management */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600">User Management</h2>
          <Link to="/admin/users" className="text-blue-600 hover:underline">View All Users</Link>
        </div>

        {/* Service Management */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600">Service Management</h2>
          <Link to="/admin/services" className="text-blue-600 hover:underline">Manage Services</Link>
        </div>

        {/* Bookings Management */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600">Bookings Management</h2>
          <Link to="/admin/bookings" className="text-blue-600 hover:underline">View Bookings</Link>
        </div>

        {/* Settings */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600">Settings</h2>
          <Link to="/admin/settings" className="text-blue-600 hover:underline">Manage Settings</Link>
        </div>

        {/* Admin Profile */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600">Admin Profile</h2>
          <Link to="/admin/profile" className="text-blue-600 hover:underline">Edit Profile</Link>
        </div>

        {/* Logout Button */}
        <Button onClick={handleLogout} className="w-full bg-red-600 text-white hover:bg-red-700 py-3">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
