import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button'; // Assuming you have a button component for actions

const AdminBookingsManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all bookings when the component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/admin/bookings', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch bookings');
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBookings();
  }, []);

  // Handle booking status update (Approve/Reject)
  const handleStatusUpdate = async (bookingId, status) => {
    try {
      const response = await fetch(`http://localhost:3001/api/admin/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update booking status');
      const updatedBooking = await response.json();

      // Update the state with the updated booking data
      setBookings(bookings.map((booking) =>
        booking.id === updatedBooking.id ? updatedBooking : booking
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl mx-auto">
        {error && <p className="text-red-500">{error}</p>}

        <h2 className="text-2xl font-bold text-blue-600 mb-6">Bookings Management</h2>

        {/* Bookings List */}
        <div>
          <h3 className="text-lg font-bold text-blue-600 mb-4">Pending Bookings</h3>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">Booking ID</th>
                <th className="py-2 px-4 text-left">User Name</th>
                <th className="py-2 px-4 text-left">Service</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="py-2 px-4">{booking.id}</td>
                  <td className="py-2 px-4">{booking.user.name}</td>
                  <td className="py-2 px-4">{booking.service.name}</td>
                  <td className="py-2 px-4">{new Date(booking.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{booking.status}</td>
                  <td className="py-2 px-4">
                    {booking.status === 'Pending' ? (
                      <>
                        <Button
                          onClick={() => handleStatusUpdate(booking.id, 'Approved')}
                          className="mr-2 bg-green-600 text-white hover:bg-green-700 py-2 px-4 rounded-md"
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleStatusUpdate(booking.id, 'Rejected')}
                          className="bg-red-600 text-white hover:bg-red-700 py-2 px-4 rounded-md"
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      <span className="text-gray-500">No Actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingsManagement;
