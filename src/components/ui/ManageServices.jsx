// ManageServices.jsx
import React from "react";

const ManageServices = () => {
    const services = [
        { id: 1, name: "Cleaning", price: "$50" },
        { id: 2, name: "Plumbing", price: "$75" },
        { id: 3, name: "Tutor Services", price: "$40/hour" },
    ];

    return (
        <div>
            <h1>Manage Services</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service.id}>
                            <td>{service.id}</td>
                            <td>{service.name}</td>
                            <td>{service.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageServices;
