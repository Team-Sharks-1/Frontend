import React from "react";

const ManageBookings = () => {
    const bookings = [
        { id: 1, user: "John Doe", service: "Cleaning", date: "2024-11-20" },
        { id: 2, user: "Jane Smith", service: "Plumbing", date: "2024-11-21" },
    ];

    const handleCancel = (bookingId) => {
        alert(`Cancel booking with ID: ${bookingId}`);
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8 text-white">Manage Bookings</h1> {/* Updated text color */}
            <div className="bg-white shadow-md p-6 rounded-lg">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-left text-gray-800"> {/* Updated header text color */}
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">User</th>
                            <th className="px-4 py-2 border">Service</th>
                            <th className="px-4 py-2 border">Date</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-100 text-gray-700"> {/* Updated body text color */}
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBookings;
