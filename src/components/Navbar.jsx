import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuote } from '../context/QuoteContext';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../lib/supabase';
import { Brain } from 'lucide-react';
import '../pages/landing-page.css';

const popularLanguages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'xh', label: 'isiXhosa', flag: '🇿🇦' },
  { code: 'zu', label: 'isiZulu', flag: '🇿🇦' },
  { code: 'af', label: 'Afrikaans', flag: '🇿🇦' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'el', label: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'da', label: 'Dansk', flag: '🇩🇰' },
  { code: 'no', label: 'Norsk', flag: '🇳🇴' },
  { code: 'sv', label: 'Svenska', flag: '🇸🇪' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'cs', label: 'Čeština', flag: '🇨🇿' },
  { code: 'th', label: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'he', label: 'עברית', flag: '🇮🇱' },
  { code: 'fa', label: 'فارسی', flag: '🇮🇷' }
];

export default function Navbar() {
  const { basket, openDrawer } = useQuote();
  const { language, changeLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Custom language modal triggers
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Auth state listener
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function loadUserProfile(sessionUser) {
      if (!sessionUser) {
        setUser(null);
        setIsAdmin(false);
        return;
      }
      setUser(sessionUser);
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', sessionUser.id)
          .single();
        
        if (data?.is_admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        setIsAdmin(false);
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      loadUserProfile(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      loadUserProfile(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const getActiveFlag = () => {
    const found = popularLanguages.find(l => l.code === language);
    return found ? found.flag : '🌐';
  };

  const filteredLanguages = popularLanguages.filter(lang => 
    lang.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <nav id="main-nav" className={`landing-nav ${isScrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Bold & Bespo<span>k</span>e</Link>
        <ul className="nav-links">
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('nav.home')}</Link></li>
          <li><Link to="/services" className={location.pathname === '/services' ? 'active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('nav.services')}</Link></li>
          <li><Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('nav.gallery')}</Link></li>
          <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('nav.about')}</Link></li>
          <li><Link to="/vault" className={location.pathname === '/vault' ? 'active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('nav.myProjects')}</Link></li>
          
          {isAdmin && (
            <li>
              <Link 
                to="/admin" 
                className={`flex items-center gap-1.5 px-3 py-1.5 border border-[#C9A96E]/20 text-[10px] text-[#C9A96E] hover:border-[#C9A96E]/50 hover:text-white transition-all rounded-lg tracking-widest font-semibold uppercase ${location.pathname === '/admin' ? 'bg-[#C9A96E]/10 border-[#C9A96E]' : ''}`}
              >
                <Brain size={12} className="animate-pulse shrink-0" />
                Admin
              </Link>
            </li>
          )}
          
          {/* Language Switcher Dropdown */}
          <li className="relative group flex items-center mr-2 text-[#E8DFD0]">
            <button className="flex items-center gap-1.5 bg-[#E8DFD0]/5 border border-[#E8DFD0]/10 hover:border-[#C9A96E]/50 px-3 py-1.5 text-xs text-[#E8DFD0]/90 hover:text-[#E8DFD0] transition-colors rounded-lg font-medium">
              <span>{getActiveFlag()}</span>
              <span className="uppercase tracking-wider">{language.split('-')[0]}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div className="absolute right-0 top-full mt-2 w-44 bg-[#080806] border border-[#E8DFD0]/10 rounded-xl p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl flex flex-col z-50">
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
              <div className="h-[1px] bg-[#E8DFD0]/10 my-1" />
              <button
                onClick={() => setIsLangModalOpen(true)}
                className="w-full px-3 py-2 text-left text-xs rounded-lg transition-colors flex items-center gap-2 text-[#C9A96E] hover:bg-[#C9A96E]/10"
              >
                🌐 More Languages...
              </button>
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
        
        {isAdmin && (
          <Link 
            to="/admin" 
            onClick={handleNavClick}
            className="flex items-center justify-center gap-2 py-3 border border-[#C9A96E]/15 text-[#C9A96E] hover:border-[#C9A96E] transition-all tracking-widest uppercase text-[11px] rounded-lg mt-2 font-semibold"
          >
            <Brain size={14} className="animate-pulse shrink-0" />
            Admin Panel
          </Link>
        )}
        
        <button 
          onClick={() => { setIsMobileMenuOpen(false); openDrawer(); }}
          className="flex items-center justify-center gap-2 py-3.5 border border-[#E8DFD0]/10 text-[#E8DFD0] tracking-widest uppercase text-[11px] bg-[#E8DFD0]/5 rounded-none font-medium mt-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          {t('nav.basket')} ({basket.length})
        </button>
        <Link to="/auth?signup=true" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.getQuote')}</Link>
        
        {/* Mobile Language Switcher */}
        <div className="flex flex-wrap gap-2 justify-center items-center py-4 border-t border-[#E8DFD0]/10 mt-4 px-4">
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
          <button
            onClick={() => { setIsMobileMenuOpen(false); setIsLangModalOpen(true); }}
            className="px-3 py-1.5 text-xs rounded-lg border border-[#C9A96E]/30 text-[#C9A96E] uppercase tracking-wider font-semibold hover:bg-[#C9A96E]/10 transition-all flex items-center gap-1"
          >
            🌐 More...
          </button>
        </div>
      </div>

      {/* Universal Language Selector Modal */}
      {isLangModalOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsLangModalOpen(false)}
          />

          {/* Modal Box */}
          <div className="relative w-full max-w-2xl bg-[#080806] border border-[#E8DFD0]/10 rounded-2xl text-[#E8DFD0] shadow-2xl flex flex-col max-h-[82vh] overflow-hidden z-10 animate-scale-up">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-[#E8DFD0]/10">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[#C9A96E] text-xs font-medium uppercase tracking-widest">Universal Translator</span>
                  <h3 className="font-serif text-2xl tracking-wide mt-1">Select Language</h3>
                </div>
                <button 
                  onClick={() => setIsLangModalOpen(false)}
                  className="p-2 hover:bg-[#E8DFD0]/5 rounded-full transition-colors text-[#E8DFD0]/60 hover:text-[#E8DFD0]"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>

              {/* Search Box */}
              <div className="mt-4 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E8DFD0]/30">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                </span>
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 100+ languages..."
                  className="w-full bg-[#E8DFD0]/5 border border-[#E8DFD0]/10 rounded-xl pl-12 pr-4 py-3 text-sm text-[#E8DFD0] placeholder-[#E8DFD0]/30 focus:border-[#C9A96E]/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {filteredLanguages.length === 0 ? (
                <div className="text-center py-12 text-[#E8DFD0]/40 text-sm">
                  No languages found matching "{searchQuery}"
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {filteredLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setIsLangModalOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3.5 text-sm text-left border rounded-xl transition-all ${language === lang.code ? 'bg-[#C9A96E]/10 border-[#C9A96E] text-[#C9A96E]' : 'bg-[#E8DFD0]/5 border-[#E8DFD0]/10 text-[#E8DFD0]/70 hover:border-[#E8DFD0]/20 hover:bg-[#E8DFD0]/10'}`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium tracking-wide">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#E8DFD0]/10 bg-black/20 text-center text-xs text-[#E8DFD0]/40 flex justify-center items-center gap-2">
              <span>⚡ Supports all international languages seamlessly via hybrid translation</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
