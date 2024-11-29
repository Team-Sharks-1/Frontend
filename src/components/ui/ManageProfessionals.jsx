import React, { useEffect, useState } from "react";

const ManageProfessionals = () => {
    console.log("ManageProfessionals component rendered!");

    const [professionals, setProfessionals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [verificationStatus, setVerificationStatus] = useState(null); // For storing success message
    const [verifiedId, setVerifiedId] = useState(null); // To track the ID of the professional that was verified or not

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

    // Handle the Verified or Not Verified button click
    const handleVerification = (id, isVerified) => {
        const statusMessage = isVerified
            ? "Professional successfully Verified"
            : "Professional successfully Not Verified";

        // Show the success message in a dialog box
        setVerificationStatus(statusMessage);
        setVerifiedId(id);

        // Update the professional's verification status
        const updatedProfessionals = professionals.map((professional) => {
            if (professional.id === id) {
                return { ...professional, isVerified }; // Set the verified or not verified status
            }
            return professional;
        });
        setProfessionals(updatedProfessionals); // Update the state with the new professionals array
    };

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
                {verificationStatus && (
                    <div className="bg-green-500 text-white p-4 rounded-lg mb-4">
                        {verificationStatus}
                    </div>
                )}
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-left text-gray-800">
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Profession</th>
                            <th className="px-4 py-2 border">Contact (Email)</th>
                            <th className="px-4 py-2 border">Service License ID</th>
                            <th className="px-4 py-2 border">Verification</th>
                        </tr>
                    </thead>
                    <tbody>
                        {professionals.map((professional) => (
                            <tr key={professional.id} className="hover:bg-gray-100 text-gray-700">
                                <td className="px-4 py-2 border">{professional.id}</td>
                                <td className="px-4 py-2 border">{professional.name}</td>
                                <td className="px-4 py-2 border">{professional.profession}</td>
                                <td className="px-4 py-2 border">{professional.contact}</td>
                                <td className="px-4 py-2 border">{professional.licenseId}</td>
                                <td className="px-4 py-2 border">
                                    {/* If not verified, show the buttons */}
                                    {!professional.isVerified && (
                                        <>
                                            <button
                                                className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                                                onClick={() => handleVerification(professional.id, true)}
                                            >
                                                Verified
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-red-500 text-white rounded"
                                                onClick={() => handleVerification(professional.id, false)}
                                            >
                                                Not Verified
                                            </button>
                                        </>
                                    )}
                                    {/* If verified, show the status */}
                                    {professional.isVerified === true && (
                                        <span className="text-green-500 font-bold">Verified</span>
                                    )}
                                    {/* If not verified, show the status */}
                                    {professional.isVerified === false && (
                                        <span className="text-red-500 font-bold">Not Verified</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProfessionals;
