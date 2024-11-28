import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ManageUsers from './ManageUsers';
import ManageBookings from './ManageBookings';
import ManageServices from './ManageServices';
import Reports from './Reports';
import Settings from './Settings';
import Logout from './Logout';
import './AdminDashboard.css';
function AdminDashboard() {
  const location = useLocation();
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo"><b>UrbanConnect Admin</b></h2>
        <nav>
          <ul>
            <li>
              <Link
                to="/dashboard"
                className={location.pathname === '/dashboard' ? 'active' : ''}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/manage-users"
                className={location.pathname === '/manage-users' ? 'active' : ''}
              >
                Manage Users
              </Link>
            </li>
            <li>
              <Link
                to="/manage-bookings"
                className={location.pathname === '/manage-bookings' ? 'active' : ''}
              >
                Manage Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/manage-services"
                className={location.pathname === '/manage-services' ? 'active' : ''}
              >
                Manage Services
              </Link>
            </li>
            <li>
              <Link
                to="/reports"
                className={location.pathname === '/reports' ? 'active' : ''}
              >
                Reports
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className={location.pathname === '/settings' ? 'active' : ''}
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                className={location.pathname === '/logout' ? 'active' : ''}
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-content">
        {/* Conditionally render the welcome message only on the dashboard page */}
        {location.pathname === '/dashboard' && (
          <header className="dashboard-header">
            <h1>Welcome, Admin</h1>
            <p>Oversee the platform, manage users, bookings, and generate reports here.</p>
          </header>
        )}
        <Routes>
          <Route path="dashboard" element={<DashboardCards />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
          <Route path="manage-services" element={<ManageServices />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logout" element={<Logout />} />
        </Routes>
      </main>
    </div>
  );
}
export default AdminDashboard;
function DashboardCards() {
  return (
    <section className="dashboard-cards">
      <div className="card">
        <h3>Manage Users</h3>
        <p>View and manage registered customers and providers.</p>
        <Link to="/manage-users" className="card-button">Manage Users</Link>
      </div>
      <div className="card">
        <h3>Manage Bookings</h3>
        <p>Oversee all bookings, cancellations, and disputes.</p>
        <Link to="/manage-bookings" className="card-button">Manage Bookings</Link>
      </div>
      <div className="card">
        <h3>Manage Services</h3>
        <p>Add, edit, or remove services offered on the platform.</p>
        <Link to="/manage-services" className="card-button">Manage Services</Link>
      </div>
      <div className="card">
        <h3>View Reports</h3>
        <p>Analyze platform performance and generate reports.</p>
        <Link to="/reports" className="card-button">View Reports</Link>
      </div>
    </section>
  );
}
