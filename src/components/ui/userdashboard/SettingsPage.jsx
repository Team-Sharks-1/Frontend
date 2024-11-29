import React, { useState } from 'react';

const SettingsPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    // Validate form
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      setSuccess(''); // Clear success message if validation fails
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      setSuccess(''); // Clear success message
      return;
    }

    if (currentPassword === newPassword) {
      setError('New password cannot be the same as the current password.');
      setSuccess(''); // Clear success message
      return;
    }

    // Clear any previous error message
    setError('');

    try {
      const token = localStorage.getItem('token'); // Assuming JWT is stored in localStorage

      if (!token) {
        setError('You are not authenticated. Please log in again.');
        setSuccess('');
        return;
      }

      // Send API request to change password
      const response = await fetch('http://localhost:3001/api/user_change_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Pass JWT token in the Authorization header
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message); // Show success message
        setError(''); // Clear error message
      } else {
        setError(data.error || 'An error occurred while updating the password.');
        setSuccess(''); // Clear success message
      }
    } catch (error) {
      setError('An error occurred while updating the password.');
      setSuccess(''); // Clear success message
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSaveChanges}>
          {/* Current Password */}
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-sm font-semibold mb-2">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-semibold mb-2">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Error or Success Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          {/* Save Changes Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
