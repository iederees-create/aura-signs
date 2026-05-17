import React, { useState, useEffect } from 'react';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';
import { useQuote } from '../context/QuoteContext';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const [activeTab, setActiveTab] = useState('events');
  const { openConfigModal } = useQuote();
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
    return () => observer.disconnect();
  }, [activeTab]);

  const handleConfigure = (name, type) => {
    openConfigModal({ name, type });
  };

  return (
    <div className="landing-page-wrapper" style={{ paddingTop: '72px' }}>
      <section id="services" className="services landing-section reveal">
        <div className="services-header">
          <div>
            <p className="section-label">{t('services.label')}</p>
            <h2 className="section-headline" style={{ marginBottom: 0 }}>{t('services.headline')}</h2>
          </div>
          <div className="services-tabs">
            <button 
              className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`} 
              onClick={() => setActiveTab('events')}
            >
              {t('services.tabEvents')}
            </button>
            <button 
              className={`tab-btn ${activeTab === 'business' ? 'active' : ''}`} 
              onClick={() => setActiveTab('business')}
            >
              {t('services.tabBusiness')}
            </button>
          </div>
        </div>

        {activeTab === 'events' ? (
          <div className="services-grid" id="services-events">
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
              <h3>{t('services.weddingSignage')}</h3>
              <p>{t('services.weddingSignageDesc')}</p>
              <button onClick={() => handleConfigure(t('services.weddingSignage'), 'Events')} className="service-card-link text-left">{t('services.configureLink')}</button>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01"/></svg>
              <h3>{t('services.seatingCharts')}</h3>
              <p>{t('services.seatingChartsDesc')}</p>
              <button onClick={() => handleConfigure(t('services.seatingCharts'), 'Events')} className="service-card-link text-left">{t('services.configureLink')}</button>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 8v4l3 3"/></svg>
              <h3>{t('services.vintageMirrors')}</h3>
              <p>{t('services.vintageMirrorsDesc')}</p>
              <button onClick={() => handleConfigure(t('services.vintageMirrors'), 'Events')} className="service-card-link text-left">{t('services.configureLink')}</button>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <h3>{t('services.weddingStationery')}</h3>
              <p>{t('services.weddingStationeryDesc')}</p>
              <button onClick={() => handleConfigure(t('services.weddingStationery'), 'Events')} className="service-card-link text-left">{t('services.configureLink')}</button>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
              <h3>{t('services.backdropsHire')}</h3>
              <p>{t('services.backdropsHireDesc')}</p>
              <button onClick={() => handleConfigure(t('services.backdropsHire'), 'Events')} className="service-card-link text-left">{t('services.configureLink')}</button>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="2"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4m-3.5-7.5l-2.83 2.83M8.33 15.67l-2.83 2.83m0-14.14l2.83 2.83M15.67 15.67l2.83 2.83"/></svg>
              <h3>{t('services.balloonGarlands')}</h3>
              <p>{t('services.balloonGarlandsDesc')}</p>
              <button onClick={() => handleConfigure(t('services.balloonGarlands'), 'Events')} className="service-card-link text-left">{t('services.configureLink')}</button>
            </div>
          </div>
        ) : (
          <div className="services-grid" id="services-business">
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              <h3>Acrylic Displays & Signage</h3>
              <p>Reception signs, logo displays, menu boards, counter displays, and promotional signage for retail, salons, cafés, and offices.</p>
              <button onClick={() => handleConfigure('Acrylic Displays & Signage', 'Business')} className="service-card-link text-left">{t('services.configureLink')}</button>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M12 12h4m-4 4h4M8 12h.01M8 16h.01"/></svg>
              <h3>{t('services.businessCards')}</h3>
              <p>{t('services.businessCardsDesc')}</p>
              <button onClick={() => handleConfigure(t('services.businessCards'), 'Business')} className="service-card-link text-left">{t('services.configureLink')}</button>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M7 7h10v10H7zM7 7L5 5M17 7l2-2M7 17l-2 2M17 17l2 2"/></svg>
              <h3>{t('services.stickersLabels')}</h3>
              <p>{t('services.stickersLabelsDesc')}</p>
              <button onClick={() => handleConfigure(t('services.stickersLabels'), 'Business')} className="service-card-link text-left">{t('services.configureLink')}</button>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197"/></svg>
              <h3>QR Code Signs</h3>
              <p>Acrylic QR signs for reviews, social media, and payments. Perfect for cafés, salons, retail, and any customer-facing business.</p>
              <button onClick={() => handleConfigure('QR Code Signs', 'Business')} className="service-card-link text-left">{t('services.configureLink')}</button>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>
              <h3>{t('services.windowDecals')}</h3>
              <p>{t('services.windowDecalsDesc')}</p>
              <button onClick={() => handleConfigure(t('services.windowDecals'), 'Business')} className="service-card-link text-left">{t('services.configureLink')}</button>
            </div>
            <div className="service-card">
              <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              <h3>Design & Production</h3>
              <p>End-to-end service: concept design, production, delivery, and professional installation with attention to every detail.</p>
              <button onClick={() => handleConfigure('Design & Production', 'Business')} className="service-card-link text-left">{t('services.configureLink')}</button>
            </div>
          </div>
        )}
      </section>

      <CtaBanner />
      <Footer />
    </div>
  );
}
