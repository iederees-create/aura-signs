import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';
import './landing-page.css';

export default function LandingPage() {
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

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="landing-page-wrapper">

      {/* HERO */}
      <section className="hero" style={{ padding: 0 }}>
        <div className="hero-left">
          <p className="hero-eyebrow">Cape Town · Signage & Event Styling</p>
          <h1 className="hero-headline">
            Every occasion,<br /><em>beautifully</em><br />signed.
          </h1>
          <p className="hero-sub">
            Custom signage, event styling, and business branding — designed and produced to leave a lasting impression.
          </p>
          <div className="hero-actions">
            <a href="https://wa.me/27662720491?text=Hi%2C%20I%20found%20you%20on%20your%20website%20and%20I%27d%20like%20a%20quote" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.126 1.526 5.864L.053 23.27a.75.75 0 00.917.928l5.521-1.448A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.712 9.712 0 01-4.944-1.352l-.354-.211-3.674.964.979-3.567-.231-.368A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
              WhatsApp us
            </a>
            <a href="#gallery" className="btn-ghost">
              View our work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image-grid">
            <div className="hero-img-cell">
              <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80" alt="Acrylic wedding welcome sign" />
              <span className="hero-label">Wedding signage</span>
            </div>
            <div className="hero-img-cell">
              <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80" alt="Elegant table settings" />
              <span className="hero-label">Event styling</span>
            </div>
            <div className="hero-img-cell">
              <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80" alt="Business acrylic signage" />
              <span className="hero-label">Business branding</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="trust-strip">
        <div className="trust-item">
          <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <div className="trust-text">
            <p>Custom Design</p>
            <span>Tailored to your vision</span>
          </div>
        </div>
        <div className="trust-item">
          <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
          <div className="trust-text">
            <p>Premium Finishes</p>
            <span>Acrylic, mirror, vinyl & more</span>
          </div>
        </div>
        <div className="trust-item">
          <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M8 17l4 4 4-4m-4-5v9M3 8l9-5 9 5M3 8v8l9 5 9-5V8"/></svg>
          <div className="trust-text">
            <p>Delivery & Install</p>
            <span>Cape Town & surrounds</span>
          </div>
        </div>
        <div className="trust-item">
          <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          <div className="trust-text">
            <p>All Occasions</p>
            <span>Weddings, events & business</span>
          </div>
        </div>
      </div>



      <CtaBanner />
      <Footer />

      {/* FLOATING WHATSAPP BUTTON (Removing from here to move to a global component) */}
    </div>
  );
}
