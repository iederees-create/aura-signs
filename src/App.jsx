import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Vault from "./pages/Vault";
import Admin from "./pages/Admin";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/vault" element={<Vault />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <FloatingWhatsApp />
    </Router>
  );
}
