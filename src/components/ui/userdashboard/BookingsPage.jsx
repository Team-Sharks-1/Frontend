import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingsPage = () => {
  const [currentBookings, setCurrentBookings] = useState([]);
  const [previousBookings, setPreviousBookings] = useState([]);

  // Function to format the date to "YYYY-MM-DD"
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Fetch booking data from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Assuming the user is authenticated with a JWT token in localStorage
        const token = localStorage.getItem('token');
        
        // Fetch bookings from the backend API
        const response = await axios.get('http://localhost:3001/api/user_bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allBookings = response.data;

        // Get the current date for comparison
        const currentDate = new Date();

        // Filter future or current bookings for currentBookings
        const futureBookings = allBookings.filter((booking) => new Date(booking.date) >= currentDate);

        // Filter past bookings for previousBookings
        const pastBookings = allBookings.filter((booking) => new Date(booking.date) < currentDate);

        setCurrentBookings(futureBookings);
        setPreviousBookings(pastBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        alert('No Booking Found.');
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      {/* Current Bookings Section */}
      <div className="bg-white shadow-md p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Current Bookings</h2>
        {currentBookings.length > 0 ? (
          currentBookings.map((booking) => (
            <div key={booking.id} className="border-b py-4">
              <p><strong>Service:</strong> {booking.service_type.charAt(0).toUpperCase() + booking.service_type.slice(1)}</p> {/* Capitalized first letter */}
              <p><strong>Date:</strong> {formatDate(booking.date)}</p> {/* Cleaned date */}
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Status:</strong> {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</p> {/* Capitalized status */}
            </div>
          ))
        ) : (
          <p>You have no upcoming bookings.</p>
        )}
      </div>

      {/* Previous Bookings Section */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Previous Bookings</h2>
        {previousBookings.length > 0 ? (
          previousBookings.map((booking) => (
            <div key={booking.id} className="border-b py-4">
              <p><strong>Service:</strong> {booking.service_type.charAt(0).toUpperCase() + booking.service_type.slice(1)}</p> {/* Capitalized first letter */}
              <p><strong>Date:</strong> {formatDate(booking.date)}</p> {/* Cleaned date */}
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Status:</strong> {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</p> {/* Capitalized status */}
            </div>
          ))
        ) : (
          <p>You have no previous bookings.</p>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
