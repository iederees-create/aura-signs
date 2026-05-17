import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './landing-page.css';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('events');

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

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
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="landing-page-wrapper">
      {/* NAV */}
      <nav id="main-nav" className={`landing-nav ${isScrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Bespo<span>k</span>e</Link>
        <ul className="nav-links">
          <li><Link to="/" className="active" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link></li>
          <li><button onClick={() => scrollTo('services')} className="nav-link-btn">Services</button></li>
          <li><button onClick={() => scrollTo('gallery')} className="nav-link-btn">Gallery</button></li>
          <li><button onClick={() => scrollTo('about')} className="nav-link-btn">About</button></li>
          <li><Link to="/auth">My Projects</Link></li>
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
        <button onClick={() => scrollTo('services')}>Services</button>
        <button onClick={() => scrollTo('gallery')}>Gallery</button>
        <button onClick={() => scrollTo('about')}>About</button>
        <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>My Projects</Link>
        <Link to="/auth?signup=true" onClick={() => setIsMobileMenuOpen(false)}>Get a quote</Link>
      </div>

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

      {/* ABOUT */}
      <section id="about" className="about landing-section reveal">
        <div className="about-inner">
          <div className="about-visual">
            <img className="about-visual-img"
                 src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80"
                 alt="Premium acrylic signage detail" />
            <div className="about-accent"></div>
            <div className="about-tag">Est. Cape Town</div>
          </div>
          <div className="about-content">
            <p className="section-label">About Bespoke</p>
            <h2 className="section-headline">Creative signage<br />with a <em>premium</em> touch</h2>
            <p className="section-body">
              We specialise in modern, elegant, and fully customised signage for events and businesses of all sizes. From intimate celebrations to large corporate activations, every piece is designed and produced to reflect your vision — with the quality to match.
            </p>
            <p className="section-body" style={{ marginTop: '1rem' }}>
              We handle everything from concept and design through to production, delivery, and installation — making the process simple and stress-free.
            </p>
            <div className="about-stats">
              <div className="stat-block">
                <p>100+</p>
                <span>Projects completed</span>
              </div>
              <div className="stat-block">
                <p>2</p>
                <span>Service categories</span>
              </div>
              <div className="stat-block">
                <p>1</p>
                <span>City — Cape Town</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
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
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
              <h3>Wedding Signage</h3>
              <p>Welcome boards, seating charts, table numbers, ceremony signs, and personalised acrylic displays — all designed to match your theme.</p>
              <a href="#contact" className="service-card-link">Learn more →</a>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01"/></svg>
              <h3>Seating Charts</h3>
              <p>Elegant acrylic, mirror, vinyl, and printed seating charts for weddings, corporate events, birthdays, and private functions.</p>
              <a href="#contact" className="service-card-link">Learn more →</a>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 8v4l3 3"/></svg>
              <h3>Mirror & Vinyl Signage</h3>
              <p>Luxury mirror welcome signs, custom vinyl lettering, window decals, and wall graphics for a dramatic, high-end effect.</p>
              <a href="#contact" className="service-card-link">Learn more →</a>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <h3>Wedding Stationery</h3>
              <p>Invitations, menus, thank you cards, name cards, programs, and envelope printing — beautifully designed for your day.</p>
              <a href="#contact" className="service-card-link">Learn more →</a>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
              <h3>Event Backdrops & Hire</h3>
              <p>Backdrop board hire, aisle hire, vinyl personalisation, and complete styling setups for weddings, birthdays, and activations.</p>
              <a href="#contact" className="service-card-link">Learn more →</a>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="2"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4m-3.5-7.5l-2.83 2.83M8.33 15.67l-2.83 2.83m0-14.14l2.83 2.83M15.67 15.67l2.83 2.83"/></svg>
              <h3>Balloon Garlands</h3>
              <p>Custom balloon installations for weddings, birthdays, corporate launches, baby showers, and brand activations.</p>
              <a href="#contact" className="service-card-link">Learn more →</a>
            </div>
          </div>
        ) : (
          <div className="services-grid" id="services-business">
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              <h3>Acrylic Displays & Signage</h3>
              <p>Reception signs, logo displays, menu boards, counter displays, and promotional signage for retail, salons, cafés, and offices.</p>
              <a href="#contact" className="service-card-link">Learn more →</a>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M12 12h4m-4 4h4M8 12h.01M8 16h.01"/></svg>
              <h3>Business Cards</h3>
              <p>Professionally designed and printed cards in matte, gloss, rounded corners, and luxury finishes that make an impression.</p>
              <a href="#contact" className="service-card-link">Learn more →</a>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M7 7h10v10H7zM7 7L5 5M17 7l2-2M7 17l-2 2M17 17l2 2"/></svg>
              <h3>Stickers & Packaging</h3>
              <p>Product labels, packaging stickers, thank you stickers, branded packaging, and custom vinyl labels to elevate your brand.</p>
              <a href="#contact" className="service-card-link">Learn more →</a>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197"/></svg>
              <h3>QR Code Signs</h3>
              <p>Acrylic QR signs for reviews, social media, and payments. Perfect for cafés, salons, retail, and any customer-facing business.</p>
              <a href="#contact" className="service-card-link">Learn more →</a>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>
              <h3>Window & Vinyl Decals</h3>
              <p>Custom window graphics, wall vinyl, and branded decals for shopfronts, offices, studios, and any business space.</p>
              <a href="#contact" className="service-card-link">Learn more →</a>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              <h3>Design & Production</h3>
              <p>End-to-end service: concept design, production, delivery, and professional installation with attention to every detail.</p>
              <a href="#contact" className="service-card-link">Learn more →</a>
            </div>
          </div>
        )}
      </section>

      {/* GALLERY */}
      <section id="gallery" className="gallery reveal landing-section">
        <p className="section-label">Our work</p>
        <h2 className="section-headline">Elegant details.<br /><em>Memorable</em> setups.</h2>

        <div className="gallery-masonry">
          <div className="gallery-item">
            <div className="gallery-item-inner" style={{ aspectRatio: '3/4' }}>
              <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&q=75" alt="Acrylic wedding seating chart" />
            </div>
            <div className="gallery-item-caption">Seating chart · Wedding</div>
          </div>
          <div className="gallery-item">
            <div className="gallery-item-inner" style={{ aspectRatio: '4/3' }}>
              <img src="https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=500&q=75" alt="Event backdrop setup" />
            </div>
            <div className="gallery-item-caption">Backdrop · Event styling</div>
          </div>
          <div className="gallery-item">
            <div className="gallery-item-inner" style={{ aspectRatio: '1/1' }}>
              <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&q=75" alt="Business acrylic signage" />
            </div>
            <div className="gallery-item-caption">Acrylic sign · Business</div>
          </div>
          <div className="gallery-item">
            <div className="gallery-item-inner" style={{ aspectRatio: '3/4' }}>
              <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&q=75" alt="Balloon garland installation" />
            </div>
            <div className="gallery-item-caption">Balloon garland · Birthday</div>
          </div>
          <div className="gallery-item">
            <div className="gallery-item-inner" style={{ aspectRatio: '4/3' }}>
              <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&q=75" alt="Wedding table numbers" />
            </div>
            <div className="gallery-item-caption">Table numbers · Wedding</div>
          </div>
          <div className="gallery-item">
            <div className="gallery-item-inner" style={{ aspectRatio: '1/1' }}>
              <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=75" alt="Custom stickers and packaging" />
            </div>
            <div className="gallery-item-caption">Stickers · Packaging</div>
          </div>
        </div>

        <div className="gallery-footer">
          <Link to="/auth" className="btn-outline-ivory">
            View full gallery
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials reveal landing-section">
        <p className="section-label">Client love</p>
        <h2 className="section-headline">What our clients say</h2>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
            </div>
            <p className="testimonial-quote">"Professional, creative, and beautiful quality from start to finish. Our venue looked absolutely incredible."</p>
            <p className="testimonial-author">Aisha M.</p>
            <p className="testimonial-service">Wedding Signage & Seating Chart</p>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
            </div>
            <p className="testimonial-quote">"The acrylic business signs and stickers gave our brand such a premium look. Clients notice immediately."</p>
            <p className="testimonial-author">Lena K.</p>
            <p className="testimonial-service">Acrylic Signage & Product Stickers</p>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
            </div>
            <p className="testimonial-quote">"Quick, professional, and the end result was stunning. The balloon garland and backdrop made our event so special."</p>
            <p className="testimonial-author">Priya D.</p>
            <p className="testimonial-service">Balloon Garland & Event Backdrop</p>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <div id="contact" className="cta-banner reveal landing-section">
        <div>
          <p className="section-label">Ready to start?</p>
          <h2 className="section-headline">Let's bring your<br /><em>vision</em> to life</h2>
          <p className="section-body">Looking for custom signage, event styling, or business branding? Get in touch for a personalised quote.</p>
        </div>
        <div className="cta-actions">
          <a href="https://wa.me/27662720491?text=Hi%2C%20I%20found%20you%20on%20your%20website%20and%20I%27d%20like%20a%20quote" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.126 1.526 5.864L.053 23.27a.75.75 0 00.917.928l5.521-1.448A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.712 9.712 0 01-4.944-1.352l-.354-.211-3.674.964.979-3.567-.231-.368A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
            WhatsApp us
          </a>
          <Link to="/auth?signup=true" className="btn-primary">Request a quote</Link>
        </div>
      </div>

      {/* FOOTER */}
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
              <li><a href="#services">Wedding Signage</a></li>
              <li><a href="#services">Seating Charts</a></li>
              <li><a href="#services">Event Backdrops</a></li>
              <li><a href="#services">Balloon Garlands</a></li>
              <li><a href="#services">Acrylic Displays</a></li>
              <li><a href="#services">Stickers & Packaging</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Navigate</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#about">About</a></li>
              <li><Link to="/auth">My Projects</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="https://wa.me/27662720491" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href="mailto:hello@bespoke.co.za">hello@bespoke.co.za</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="#contact">Cape Town, South Africa</a></li>
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

      {/* FLOATING WHATSAPP BUTTON (Removing from here to move to a global component) */}
    </div>
  );
}
