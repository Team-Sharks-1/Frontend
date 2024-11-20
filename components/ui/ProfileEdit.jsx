import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import Input from './Input';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    // Fetch the user data to pre-fill the form (replace with your API call)
    const fetchUserData = async () => {
      const response = await fetch('http://localhost:3001/api/user', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` },
      });
      const data = await response.json();
      setUser(data.user);
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/user/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error('Failed to update profile');
      navigate('/dashboard'); // Redirect after successful edit
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-600 text-white px-4">
      <div className="bg-white text-center p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            label="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <Input
            type="email"
            label="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Input
            type="text"
            label="Phone"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
          <Input
            type="text"
            label="Address"
            value={user.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
          />
          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
