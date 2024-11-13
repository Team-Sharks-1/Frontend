// import React, { useState } from 'react';
import './Settings.css';

function Settings() {
  
  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Logic to save settings changes
    console.log('Settings updated');
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <form onSubmit={handleSaveChanges} className="settings-form">

        {/* Account Settings */}
        <h3>Account Settings</h3>
        <div className="form-group">
          <label>Change Password</label>
          <input type="password" placeholder="Current Password" />
          <input type="password" placeholder="New Password" />
          <input type="password" placeholder="Confirm New Password" />
        </div>


        {/* Save Changes Button */}
        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Settings;
