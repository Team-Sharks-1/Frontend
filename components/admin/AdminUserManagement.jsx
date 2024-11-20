import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:3001/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-blue-600 mb-6">User Management</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                  <Link to={`/admin/users/edit/${user.id}`} className="text-blue-600">Edit</Link> | 
                  <button className="text-red-600"> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserManagement;
