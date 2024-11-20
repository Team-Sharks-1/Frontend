import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

function Profile({ userId }) {
  const [profile, setProfile] = useState({
    name: '',
    rating: 5,
    jobs: 0,
    experience: '',
    cost_per_hour: '',
    location: '',
    description: '',
    service_type: '',
    image: null,
  });
  const [existingImage, setExistingImage] = useState(null);

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/get_professional/${userId}`);
        const userData = response.data;

        setProfile({
          name: userData.name,
          rating: userData.rating,
          jobs: userData.jobs,
          experience: userData.experience,
          cost_per_hour: userData.cost_per_hour,
          location: userData.location,
          description: userData.description,
          service_type: userData.service_type,
          image: null, // Set to null to allow for a new upload
        });
        setExistingImage(userData.image); // Set existing image path if available
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const Profile = ({ userId }) => {
      if (!userId) {
        console.error("User ID is undefined or missing.");
        return <div>Error: User ID is required</div>;  // Early return if userId is missing
      }
    
      // The rest of your component code...
    };    

    fetchProfile();
  }, [userId]);

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handler for image upload
  const handleFileChange = (e) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      image: e.target.files[0],
    }));
  };

  // Handler for form submission to save updates
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare form data to send as multipart/form-data
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('rating', profile.rating);
    formData.append('jobs', profile.jobs);
    formData.append('experience', profile.experience);
    formData.append('cost_per_hour', profile.cost_per_hour);
    formData.append('location', profile.location);
    formData.append('description', profile.description);
    formData.append('service_type', profile.service_type);
  
    // Append the image if selected
    if (profile.image) {
      formData.append('image', profile.image); // This will send the image file to the backend
    }
  
    try {
      // Make POST request to create the professional profile
      const response = await axios.post('http://localhost:3001/api/create_professional', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
  
      // Success response handling
      alert(response.data.message);  // You can display a success message from the server
  
      // Update the existing image preview if a new image was uploaded
      if (profile.image) {
        setExistingImage(URL.createObjectURL(profile.image)); // Display uploaded image preview
      }
  
      // Clear form or reset image field for future uploads
      setProfile((prevProfile) => ({ ...prevProfile, image: null }));
  
    } catch (error) {
      // Error handling
      console.error('Error submitting form:', error);
      alert(`Error updating profile: ${error.response?.data?.message || 'Internal Server Error'}`);
    }
  };
  
  return (
    <div className="profile-container">
      <h2>Profile Settings</h2>

      <form onSubmit={handleSubmit} className="profile-form">
        {/* Profile Image */}
        <div className="form-group">
          <label>Profile Image</label>
          <input type="file" onChange={handleFileChange} />
          {existingImage && !profile.image && (
            <img
              src={existingImage}
              alt="Existing Profile"
              className="profile-picture-preview"
            />
          )}
          {profile.image && (
            <img
              src={URL.createObjectURL(profile.image)}
              alt="New Profile Preview"
              className="profile-picture-preview"
            />
          )}
        </div>

        {/* Name */}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Rating */}
        <div className="form-group">
          <label>Rating</label>
          <input
            type="number"
            name="rating"
            value={profile.rating}
            onChange={handleChange}
            required
          />
        </div>

        {/* Jobs */}
        <div className="form-group">
          <label>Jobs</label>
          <input
            type="number"
            name="jobs"
            value={profile.jobs}
            onChange={handleChange}
            required
          />
        </div>

        {/* Experience */}
        <div className="form-group">
          <label>Experience (in years)</label>
          <input
            type="number"
            name="experience"
            value={profile.experience}
            onChange={handleChange}
            required
          />
        </div>

        {/* Cost per Hour */}
        <div className="form-group">
          <label>Cost per Hour ($)</label>
          <input
            type="number"
            name="cost_per_hour"
            value={profile.cost_per_hour}
            onChange={handleChange}
            required
          />
        </div>

        {/* Location */}
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={profile.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>

        {/* Service Type */}
        <div className="form-group">
          <label>Service Type</label>
          <input
            type="text"
            name="service_type"
            value={profile.service_type}
            onChange={handleChange}
            required
          />
        </div>

        {/* Save Changes Button */}
        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Profile;
