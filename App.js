import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./MainPage";
import ServiceDetailsPage from "./components/ServiceDetailsPage";
import LoginOptions from "./components/ui/LoginOptions";
import RegisterOptions from "./components/ui/RegisterOptions";
import UserLogin from "./components/ui/UserLogin";
import ProfessionalLogin from "./components/ui/ProfessionalLogin";
import UserRegister from "./components/ui/UserRegister";
import ProfessionalRegister from "./components/ui/ProfessionalRegister";
import VendorDashboard from "./components/ui/VendorDashboard";
import AdminDashboard from "./components/ui/AdminDashboard"; // Import AdminDashboard
import ProtectedRoute from "./components/ui/ProtectedRoute"; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/service-details" element={<ServiceDetailsPage />} />
        <Route path="/login-options" element={<LoginOptions />} />
        <Route path="/register-options" element={<RegisterOptions />} />
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/login/professional" element={<ProfessionalLogin />} />
        <Route path="/register/user" element={<UserRegister />} />
        <Route path="/register/professional" element={<ProfessionalRegister />} />
        <Route path="/vendor/*" element={<VendorDashboard />} />
        
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
