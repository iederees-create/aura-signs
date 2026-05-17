import React, { useState, useEffect } from 'react';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';

export default function Services() {
  const [activeTab, setActiveTab] = useState('events');

  useEffect(() => {
    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeTab]);

  return (
    <div className="landing-page-wrapper" style={{ paddingTop: '72px' }}>
      <section id="services" className="services landing-section reveal">
        <div className="services-header">
          <div>
            <p className="section-label">What we offer</p>
            <h2 className="section-headline" style={{ marginBottom: 0 }}>Our services</h2>
          </div>
          <div className="services-tabs">
            <button 
              className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`} 
              onClick={() => setActiveTab('events')}
            >
              Weddings & Events
            </button>
            <button 
              className={`tab-btn ${activeTab === 'business' ? 'active' : ''}`} 
              onClick={() => setActiveTab('business')}
            >
              Business Branding
            </button>
          </div>
        </div>

        {activeTab === 'events' ? (
          <div className="services-grid" id="services-events">
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
              <h3>Wedding Signage</h3>
              <p>Welcome boards, seating charts, table numbers, ceremony signs, and personalised acrylic displays — all designed to match your theme.</p>
              <a href="#contact" className="service-card-link">Get a quote →</a>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01"/></svg>
              <h3>Seating Charts</h3>
              <p>Elegant acrylic, mirror, vinyl, and printed seating charts for weddings, corporate events, birthdays, and private functions.</p>
              <a href="#contact" className="service-card-link">Get a quote →</a>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 8v4l3 3"/></svg>
              <h3>Mirror & Vinyl Signage</h3>
              <p>Luxury mirror welcome signs, custom vinyl lettering, window decals, and wall graphics for a dramatic, high-end effect.</p>
              <a href="#contact" className="service-card-link">Get a quote →</a>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <h3>Wedding Stationery</h3>
              <p>Invitations, menus, thank you cards, name cards, programs, and envelope printing — beautifully designed for your day.</p>
              <a href="#contact" className="service-card-link">Get a quote →</a>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
              <h3>Event Backdrops & Hire</h3>
              <p>Backdrop board hire, aisle hire, vinyl personalisation, and complete styling setups for weddings, birthdays, and activations.</p>
              <a href="#contact" className="service-card-link">Get a quote →</a>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="2"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4m-3.5-7.5l-2.83 2.83M8.33 15.67l-2.83 2.83m0-14.14l2.83 2.83M15.67 15.67l2.83 2.83"/></svg>
              <h3>Balloon Garlands</h3>
              <p>Custom balloon installations for weddings, birthdays, corporate launches, baby showers, and brand activations.</p>
              <a href="#contact" className="service-card-link">Get a quote →</a>
            </div>
          </div>
        ) : (
          <div className="services-grid" id="services-business">
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              <h3>Acrylic Displays & Signage</h3>
              <p>Reception signs, logo displays, menu boards, counter displays, and promotional signage for retail, salons, cafés, and offices.</p>
              <a href="#contact" className="service-card-link">Get a quote →</a>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M12 12h4m-4 4h4M8 12h.01M8 16h.01"/></svg>
              <h3>Business Cards</h3>
              <p>Professionally designed and printed cards in matte, gloss, rounded corners, and luxury finishes that make an impression.</p>
              <a href="#contact" className="service-card-link">Get a quote →</a>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M7 7h10v10H7zM7 7L5 5M17 7l2-2M7 17l-2 2M17 17l2 2"/></svg>
              <h3>Stickers & Packaging</h3>
              <p>Product labels, packaging stickers, thank you stickers, branded packaging, and custom vinyl labels to elevate your brand.</p>
              <a href="#contact" className="service-card-link">Get a quote →</a>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197"/></svg>
              <h3>QR Code Signs</h3>
              <p>Acrylic QR signs for reviews, social media, and payments. Perfect for cafés, salons, retail, and any customer-facing business.</p>
              <a href="#contact" className="service-card-link">Get a quote →</a>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>
              <h3>Window & Vinyl Decals</h3>
              <p>Custom window graphics, wall vinyl, and branded decals for shopfronts, offices, studios, and any business space.</p>
              <a href="#contact" className="service-card-link">Get a quote →</a>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              <h3>Design & Production</h3>
              <p>End-to-end service: concept design, production, delivery, and professional installation with attention to every detail.</p>
              <a href="#contact" className="service-card-link">Get a quote →</a>
            </div>
          </div>
        )}
      </section>

      <CtaBanner />
      <Footer />
    </div>
  );
}
