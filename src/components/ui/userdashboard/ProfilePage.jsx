import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [customer, setCustomer] = useState(null);

  // Fetch customer data (can replace with actual API call)
  useEffect(() => {
    const customerData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '+1 234 567 890',
    };
    setCustomer(customerData);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      {customer ? (
        <>
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
            <p className="mb-2"><strong>Name:</strong> {customer.name}</p>
            <p className="mb-2"><strong>Email:</strong> {customer.email}</p>
            <p className="mb-4"><strong>Phone:</strong> {customer.phone}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Edit Profile
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
