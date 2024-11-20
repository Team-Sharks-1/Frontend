import React, { useState, useEffect } from 'react';
import { Button } from './Button'; // Assuming you have a button component for actions

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    appName: '',
    appDescription: '',
    paymentGateway: '',
    isPaymentEnabled: false,
  });

  const [error, setError] = useState(null);

  // Fetch current settings when the component mounts
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/admin/settings', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch settings');
        const data = await response.json();
        setSettings(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSettings();
  }, []);

  // Handle settings update
  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error('Failed to update settings');
      const data = await response.json();

      // Update the settings in state with the response data
      setSettings(data);
      alert('Settings updated successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        {error && <p className="text-red-500">{error}</p>}

        <h2 className="text-2xl font-bold text-blue-600 mb-6">Admin Settings</h2>

        {/* Settings Form */}
        <form onSubmit={handleUpdateSettings} className="space-y-6">
          {/* Site Preferences */}
          <div>
            <h3 className="text-lg font-bold text-blue-600">Site Preferences</h3>
            <label className="block text-gray-700 mb-2">App Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-400 rounded-md"
              placeholder="Enter app name"
              value={settings.appName}
              onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
              required
            />
            <label className="block text-gray-700 mt-4 mb-2">App Description</label>
            <textarea
              className="w-full p-2 border border-gray-400 rounded-md"
              placeholder="Enter app description"
              value={settings.appDescription}
              onChange={(e) => setSettings({ ...settings, appDescription: e.target.value })}
              required
            />
          </div>

          {/* Payment Settings */}
          <div>
            <h3 className="text-lg font-bold text-blue-600">Payment Settings</h3>
            <label className="block text-gray-700 mb-2">Payment Gateway</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-400 rounded-md"
              placeholder="Enter payment gateway name"
              value={settings.paymentGateway}
              onChange={(e) => setSettings({ ...settings, paymentGateway: e.target.value })}
              required
            />
            <div className="mt-4">
              <label className="block text-gray-700 mb-2">Enable Payment</label>
              <input
                type="checkbox"
                checked={settings.isPaymentEnabled}
                onChange={() => setSettings({ ...settings, isPaymentEnabled: !settings.isPaymentEnabled })}
                className="mr-2"
              />
              Enable payment gateway
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3">
            Save Settings
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
