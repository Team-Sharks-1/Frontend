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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/service-details" element={<ServiceDetailsPage />} />
        <Route path="/login-options" element={<LoginOptions />} />
        <Route path="/register-options" element={<RegisterOptions />} />
        <Route path="/login/user" element={<UserLogin />} /> {/* User login route */}
        <Route path="/login/professional" element={<ProfessionalLogin />} /> {/* Professional login route */}
        <Route path="/register/user" element={<UserRegister />} /> {/* User register route */}
        <Route path="/register/professional" element={<ProfessionalRegister />} /> {/* Professional register route */}
      </Routes>
    </Router>
  );
}

export default App;
