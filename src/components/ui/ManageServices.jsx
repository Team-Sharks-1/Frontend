import React, { useState, useEffect } from 'react';
function ManageServices() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    // Simulate fetching services (you can replace this with an API call)
    const fetchedServices = [
      { id: 1, name: 'Plumbing', description: 'Professional plumbing services' },
      { id: 2, name: 'Electrical', description: 'Certified electricians' },
    ];
    setServices(fetchedServices);
  }, []);
  const handleDelete = (id) => {
    // Handle deletion (you can replace this with an API call)
    setServices(services.filter((service) => service.id !== id));
  };
  return (
    <div>
      <h2>Manage Services</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <button onClick={() => handleDelete(service.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ManageServices;
