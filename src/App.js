import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./MainPage";
import ServiceDetailsPage from "./components/ServiceDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/service-details" element={<ServiceDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
