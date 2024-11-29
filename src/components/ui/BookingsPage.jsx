import React, { useState, useEffect } from 'react';
import { Wrench, Book, Brush, Hammer, Car, Dog, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import axios from 'axios'; // Import axios for API calls
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

const locations = [
  { label: "Downtown", value: "Downtown" },
  { label: "Uptown", value: "Uptown" },
  { label: "Eastside", value: "Eastside" },
  { label: "Westside", value: "Westside" }
];

const BookingForm = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(''); // Store selected price
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState(''); // Store selected date
  const [userDetails, setUserDetails] = useState({
    contact: '',
    additionalDetails: '', // This will store additional details (description)
  });

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Function to convert time from 12-hour format (e.g., "10:00 AM") to 24-hour format (e.g., "10:00:00")
  const convertTo24HourFormat = (time) => {
    const [hours, minutes] = time.split(':');
    const [minutePart, period] = minutes.split(' ');

    let newHours = parseInt(hours, 10);
    if (period === 'PM' && newHours !== 12) {
      newHours += 12;
    }
    if (period === 'AM' && newHours === 12) {
      newHours = 0; // Convert 12 AM to 00:00
    }

    // Ensure the time is in HH:mm:ss format
    return `${String(newHours).padStart(2, '0')}:${minutePart.padStart(2, '0')}:00`;
  };

  const handleBookingConfirm = async () => {
    // Ensure all fields are filled in, including the price and date
    if (
      !selectedService ||
      !selectedTime ||
      !selectedLocation ||
      !selectedPrice || // Ensure price is selected
      !selectedDate || // Ensure date is selected
      !userDetails.contact
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    // Use "No description provided by user" if additionalDetails (description) is empty
    const description = userDetails.additionalDetails || 'No description provided by user';

    // Convert time to 24-hour format (HH:mm:ss)
    const convertedTime = convertTo24HourFormat(selectedTime);

    // Booking data to send to the backend
    const bookingDetails = {
      service: selectedService,
      time: convertedTime, // Send the converted time in HH:mm:ss format
      date: selectedDate, // Selected date
      location: selectedLocation,
      contact: userDetails.contact, // Move contact here
      description: description, // Move description here
      price: selectedPrice, // Include price in the data being sent
    };

    try {
      // Fetch the JWT token from localStorage
      const token = localStorage.getItem('token');

      // Making API call to create the booking
      const response = await axios.post('http://localhost:3001/api/bookings', bookingDetails, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add the token to the headers
        }
      });

      // Handle successful booking creation
      if (response.status === 201) {
        alert('Your booking has been successfully created!');
        navigate('/bookings'); // Navigate to bookings page
      } else {
        alert('There was an issue creating your booking. Please try again.');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('There was an error while submitting your booking. Please try again.');
    }
  };

  // Create a price range (10, 20, 30, ..., 100)
  const priceOptions = [];
  for (let i = 10; i <= 100; i += 10) {
    priceOptions.push(i);
  }

  // Generate the minimum and maximum allowed dates for the date picker
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const today = new Date();
    today.setMonth(today.getMonth() + 3); // Add 3 months
    return today.toISOString().split('T')[0];
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

      {/* Date Picker */}
      <div className="form-section">
        <label htmlFor="date">Select Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={getTodayDate()}
          max={getMaxDate()}
          required
        />
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

      {/* Location Dropdown */}
      <div className="form-section">
        <label htmlFor="location">Select Location:</label>
        <select
          id="location"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          required
        >
          <option value="">Choose a location</option>
          {locations.map((loc) => (
            <option key={loc.value} value={loc.value}>
              {loc.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Dropdown */}
      <div className="form-section">
        <label htmlFor="price">Select Price:</label>
        <select
          id="price"
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
          required
        >
          <option value="">Choose a price</option>
          {priceOptions.map((price) => (
            <option key={price} value={price}>
              ${price}
            </option>
          ))}
        </select>
      </div>

      {/* User's Contact Details */}
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

      {/* Additional Details (Description) */}
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
