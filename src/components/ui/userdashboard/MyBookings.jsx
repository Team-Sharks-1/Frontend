import React, { useState, useEffect } from 'react';

const BookingsPage = () => {
  const [currentBookings, setCurrentBookings] = useState([]);
  const [previousBookings, setPreviousBookings] = useState([]);

  useEffect(() => {
    // Get booking details from localStorage
    const storedBookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));

    if (storedBookingDetails) {
      const booking = {
        service: storedBookingDetails.service,
        date: storedBookingDetails.date,
        time: storedBookingDetails.time,
        status: 'Confirmed', // You can change this based on your logic
        id: new Date().getTime(), // Using timestamp as unique ID for now
      };

      // Separate current and previous bookings based on date
      const currentDate = new Date();
      const futureBookings = [];
      const pastBookings = [];

      if (new Date(booking.date) > currentDate) {
        futureBookings.push(booking);
      } else {
        pastBookings.push(booking);
      }

      setCurrentBookings(futureBookings);
      setPreviousBookings(pastBookings);
    }
  }, []);

  // Handle rescheduling
  const handleReschedule = (bookingId) => {
    alert(`Reschedule the booking with ID: ${bookingId}`);
    // Implement the logic to reschedule the booking (open a date/time picker, etc.)
  };

  // Handle canceling a booking
  const handleCancel = (bookingId) => {
    alert(`Cancel the booking with ID: ${bookingId}`);
    // Implement the logic to cancel the booking
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      {/* Current Bookings Section */}
      {currentBookings.length > 0 ? (
        <div className="bg-white shadow-md p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Current Bookings</h2>
          {currentBookings.map((booking) => (
            <div key={booking.id} className="border-b py-4">
              <p><strong>Service:</strong> {booking.service}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleReschedule(booking.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Reschedule
                </button>
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no upcoming bookings.</p>
      )}

      {/* Previous Bookings Section */}
      {previousBookings.length > 0 ? (
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Previous Bookings</h2>
          {previousBookings.map((booking) => (
            <div key={booking.id} className="border-b py-4">
              <p><strong>Service:</strong> {booking.service}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no previous bookings.</p>
      )}
    </div>
  );
};

export default BookingsPage;
