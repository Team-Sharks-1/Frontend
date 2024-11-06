import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button'; // Assuming Button component is available in the same directory

const VendorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-600 text-white px-4">
      <div className="bg-white text-center p-8 rounded-lg shadow-lg max-w-3xl w-full mt-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to Your Dashboard</h1>
        <p className="text-gray-700 mb-6">Manage your services, view bookings, and update your profile here.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-100 p-4 rounded-lg text-blue-600 shadow-md">
            <h2 className="text-xl font-semibold mb-2">View Bookings</h2>
            <p className="text-gray-600 mb-4">Check your current and upcoming bookings.</p>
            <Button onClick={() => navigate('/vendor/bookings')} className="bg-blue-600 text-white w-full hover:bg-blue-700">
              Go to Bookings
            </Button>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg text-blue-600 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Manage Services</h2>
            <p className="text-gray-600 mb-4">Edit or add new services to your offerings.</p>
            <Button onClick={() => navigate('/vendor/services')} className="bg-blue-600 text-white w-full hover:bg-blue-700">
              Manage Services
            </Button>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg text-blue-600 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Profile Settings</h2>
            <p className="text-gray-600 mb-4">Update your profile information and contact details.</p>
            <Button onClick={() => navigate('/vendor/profile')} className="bg-blue-600 text-white w-full hover:bg-blue-700">
              Update Profile
            </Button>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg text-blue-600 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Logout</h2>
            <p className="text-gray-600 mb-4">Logout from your account securely.</p>
            <Button onClick={() => navigate('/login/professional')} className="bg-blue-600 text-white w-full hover:bg-blue-700">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
