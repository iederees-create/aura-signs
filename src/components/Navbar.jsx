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
  const location = useLocation();
  const navigate = useNavigate();
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
      
      // Failsafe admin override for specified admin emails
      if (
        sessionUser.email === 'iedereesf@gmail.com' || 
        sessionUser.email === 'iedereesfrancis@gmail.com'
      ) {
        setIsAdmin(true);
        return;
      }
      
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
      <nav id="main-nav" className={`landing-nav ${isScrolled ? 'scrolled' : ''}`} style={{ background: 'rgba(253,251,247,0.96)', borderBottom: '1px solid rgba(8,8,6,0.1)' }}>
        <Link to="/" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ color: '#080806' }}>
          Bold & Bespo<span style={{ color: '#C9603A' }}>k</span>e
        </Link>
        <ul className="nav-links">
          <li>
            <Link 
              to="/" 
              className={`text-xs uppercase tracking-widest font-extrabold transition-all px-2 py-1 ${location.pathname === '/' ? 'text-[#C9603A]' : 'text-[#080806] hover:text-[#C9603A]'}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {t('nav.home')}
            </Link>
          </li>
          <li>
            <Link 
              to="/services" 
              className={`text-xs uppercase tracking-widest font-extrabold transition-all px-2 py-1 ${location.pathname === '/services' ? 'text-[#C9603A]' : 'text-[#080806] hover:text-[#C9603A]'}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {t('nav.services')}
            </Link>
          </li>
          <li>
            <Link 
              to="/gallery" 
              className={`text-xs uppercase tracking-widest font-extrabold transition-all px-2 py-1 ${location.pathname === '/gallery' ? 'text-[#C9603A]' : 'text-[#080806] hover:text-[#C9603A]'}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {t('nav.gallery')}
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={`text-xs uppercase tracking-widest font-extrabold transition-all px-2 py-1 ${location.pathname === '/about' ? 'text-[#C9603A]' : 'text-[#080806] hover:text-[#C9603A]'}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {t('nav.about')}
            </Link>
          </li>
          <li>
            <Link 
              to="/vault" 
              className={`text-xs uppercase tracking-widest font-extrabold transition-all px-2 py-1 ${location.pathname === '/vault' ? 'text-[#C9603A]' : 'text-[#080806] hover:text-[#C9603A]'}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {t('nav.myProjects')}
            </Link>
          </li>
          
          {isAdmin && (
            <li>
              <Link 
                to="/admin" 
                className={`flex items-center gap-1.5 px-3 py-1.5 border border-[#080806] text-xs text-[#080806] hover:bg-[#080806] hover:text-white transition-all rounded-none tracking-widest font-extrabold uppercase ${location.pathname === '/admin' ? 'bg-[#080806] text-white' : ''}`}
              >
                <Brain size={12} className="animate-pulse shrink-0" />
                Admin
              </Link>
            </li>
          )}
          
          {/* Language Switcher Dropdown */}
          <li className="relative group flex items-center mr-2 text-[#080806]">
            <button className="flex items-center gap-1.5 bg-[#080806]/5 border border-[#080806]/15 hover:border-[#080806] px-3 py-1.5 text-xs text-[#080806] transition-colors rounded-none font-bold">
              <span>{getActiveFlag()}</span>
              <span className="uppercase tracking-wider">{language.split('-')[0]}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div className="absolute right-0 top-full mt-2 w-44 bg-[#FAF8F5] border border-[#080806]/15 rounded-none p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl flex flex-col z-50">
              {[
                { code: 'en', label: '🇬🇧 English' },
                { code: 'fr', label: '🇫🇷 Français' },
                { code: 'de', label: '🇩🇪 Deutsch' },
                { code: 'es', label: '🇪🇸 Español' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full px-3 py-2 text-left text-xs rounded-none transition-colors flex items-center gap-2 ${language === lang.code ? 'bg-[#080806]/10 text-[#C9603A] font-bold' : 'hover:bg-[#080806]/5 text-[#080806]/80'}`}
                >
                  {lang.label}
                </button>
              ))}
              <div className="h-[1px] bg-[#080806]/10 my-1" />
              <button
                onClick={() => setIsLangModalOpen(true)}
                className="w-full px-3 py-2 text-left text-xs rounded-none transition-colors flex items-center gap-2 text-[#C9603A] hover:bg-[#C9603A]/10 font-bold"
              >
                🌐 More Languages...
              </button>
            </div>
          </li>

          {/* Quote Basket Button */}
          <li className="flex items-center">
            <button 
              onClick={openDrawer} 
              className="relative p-2 text-[#080806] hover:text-[#C9603A] transition-colors focus:outline-none mr-2 flex items-center"
              aria-label="Open Quote Basket"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              {basket.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C9603A] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
                  {basket.length}
                </span>
              )}
            </button>
          </li>
          
          {user ? (
            <li>
              <button 
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.reload();
                }}
                className="border border-[#080806] text-[#080806] hover:bg-[#080806] hover:text-white transition-all px-4 py-2 text-xs uppercase tracking-widest font-extrabold bg-transparent rounded-none"
              >
                Sign Out
              </button>
            </li>
          ) : (
            <li>
              <Link 
                to="/auth?signup=true" 
                className="border border-[#080806] text-white bg-[#080806] hover:bg-transparent hover:text-[#080806] transition-all px-4 py-2 text-xs uppercase tracking-widest font-extrabold rounded-none"
              >
                {t('nav.getQuote')}
              </Link>
            </li>
          )}
        </ul>
        <button 
          className="nav-hamburger" 
          aria-label="Open menu" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span style={{ background: '#080806' }}></span>
          <span style={{ background: '#080806' }}></span>
          <span style={{ background: '#080806' }}></span>
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`} id="mobile-nav" style={{ background: '#FAF8F5' }}>
        <Link to="/" style={{ color: '#080806' }} onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t('nav.home')}</Link>
        <Link to="/services" style={{ color: '#080806' }} onClick={handleNavClick}>{t('nav.services')}</Link>
        <Link to="/gallery" style={{ color: '#080806' }} onClick={handleNavClick}>{t('nav.gallery')}</Link>
        <Link to="/about" style={{ color: '#080806' }} onClick={handleNavClick}>{t('nav.about')}</Link>
        <Link to="/vault" style={{ color: '#080806' }} onClick={handleNavClick}>{t('nav.myProjects')}</Link>
        
        {isAdmin && (
          <Link 
            to="/admin" 
            onClick={handleNavClick}
            className="flex items-center justify-center gap-2 py-3 border border-[#080806] text-[#080806] hover:bg-[#080806] hover:text-white transition-all tracking-widest uppercase text-[11px] rounded-none mt-2 font-bold"
          >
            <Brain size={14} className="animate-pulse shrink-0" />
            Admin Panel
          </Link>
        )}
        
        <button 
          onClick={() => { setIsMobileMenuOpen(false); openDrawer(); }}
          className="flex items-center justify-center gap-2 py-3.5 border border-[#080806]/15 text-[#080806] tracking-widest uppercase text-[11px] bg-[#080806]/5 rounded-none font-bold mt-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          {t('nav.basket')} ({basket.length})
        </button>
        
        {user ? (
          <button 
            onClick={async () => {
              setIsMobileMenuOpen(false);
              await supabase.auth.signOut();
              window.location.reload();
            }}
            className="w-full bg-[#C9603A] text-white py-4 text-xs uppercase tracking-widest font-bold mt-4 border border-[#C9603A] hover:bg-transparent hover:text-[#C9603A] transition-all text-center rounded-none"
          >
            Sign Out
          </button>
        ) : (
          <Link to="/auth?signup=true" style={{ color: '#080806' }} onClick={() => setIsMobileMenuOpen(false)}>{t('nav.getQuote')}</Link>
        )}
        
        {/* Mobile Language Switcher */}
        <div className="flex flex-wrap gap-2 justify-center items-center py-4 border-t border-[#080806]/10 mt-4 px-4">
          {[
            { code: 'en', flag: '🇬🇧' },
            { code: 'fr', flag: '🇫🇷' },
            { code: 'de', flag: '🇩🇪' },
            { code: 'es', flag: '🇪🇸' }
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`px-3 py-1.5 text-xs rounded-none border uppercase tracking-wider font-extrabold transition-all ${language === lang.code ? 'bg-[#080806] text-white border-[#080806]' : 'border-[#080806]/15 text-[#080806]/70'}`}
            >
              {lang.flag} {lang.code}
            </button>
          ))}
          <button
            onClick={() => { setIsMobileMenuOpen(false); setIsLangModalOpen(true); }}
            className="px-3 py-1.5 text-xs rounded-none border border-[#080806] text-[#080806] uppercase tracking-wider font-extrabold hover:bg-[#080806]/10 transition-all flex items-center gap-1"
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
          <div className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#080806]/15 rounded-none text-[#080806] shadow-2xl flex flex-col max-h-[82vh] overflow-hidden z-10 animate-scale-up">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-[#080806]/15">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[#C9603A] text-xs font-bold uppercase tracking-widest">Universal Translator</span>
                  <h3 className="font-serif text-2xl tracking-wide mt-1">Select Language</h3>
                </div>
                <button 
                  onClick={() => setIsLangModalOpen(false)}
                  className="p-2 hover:bg-[#080806]/5 rounded-full transition-colors text-[#080806]/60 hover:text-[#080806]"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>

              {/* Search Box */}
              <div className="mt-4 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#080806]/35">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                </span>
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 100+ languages..."
                  className="w-full bg-white border border-[#080806]/15 rounded-none pl-12 pr-4 py-3 text-sm text-[#080806] placeholder-[#080806]/35 focus:border-[#C9603A] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {filteredLanguages.length === 0 ? (
                <div className="text-center py-12 text-[#080806]/40 text-sm">
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
                      className={`flex items-center gap-3 px-4 py-3.5 text-sm text-left border rounded-none transition-all ${language === lang.code ? 'bg-[#080806]/10 border-[#080806] text-[#C9603A] font-bold' : 'bg-white border-[#080806]/15 text-[#080806]/85 hover:border-[#080806]/30 hover:bg-[#080806]/5'}`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-bold tracking-wide">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#080806]/15 bg-[#F4F0EA] text-center text-xs text-[#080806]/60 flex justify-center items-center gap-2 font-bold">
              <span>⚡ Supports all international languages seamlessly via hybrid translation</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
