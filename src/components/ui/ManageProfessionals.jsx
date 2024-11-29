import React, { useEffect, useState } from "react";

const ManageProfessionals = () => {
    console.log("ManageProfessionals component rendered!");

    const [professionals, setProfessionals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch professionals' data from the new API endpoint
    useEffect(() => {
        const fetchProfessionals = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/professionaldetails");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setProfessionals(data); // Set state with the data
                setLoading(false); // Stop loading once data is fetched
            } catch (err) {
                setError(err.message); // Handle any error
                setLoading(false);
            }
        };

        fetchProfessionals();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                            <th className="px-4 py-2 border">Contact (Email)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {professionals.map((professional) => (
                            <tr key={professional.id} className="hover:bg-gray-100 text-gray-700">
                                <td className="px-4 py-2 border">{professional.id}</td>
                                <td className="px-4 py-2 border">{professional.name}</td>
                                <td className="px-4 py-2 border">{professional.profession}</td>
                                <td className="px-4 py-2 border">{professional.contact}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProfessionals;
