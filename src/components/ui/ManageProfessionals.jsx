import React from "react";

const ManageProfessionals = () => {
    const professionals = [
        { id: 1, name: "Alice Johnson", profession: "Tutor", contact: "alice@example.com", rating: 4.5 },
        { id: 2, name: "Bob Smith", profession: "Plumber", contact: "bob@example.com", rating: 4.2 },
        { id: 3, name: "Charlie Brown", profession: "Electrician", contact: "charlie@example.com", rating: 4.8 },
        { id: 4, name: "Diana Prince", profession: "Cleaner", contact: "diana@example.com", rating: 4.6 },
    ];

    return (
        <div>
            <h1>Manage Professionals</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Profession</th>
                        <th>Contact</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {professionals.map((professional) => (
                        <tr key={professional.id}>
                            <td>{professional.id}</td>
                            <td>{professional.name}</td>
                            <td>{professional.profession}</td>
                            <td>{professional.contact}</td>
                            <td>{professional.rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageProfessionals;
