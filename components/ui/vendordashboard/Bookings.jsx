import React, { useState } from 'react';

function Bookings() {
  const bookingData = [
    { id: 1, customerName: "John Doe", date: "2023-11-10", time: "10:00 AM", location: "Westside", status: "Confirmed", price: "$55/hr" },
    { id: 2, customerName: "Jane Smith", date: "2023-11-12", time: "2:00 PM", location: "Downtown", status: "Pending", price: "$45/hr" },
    { id: 3, customerName: "Alice Johnson", date: "2023-11-15", time: "1:30 PM", location: "Eastside", status: "Cancelled", price: "$50/hr" },
    { id: 4, customerName: "Bob Brown", date: "2023-11-18", time: "11:00 AM", location: "Uptown", status: "Confirmed", price: "$60/hr" },
  ];

  // State to track the status of each booking's button (accept/reject)
  const [buttonStatus, setButtonStatus] = useState(
    bookingData.reduce((acc, booking) => ({ ...acc, [booking.id]: null }), {})
  );

  const handleAccept = (id) => {
    setButtonStatus((prevStatus) => ({ ...prevStatus, [id]: 'accepted' }));
  };

  const handleReject = (id) => {
    setButtonStatus((prevStatus) => ({ ...prevStatus, [id]: 'rejected' }));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ color: "#1a73e8", textAlign: "center" }}>Bookings Near You</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
        {bookingData.map((booking) => (
          <div key={booking.id} style={{
            padding: "20px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            backgroundColor: "#fff",
            textAlign: "center"
          }}>
            <div style={{ height: "100px", width: "100px", backgroundColor: "#e0e0e0", borderRadius: "50%", margin: "0 auto" }}></div>
            <h3 style={{ margin: "10px 0" }}>{booking.customerName}</h3>
            <p style={{ color: "#777", fontSize: "14px" }}>
              <span role="img" aria-label="star">⭐</span> {booking.date} | {booking.time} 
            </p>
            <p style={{ color: "#777", fontSize: "14px" }}>{booking.location}</p>
            <p style={{ color: "#1a73e8", fontWeight: "bold" }}>{booking.price}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
              {buttonStatus[booking.id] !== 'accepted' && (
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#28a745", // Green color for Accept
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                  onClick={() => handleAccept(booking.id)}
                >
                  Accept
                </button>
              )}
              {buttonStatus[booking.id] !== 'rejected' && (
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#dc3545", // Red color for Reject
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                  onClick={() => handleReject(booking.id)}
                >
                  Reject
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookings;
