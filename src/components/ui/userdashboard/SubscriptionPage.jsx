// src/components/ui/userdashboard/Subscription.js

import React from 'react';

const Subscription = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-6">Your Subscription</h1>

        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-4">Subscription Details</h2>
          <p className="text-lg text-gray-700 mb-4">This is where your subscription details will be displayed.</p>
          <p className="text-lg text-gray-700 mb-4">You are currently on the Premium plan.</p>
          <p className="text-lg text-gray-700">Your next payment is due on 25th December, 2024.</p>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
