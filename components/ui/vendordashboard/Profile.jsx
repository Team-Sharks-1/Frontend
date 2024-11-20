import React, { useState } from 'react';
import './Profile.css'; // Import the CSS file

function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    jobs: 0,
    experience: '',
    cost_per_hour: '',
    location: '',
    description: '',
    image: null,
    service_type: '',
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save profile changes
    console.log('Profile updated:', profile);
  };

  return (
    <div className="profile-container">
      <h2>Profile Settings</h2>

      <form onSubmit={handleSubmit} className="profile-form">
        {/* Profile Image */}
        <div className="form-group">
          <label>Profile Image</label>
          <input type="file" onChange={handleFileChange} />
          {profile.image && (
            <img
              src={URL.createObjectURL(profile.image)}
              alt="Profile Preview"
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

        {/* Experience */}
        <div className="form-group">
          <label>Experience (in years)</label>
          <input
            type="text"
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
            type="text"
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
