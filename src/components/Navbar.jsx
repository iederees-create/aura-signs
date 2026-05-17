import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../pages/landing-page.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav id="main-nav" className={`landing-nav ${isScrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Bespo<span>k</span>e</Link>
        <ul className="nav-links">
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link></li>
          <li><Link to="/services" className={location.pathname === '/services' ? 'active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Services</Link></li>
          <li><Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Gallery</Link></li>
          <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>About</Link></li>
          <li><Link to="/vault" className={location.pathname === '/vault' ? 'active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>My Projects</Link></li>
          <li><Link to="/auth?signup=true" className="nav-cta">Get a quote</Link></li>
        </ul>
        <button 
          className="nav-hamburger" 
          aria-label="Open menu" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`} id="mobile-nav">
        <Link to="/" onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</Link>
        <Link to="/services" onClick={handleNavClick}>Services</Link>
        <Link to="/gallery" onClick={handleNavClick}>Gallery</Link>
        <Link to="/about" onClick={handleNavClick}>About</Link>
        <Link to="/vault" onClick={handleNavClick}>My Projects</Link>
        <Link to="/auth?signup=true" onClick={() => setIsMobileMenuOpen(false)}>Get a quote</Link>
      </div>
    </>
  );
}
