import React, { useState } from 'react';
import { Wrench, Book, Brush, Hammer, Car, Dog, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './BookingPage.css'; // Import the newly created CSS file

const services = [
  { id: 'electrician', name: 'Electrician', icon: Wrench, description: 'Licensed electricians for all your electrical needs' },
  { id: 'plumber', name: 'Plumber', icon: Wrench, description: 'Expert plumbers for repairs and installations' },
  { id: 'gardener', name: 'Gardener', icon: Brush, description: 'Professional garden and landscape maintenance' },
  { id: 'tutor', name: 'Tutor', icon: Book, description: 'Expert tutors in various subjects' },
  { id: 'maid', name: 'Maid', icon: Brush, description: 'Professional cleaning services' },
  { id: 'carpenter', name: 'Carpenter', icon: Hammer, description: 'Skilled carpenters for all woodwork' },
  { id: 'mechanic', name: 'Mechanic', icon: Car, description: 'Expert auto repair and maintenance' },
  { id: 'petcare', name: 'Pet Care', icon: Dog, description: 'Professional pet sitting and care' },
  { id: 'healthcare', name: 'Healthcare', icon: Heart, description: 'Home healthcare services' },
];

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"];
const priceRanges = [
  { label: "All Prices", value: "all" },
  { label: "$0 - $30/hr", value: "0-30" },
  { label: "$31 - $50/hr", value: "31-50" },
  { label: "$51 - $100/hr", value: "51-100" }
];

const BookingForm = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    contact: '',
    address: '',
    additionalDetails: '',
  });

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleBookingConfirm = () => {
    if (!selectedService || !selectedTime || !userDetails.address || !userDetails.name || !userDetails.contact) {
      alert('Please fill in all required fields.');
      return;
    }

    // Save the booking details to localStorage
    const bookingDetails = {
      service: selectedService,
      time: selectedTime,
      date: new Date().toISOString().split('T')[0], // Current date
      userDetails: userDetails,
    };

    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

    // Logic to submit the booking request (e.g., saving it to the user's profile or sending it to the backend)
    alert('Your booking request has been submitted!');

    // Navigate to the Bookings Page
    navigate('/bookings');
  };

  return (
    <div className="booking-form">
      <h2>Book a Service</h2>

      {/* Service Dropdown */}
      <div className="form-section">
        <label htmlFor="service">Select Service:</label>
        <select
          id="service"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          required
        >
          <option value="">Choose a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      {/* Time Dropdown */}
      <div className="form-section">
        <label htmlFor="time">Select Time:</label>
        <select
          id="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          required
        >
          <option value="">Choose a time</option>
          {timeSlots.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      {/* Location Input */}
      <div className="form-section">
        <label htmlFor="address">Your Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={userDetails.address}
          onChange={handleInputChange}
          placeholder="Enter your address"
          required
        />
      </div>

      {/* Price Range Dropdown */}
      <div className="form-section">
        <label htmlFor="priceRange">Select Price Range:</label>
        <select
          id="priceRange"
          value={selectedPriceRange}
          onChange={(e) => setSelectedPriceRange(e.target.value)}
          required
        >
          {priceRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* User's Contact Details */}
      <div className="form-section">
        <label htmlFor="name">Your Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={userDetails.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-section">
        <label htmlFor="contact">Contact Number:</label>
        <input
          type="tel"
          id="contact"
          name="contact"
          value={userDetails.contact}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Additional Details */}
      <div className="form-section">
        <label htmlFor="additionalDetails">Additional Details (Optional):</label>
        <textarea
          id="additionalDetails"
          name="additionalDetails"
          value={userDetails.additionalDetails}
          onChange={handleInputChange}
        />
      </div>

      {/* Booking Confirm Button */}
      <button onClick={handleBookingConfirm}>Confirm Booking</button>
    </div>
  );
};

export default BookingForm;