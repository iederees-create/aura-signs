import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Vault from "./pages/Vault";
import Admin from "./pages/Admin";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Navbar from "./components/Navbar";
import { QuoteProvider, useQuote } from "./context/QuoteContext";
import { LanguageProvider } from "./context/LanguageContext";
import QuoteDrawer from "./components/QuoteDrawer";
import ConfigModal from "./components/ConfigModal";

function AppContent() {
  const { isConfigModalOpen, closeConfigModal, configProduct, addToBasket } = useQuote();

  return (
    <Router>
      <Navbar />
      <QuoteDrawer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/vault" element={<Vault />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <FloatingWhatsApp />

      <ConfigModal 
        isOpen={isConfigModalOpen}
        onClose={closeConfigModal}
        product={configProduct}
        onConfirm={addToBasket}
      />
    </Router>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <QuoteProvider>
        <AppContent />
      </QuoteProvider>
    </LanguageProvider>
  );
}
