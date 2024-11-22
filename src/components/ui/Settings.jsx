import React, { useState } from 'react';
function Settings() {
  const [platformName, setPlatformName] = useState('UrbanConnect');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const handlePlatformNameChange = (e) => {
    setPlatformName(e.target.value);
  };
  const handleEmailNotificationsChange = () => {
    setEmailNotifications(!emailNotifications);
  };
  return (
    <div>
      <h2>Settings</h2>
      <div>
        <label>
          Platform Name:
          <input
            type="text"
            value={platformName}
            onChange={handlePlatformNameChange}
            placeholder="Enter platform name"
          />
        </label>
      </div>
      <div>
        <label>
          Email Notifications:
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={handleEmailNotificationsChange}
          />
        </label>
      </div>
      <div>
        <button>Save Settings</button>
      </div>
    </div>
  );
}
export default Settings;
