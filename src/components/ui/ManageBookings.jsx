// ManageBookings.jsx
import React from "react";

const ManageBookings = () => {
    const bookings = [
        { id: 1, user: "John Doe", service: "Cleaning", date: "2024-11-20" },
        { id: 2, user: "Jane Smith", service: "Plumbing", date: "2024-11-21" },
    ];

    return (
        <div>
            <h1>Manage Bookings</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Service</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.user}</td>
                            <td>{booking.service}</td>
                            <td>{booking.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageBookings;
