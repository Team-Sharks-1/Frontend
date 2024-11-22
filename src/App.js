import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./MainPage";
import ServiceDetailsPage from "./components/ServiceDetailsPage";
import LoginOptions from "./components/ui/LoginOptions";
import RegisterOptions from "./components/ui/RegisterOptions";
import UserLogin from "./components/ui/UserLogin"; // Import UserLogin
import ProfessionalLogin from "./components/ui/ProfessionalLogin"; // Import ProfessionalLogin
import UserRegister from "./components/ui/UserRegister"; // Import UserRegister
import ProfessionalRegister from "./components/ui/ProfessionalRegister"; // Import ProfessionalRegister
import VendorDashboard from "./components/ui/VendorDashboard"; // Updated import path for VendorDashboard
import AdminDashboard from "./components/ui/AdminDashboard"; // Import AdminDashboard
import ProtectedRoute from "./components/ui/ProtectedRoute"; // Import ProtectedRoute

// Import the user dashboard components
import Profile from "./components/ui/userdashboard/ProfilePage"; // Updated path for Profile
import Bookings from "./components/ui/userdashboard/BookingsPage"; // Updated path for Bookings
import Subscription from "./components/ui/userdashboard/SubscriptionPage"; // Updated path for Subscription
import Settings from "./components/ui/userdashboard/SettingsPage"; // Updated path for Settings

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<MainPage />} />
        <Route path="/service-details" element={<ServiceDetailsPage />} />
        <Route path="/login-options" element={<LoginOptions />} />
        <Route path="/register-options" element={<RegisterOptions />} />

        {/* User Login and Registration */}
        <Route path="/login/user" element={<UserLogin />} /> {/* User login route */}
        <Route path="/login/professional" element={<ProfessionalLogin />} /> {/* Professional login route */}
        <Route path="/register/user" element={<UserRegister />} /> {/* User register route */}
        <Route path="/register/professional" element={<ProfessionalRegister />} /> {/* Professional register route */}

        {/* Nested routes under VendorDashboard */}
        <Route path="/vendor/*" element={<VendorDashboard />} /> {/* Vendor dashboard route */}

        {/* User Dashboard Routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/settings" element={<Settings />} />

        {/* Protect Admin Dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
