import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Bookings from './vendordashboard/Bookings';
import Profile from './vendordashboard/Profile';
import Settings from './vendordashboard/Settings';
import Logout from './vendordashboard/Logout';
import './VendorDashboard.css';

function VendorDashboard() {
  const location = useLocation();

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo"><b>UrbanConnect</b></h2>
        <nav>
          <ul>
            <li>
              <Link
                to="/vendor/dashboard"
                className={location.pathname === '/vendor/dashboard' ? 'active' : ''}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/vendor/bookings"
                className={location.pathname === '/vendor/bookings' ? 'active' : ''}
              >
                Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/vendor/profile"
                className={location.pathname === '/vendor/profile' ? 'active' : ''}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/vendor/settings"
                className={location.pathname === '/vendor/settings' ? 'active' : ''}
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                to="/vendor/logout"
                className={location.pathname === '/vendor/logout' ? 'active' : ''}
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-content">
        {/* Conditionally render the welcome message only on the dashboard page */}
        {location.pathname === '/vendor/dashboard' && (
          <header className="dashboard-header">
            <h1>Welcome to Your Dashboard</h1>
            <p>Manage your services, view bookings, and update your profile here.</p>
          </header>
        )}

        <Routes>
          <Route path="dashboard" element={<DashboardCards />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logout" element={<Logout />} />
        </Routes>
      </main>
    </div>
  );
}

export default VendorDashboard;

function DashboardCards() {
  return (
    <section className="dashboard-cards">
      <div className="card">
        <h3>View Bookings</h3>
        <p>Check your current and upcoming bookings.</p>
        <Link to="/vendor/bookings" className="card-button">Go to Bookings</Link>
      </div>

      <div className="card">
        <h3>Profile Settings</h3>
        <p>Update your profile information and contact details.</p>
        <Link to="/vendor/profile" className="card-button">Update Profile</Link>
      </div>
      <div className="card">
        <h3>Logout</h3>
        <p>Logout from your account securely.</p>
        <Link to="/vendor/logout" className="card-button">Logout</Link>
      </div>
    </section>
  );
}
