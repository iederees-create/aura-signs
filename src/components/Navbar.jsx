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

  const handleNavClick = (id) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav id="main-nav" className={`landing-nav ${isScrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Bespo<span>k</span>e</Link>
        <ul className="nav-links">
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link></li>
          <li><button onClick={() => handleNavClick('services')} className="nav-link-btn">Services</button></li>
          <li><button onClick={() => handleNavClick('gallery')} className="nav-link-btn">Gallery</button></li>
          <li><button onClick={() => handleNavClick('about')} className="nav-link-btn">About</button></li>
          <li><Link to="/vault">My Projects</Link></li>
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
        <button onClick={() => handleNavClick('services')}>Services</button>
        <button onClick={() => handleNavClick('gallery')}>Gallery</button>
        <button onClick={() => handleNavClick('about')}>About</button>
        <Link to="/vault" onClick={() => setIsMobileMenuOpen(false)}>My Projects</Link>
        <Link to="/auth?signup=true" onClick={() => setIsMobileMenuOpen(false)}>Get a quote</Link>
      </div>
    </>
  );
}
