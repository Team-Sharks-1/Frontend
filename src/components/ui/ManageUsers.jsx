import React, { useState, useEffect } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/usersdetails');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-white">Manage Users</h1>
      <div className="bg-white shadow-md p-6 rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-800">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100 text-gray-700">
                  <td className="px-4 py-2 border">{user.id}</td>
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-2 text-center">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
