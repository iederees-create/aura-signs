import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuote } from '../context/QuoteContext';
import '../pages/landing-page.css';

export default function Navbar() {
  const { basket, openDrawer } = useQuote();
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
          <li className="flex items-center">
            <button 
              onClick={openDrawer} 
              className="relative p-2 text-[#E8DFD0]/80 hover:text-[#E8DFD0] transition-colors focus:outline-none mr-2 flex items-center"
              aria-label="Open Quote Basket"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              {basket.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C9A96E] text-[#080806] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-[#080806]">
                  {basket.length}
                </span>
              )}
            </button>
          </li>
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
        <button 
          onClick={() => { setIsMobileMenuOpen(false); openDrawer(); }}
          className="flex items-center justify-center gap-2 py-3.5 border border-[#E8DFD0]/10 text-[#E8DFD0] tracking-widest uppercase text-[11px] bg-[#E8DFD0]/5 rounded-none font-medium mt-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          Quote Basket ({basket.length})
        </button>
        <Link to="/auth?signup=true" onClick={() => setIsMobileMenuOpen(false)}>Get a quote</Link>
      </div>
    </>
  );
}
