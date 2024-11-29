import React, { useState, useEffect } from "react";

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);

    // Fetch bookings from the API when the component mounts
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/bookingsdetails');
                if (response.ok) {
                    const data = await response.json();
                    setBookings(data);
                } else {
                    console.error('Failed to fetch bookings');
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    // Handle booking cancellation (deletion)
    const handleCancel = async (bookingId) => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            try {
                const response = await fetch(`http://localhost:3001/api/bookingsdetails/${bookingId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert(`Booking with ID ${bookingId} has been deleted.`);
                    // Remove the booking from the state (frontend)
                    setBookings((prevBookings) => prevBookings.filter(booking => booking.id !== bookingId));
                } else {
                    console.error('Failed to delete booking');
                    alert('Error deleting booking');
                }
            } catch (error) {
                console.error('Error deleting booking:', error);
                alert('Error deleting booking');
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8 text-white">Manage Bookings</h1>
            <div className="bg-white shadow-md p-6 rounded-lg">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-left text-gray-800">
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">User</th>
                            <th className="px-4 py-2 border">Service</th>
                            <th className="px-4 py-2 border">Date</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-100 text-gray-700">
                                    <td className="px-4 py-2 border">{booking.id}</td>
                                    <td className="px-4 py-2 border">{booking.user}</td>
                                    <td className="px-4 py-2 border">{booking.service}</td>
                                    <td className="px-4 py-2 border">{booking.date}</td>
                                    <td className="px-4 py-2 border">
                                    <button
                                            onClick={() => handleCancel(booking.id)}
                                            className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-4 py-2 text-center">No bookings found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBookings;
