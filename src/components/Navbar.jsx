import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuote } from '../context/QuoteContext';
import { useLanguage } from '../context/LanguageContext';
import '../pages/landing-page.css';

export default function Navbar() {
  const { basket, openDrawer } = useQuote();
  const { language, changeLanguage, t } = useLanguage();
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
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('nav.home')}</Link></li>
          <li><Link to="/services" className={location.pathname === '/services' ? 'active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('nav.services')}</Link></li>
          <li><Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('nav.gallery')}</Link></li>
          <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('nav.about')}</Link></li>
          <li><Link to="/vault" className={location.pathname === '/vault' ? 'active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('nav.myProjects')}</Link></li>
          
          {/* Language Switcher Dropdown */}
          <li className="relative group flex items-center mr-2">
            <button className="flex items-center gap-1 bg-[#E8DFD0]/5 border border-[#E8DFD0]/10 hover:border-[#C9A96E]/50 px-2.5 py-1.5 text-xs text-[#E8DFD0]/90 hover:text-[#E8DFD0] transition-colors rounded-lg font-medium">
              <span className="uppercase">{language}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div className="absolute right-0 top-full mt-2 w-32 bg-[#080806] border border-[#E8DFD0]/10 rounded-xl p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl flex flex-col z-50">
              {[
                { code: 'en', label: '🇬🇧 English' },
                { code: 'fr', label: '🇫🇷 Français' },
                { code: 'de', label: '🇩🇪 Deutsch' },
                { code: 'es', label: '🇪🇸 Español' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full px-3 py-2 text-left text-xs rounded-lg transition-colors flex items-center gap-2 ${language === lang.code ? 'bg-[#E8DFD0]/10 text-[#C9A96E]' : 'hover:bg-[#E8DFD0]/5 text-[#E8DFD0]/70'}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </li>

          {/* Quote Basket Button */}
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
          
          <li><Link to="/auth?signup=true" className="nav-cta">{t('nav.getQuote')}</Link></li>
        </ul>
        <button 
          className="nav-hamburger" 
          aria-label="Open menu" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`} id="mobile-nav">
        <Link to="/" onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t('nav.home')}</Link>
        <Link to="/services" onClick={handleNavClick}>{t('nav.services')}</Link>
        <Link to="/gallery" onClick={handleNavClick}>{t('nav.gallery')}</Link>
        <Link to="/about" onClick={handleNavClick}>{t('nav.about')}</Link>
        <Link to="/vault" onClick={handleNavClick}>{t('nav.myProjects')}</Link>
        
        <button 
          onClick={() => { setIsMobileMenuOpen(false); openDrawer(); }}
          className="flex items-center justify-center gap-2 py-3.5 border border-[#E8DFD0]/10 text-[#E8DFD0] tracking-widest uppercase text-[11px] bg-[#E8DFD0]/5 rounded-none font-medium mt-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          {t('nav.basket')} ({basket.length})
        </button>
        <Link to="/auth?signup=true" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.getQuote')}</Link>
        
        {/* Mobile Language Switcher */}
        <div className="flex gap-2 justify-center items-center py-4 border-t border-[#E8DFD0]/10 mt-4">
          {[
            { code: 'en', flag: '🇬🇧' },
            { code: 'fr', flag: '🇫🇷' },
            { code: 'de', flag: '🇩🇪' },
            { code: 'es', flag: '🇪🇸' }
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`px-3 py-1.5 text-xs rounded-lg border uppercase tracking-wider font-semibold transition-all ${language === lang.code ? 'bg-[#C9A96E] text-[#080806] border-[#C9A96E]' : 'border-[#E8DFD0]/10 text-[#E8DFD0]/70'}`}
            >
              {lang.flag} {lang.code}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
