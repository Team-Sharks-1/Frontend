import React, { useState } from 'react';
import './Settings.css';

function Settings() {
  // State to manage input values and messages
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
      const token = localStorage.getItem('jwt_token'); // Assuming JWT is stored in localStorage

      if (!token) {
        setError('You are not authenticated. Please log in again.');
        setSuccess('');
        return;
      }

      // Send API request to change password
      const response = await fetch('http://localhost:3001/api/professional_change_password', {
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
    <div className="settings-container">
      <h2>Settings</h2>
      <form onSubmit={handleSaveChanges} className="settings-form">
        {/* Account Settings */}
        <h3>Account Settings</h3>
        <div className="form-group">
          <label>Change Password</label>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Error or Success Message */}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        {/* Save Changes Button */}
        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Settings;
