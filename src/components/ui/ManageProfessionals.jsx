import React from "react";

const ManageProfessionals = () => {
    console.log("ManageProfessionals component rendered!");
    const professionals = [
        { id: 1, name: "Alice Johnson", profession: "Tutor", contact: "alice@example.com", rating: 4.5 },
        { id: 2, name: "Bob Smith", profession: "Plumber", contact: "bob@example.com", rating: 4.2 },
        { id: 3, name: "Charlie Brown", profession: "Electrician", contact: "charlie@example.com", rating: 4.8 },
        { id: 4, name: "Diana Prince", profession: "Cleaner", contact: "diana@example.com", rating: 4.6 },
    ];

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8 text-white">Manage Professionals</h1>
            <div className="bg-white shadow-md p-6 rounded-lg">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-left text-gray-800">
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Profession</th>
                            <th className="px-4 py-2 border">Contact</th>
                            <th className="px-4 py-2 border">Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {professionals.map((professional) => (
                            <tr key={professional.id} className="hover:bg-gray-100 text-gray-700">
                                <td className="px-4 py-2 border">{professional.id}</td>
                                <td className="px-4 py-2 border">{professional.name}</td>
                                <td className="px-4 py-2 border">{professional.profession}</td>
                                <td className="px-4 py-2 border">{professional.contact}</td>
                                <td className="px-4 py-2 border">{professional.rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProfessionals;
