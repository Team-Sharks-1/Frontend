import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Bookings() {
  const [bookingData, setBookingData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch bookings from the backend
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('jwt_token'); // Assuming token is stored in localStorage
        const response = await axios.get('http://localhost:3001/api/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookingData(response.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings. Please try again later.');
      }
    };

    fetchBookings();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem('jwt_token');
      const response = await axios.post(
        `http://localhost:3001/api/booking/${id}/action`,
        { action },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the local booking data
      setBookingData((prevData) =>
        prevData.map((booking) =>
          booking.id === id ? { ...booking, status: action } : booking
        )
      );

      alert(response.data.message);
    } catch (err) {
      console.error(`Error ${action}ing booking:`, err);
      setError(`Failed to ${action} booking. ${err.response?.data?.error || ''}`);
    }
  };

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ color: '#1a73e8', textAlign: 'center' }}>Bookings Near You</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
        }}
      >
        {bookingData.map((booking) => {
          // Convert the date (in UTC) to the local timezone
          console.log(booking.customerName); // Log the customer name to check its value
          const localDate = new Date(booking.date).toLocaleString('en-US', {
            weekday: 'long',  // e.g., 'Monday'
            year: 'numeric',
            month: 'long',    // e.g., 'November'
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,     // For 12-hour format with AM/PM
          });

          // Format the time if it's a separate string
          const formattedTime = new Date(`1970-01-01T${booking.time}Z`).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });

          return (
            <div
              key={booking.id}
              style={{
                padding: '20px',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                backgroundColor: '#fff',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  height: '100px',
                  width: '100px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '50%',
                  margin: '0 auto',
                }}
              ></div>
               <h3 style={{ margin: '10px 0', fontWeight: 'bold' }}>
                  {booking.customer_name || 'No Name Available'} {/* Display placeholder text if no name */}
               </h3>
              <p style={{ color: '#777', fontSize: '14px' }}>
                {localDate} to {formattedTime}
              </p>
              <p style={{ color: '#777', fontSize: '14px' }}>{booking.location}</p>
              <p style={{ color: '#1a73e8', fontWeight: 'bold' }}>{booking.price}</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '10px',
                  marginTop: '10px',
                }}
              >
                {booking.status !== 'accepted' && (
                  <button
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#28a745', // Green color for Accept
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleAction(booking.id, 'accept')}
                  >
                    Accept
                  </button>
                )}
                {booking.status !== 'rejected' && (
                  <button
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#dc3545', // Red color for Reject
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleAction(booking.id, 'reject')}
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Bookings;
