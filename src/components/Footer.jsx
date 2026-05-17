import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="landing-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="nav-logo" style={{ fontSize: '24px' }}>Bespo<span>k</span>e</Link>
          <p>Custom signage, event styling, and business branding. Designed and produced in Cape Town, South Africa.</p>
          <p style={{ marginTop: '1rem', fontSize: '12px', color: 'rgba(201,169,110,0.6)' }}>Secure payments via Yoco — coming soon</p>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><Link to="/services">Wedding Signage</Link></li>
            <li><Link to="/services">Seating Charts</Link></li>
            <li><Link to="/services">Event Backdrops</Link></li>
            <li><Link to="/services">Balloon Garlands</Link></li>
            <li><Link to="/services">Acrylic Displays</Link></li>
            <li><Link to="/services">Stickers & Packaging</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Navigate</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/vault">My Projects</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="https://wa.me/27662720491" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li><a href="mailto:hello@bespoke.co.za">hello@bespoke.co.za</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><Link to="/about">Cape Town, South Africa</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Bespoke. All rights reserved. Cape Town, South Africa.</p>
        <div className="footer-social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://wa.me/27662720491" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
