import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ManageUsers from './ManageUsers';
import ManageBookings from './ManageBookings';
import ManageProfessionals from './ManageProfessionals';
import Logout from './vendordashboard/Logout';
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
                to="/dashboard/manage-users"
                className={location.pathname === '/dashboard/manage-users' ? 'active' : ''}
              >
                Manage Users
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/manage-bookings"
                className={location.pathname === '/dashboard/manage-bookings' ? 'active' : ''}
              >
                Manage Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/manage-professionals"
                className={location.pathname === '/dashboard/manage-professionals' ? 'active' : ''}
              >
                Manage Professionals
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
        {location.pathname === '/dashboard' && (
          <header className="dashboard-header">
            <h1>Welcome, Admin</h1>
            <p>Oversee the platform, manage users, bookings, and professionals here.</p>
          </header>
        )}
        <Routes>
          <Route path="/" element={<DashboardCards />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
          <Route path="manage-professionals" element={<ManageProfessionals />} />
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
        <Link to="/dashboard/manage-users" className="card-button">Manage Users</Link>
      </div>
      <div className="card">
        <h3>Manage Bookings</h3>
        <p>Oversee all bookings, cancellations, and disputes.</p>
        <Link to="/dashboard/manage-bookings" className="card-button">Manage Bookings</Link>
      </div>
      <div className="card">
        <h3>Manage Professionals</h3>
        <p>Add, edit, or remove professionals offered on the platform.</p>
        <Link to="/dashboard/manage-professionals" className="card-button">Manage Professionals</Link>
      </div>
      </section>
  );
}
