import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';
import './landing-page.css';

export default function LandingPage() {
  const { t } = useLanguage();

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
          <p className="hero-eyebrow">Cape Town · {t('hero.label')}</p>
          <h1 className="hero-headline">
            {t('hero.title').split(' & ')[0]}<br />
            <em>{t('hero.title').split(' & ')[1]}</em>
          </h1>
          <p className="hero-sub">
            {t('hero.subtitle')}
          </p>
          <div className="hero-actions">
            <Link to="/services" className="btn-primary">
              {t('hero.ctaServices')}
            </Link>
            <Link to="/auth?signup=true" className="btn-ghost">
              {t('hero.ctaQuote')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image-grid">
            <div className="hero-img-cell">
              <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80" alt="Acrylic wedding welcome sign" />
              <span className="hero-label">{t('services.weddingSignage')}</span>
            </div>
            <div className="hero-img-cell">
              <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80" alt="Elegant table settings" />
              <span className="hero-label">{t('nav.services')}</span>
            </div>
            <div className="hero-img-cell">
              <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80" alt="Business acrylic signage" />
              <span className="hero-label">{t('services.tabBusiness')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="trust-strip">
        <div className="trust-item">
          <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <div className="trust-text">
            <p>Custom Design</p>
            <span>Tailored to your vision</span>
          </div>
        </div>
        <div className="trust-item">
          <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
          <div className="trust-text">
            <p>Premium Finishes</p>
            <span>Acrylic, mirror, vinyl & more</span>
          </div>
        </div>
        <div className="trust-item">
          <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M8 17l4 4 4-4m-4-5v9M3 8l9-5 9 5M3 8v8l9 5 9-5V8"/></svg>
          <div className="trust-text">
            <p>Delivery & Install</p>
            <span>Cape Town & surrounds</span>
          </div>
        </div>
        <div className="trust-item">
          <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          <div className="trust-text">
            <p>All Occasions</p>
            <span>Weddings, events & business</span>
          </div>
        </div>
      </div>

      <CtaBanner />
      <Footer />
    </div>
  );
}
