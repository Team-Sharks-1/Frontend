import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./MainPage";
import ServiceDetailsPage from "./components/ServiceDetailsPage";
import LoginOptions from "./components/ui/LoginOptions";
import RegisterOptions from "./components/ui/RegisterOptions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/service-details" element={<ServiceDetailsPage />} />
        <Route path="/login-options" element={<LoginOptions />} />
        <Route path="/register-options" element={<RegisterOptions />} />
      </Routes>
    </Router>
  );
}

export default App;
