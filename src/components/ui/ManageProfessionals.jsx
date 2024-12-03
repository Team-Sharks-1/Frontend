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

    const handleVerification = async (id, isVerified) => {
        const statusMessage = isVerified
            ? "Professional successfully Verified"
            : "Professional successfully Not Verified";
    
        // Show the success message in a dialog box
        setVerificationStatus(statusMessage);
        setVerifiedId(id);
    
        // Update the professional's verification status in the local state
        const updatedProfessionals = professionals.map((professional) => {
            if (professional.id === id) {
                return { ...professional, isVerified }; // Update the verification status
            }
            return professional;
        });
        setProfessionals(updatedProfessionals); // Update the state with the new professionals array
    
        // Future: Make an API call to update the verification status in the database
        try {
            const response = await fetch(`http://localhost:3001/api/updateVerification/${id}`, {
                method: 'PUT', // Use PUT to update the verification status
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isVerified })
            });
    
            if (!response.ok) {
                throw new Error("Failed to update verification status");
            }
    
            // Optionally, handle response if you want to update more states or trigger re-fetching
        } catch (error) {
            console.error('Error updating verification status:', error);
        }
    };
    
    if (loading) {
        return <div className="text-center py-8 text-white">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-extrabold mb-6 text-center text-white">Manage Professionals</h1>

            {/* Success or Error Message */}
            {verificationStatus && (
                <div className="text-center mb-6 p-4 rounded-lg bg-green-500 text-white">
                    {verificationStatus}
                </div>
            )}

            <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 border">ID</th>
                            <th className="py-3 px-6 border">Name</th>
                            <th className="py-3 px-6 border">Profession</th>
                            <th className="py-3 px-6 border">Contact (Email)</th>
                            <th className="py-3 px-6 border">Service License ID</th>
                            <th className="py-3 px-6 border">Verification</th>
                            <th className="py-3 px-6 border">Certificate</th> {/* New column for certificate */}
                        </tr>
                    </thead>
                    <tbody>
                        {professionals.map((professional) => (
                            <tr key={professional.id} className="hover:bg-gray-50">
                                <td className="py-3 px-6 border">{professional.id}</td>
                                <td className="py-3 px-6 border">{professional.name}</td>
                                <td className="py-3 px-6 border">{professional.profession}</td>
                                <td className="py-3 px-6 border">{professional.contact}</td>
                                <td className="py-3 px-6 border">{professional.licenseId}</td>
                                <td className="py-3 px-6 border">
                                    {/* If not verified, show the buttons */}
                                    {!professional.isVerified && (
                                        <div className="flex space-x-2">
                                            <button
                                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-200"
                                                onClick={() => handleVerification(professional.id, true)}
                                            >
                                                Verified
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-200"
                                                onClick={() => handleVerification(professional.id, false)}
                                            >
                                                Not Verified
                                            </button>
                                        </div>
                                    )}
                                    {/* If verified, show the status */}
                                    {professional.isVerified && (
                                        <span className="text-green-500 font-semibold">Verified</span>
                                    )}
                                    {/* If not verified, show the status */}
                                    {professional.isVerified === false && (
                                        <span className="text-red-500 font-semibold">Not Verified</span>
                                    )}
                                </td>
                                {/* New Certificate Column */}
                                <td className="py-3 px-6 border">
                                    {professional.certificateUrl ? (
                                        <a 
                                            href={professional.certificateUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
                                        >
                                            View Certificate
                                        </a>
                                    ) : (
                                        <span className="text-gray-500">No Certificate</span>
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
