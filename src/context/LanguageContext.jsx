import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../locales/en';
import { fr } from '../locales/fr';
import { de } from '../locales/de';
import { es } from '../locales/es';

const LanguageContext = createContext();

const dictionaries = { en, fr, de, es };

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // 1. Check local storage override (can be handcrafted or universal)
    const saved = localStorage.getItem('bespoke_language');
    if (saved) return saved;

    // 2. Check browser locale preference
    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]);
    if (browserLang) {
      const code = browserLang.substring(0, 2).toLowerCase();
      if (dictionaries[code]) return code;
    }

    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('bespoke_language', language);
  }, [language]);

  // Load Google Translate script dynamically if a universal language is active
  useEffect(() => {
    const isUniversal = !['en', 'fr', 'de', 'es'].includes(language);
    
    if (isUniversal) {
      // Define global init callback
      if (!window.googleTranslateElementInit) {
        window.googleTranslateElementInit = () => {
          new window.googleTranslate.TranslateElement({
            pageLanguage: 'en',
            layout: window.googleTranslate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          }, 'google_translate_element');
        };
      }
      
      // Inject Google Translate script if not present
      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
      }
    }
  }, [language]);

  useEffect(() => {
    // 3. Geolocation Heuristic (Non-blocking IP lookup)
    const detectIPLocation = async () => {
      // Check if user has already set a manual override in local storage
      const hasManualOverride = localStorage.getItem('bespoke_language');
      if (hasManualOverride) return; // Respect manual selection

      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) return;
        const data = await response.json();
        
        const country = data.country_code ? data.country_code.toUpperCase() : '';
        
        // Auto-switch language based on originating IP country
        if (['DE', 'AT', 'CH'].includes(country)) {
          setLanguage('de');
        } else if (['FR', 'BE', 'CA'].includes(country)) {
          setLanguage('fr');
        } else if (['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'HN', 'PY', 'SV', 'CR', 'UY'].includes(country)) {
          setLanguage('es');
        }
      } catch (err) {
        console.warn('Geolocation language detection fallback active:', err.message);
      }
    };

    detectIPLocation();
  }, []);

  const changeLanguage = (lang) => {
    const isCurrentHandcrafted = ['en', 'fr', 'de', 'es'].includes(language);
    const isTargetHandcrafted = ['en', 'fr', 'de', 'es'].includes(lang);

    if (isTargetHandcrafted) {
      // 1. Delete Google Translate cookies to restore clean original English
      const deleteCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname.split('.').slice(-2).join('.')};`;
      };
      
      deleteCookie('googtrans');
      
      localStorage.setItem('bespoke_language', lang);
      setLanguage(lang);

      // Force a reload if switching from a universal machine-translated language to restore clean DOM
      if (!isCurrentHandcrafted) {
        window.location.reload();
      }
    } else {
      // 2. Target is a universal language - set the googtrans cookie
      const hostname = window.location.hostname;
      document.cookie = `googtrans=/en/${lang}; path=/;`;
      document.cookie = `googtrans=/en/${lang}; path=/; domain=${hostname};`;
      
      // Handle wildcard / parent subdomains
      const domainParts = hostname.split('.');
      if (domainParts.length > 1) {
        document.cookie = `googtrans=/en/${lang}; path=/; domain=.${domainParts.slice(-2).join('.')};`;
      }

      localStorage.setItem('bespoke_language', lang);
      setLanguage(lang);

      // Reload to let Google Translate intercept and translate on page refresh
      window.location.reload();
    }
  };

  // Safe nested translation lookup with English fallback
  const t = (path) => {
    const keys = path.split('.');
    
    // Resolve active language translation
    // If language is universal (e.g. Italian 'it'), we use 'en' as the handcrafted dictionary fallback
    // (so the original DOM renders pristine English text, allowing Google Translate to translate it perfectly!)
    const activeDictCode = dictionaries[language] ? language : 'en';
    let value = dictionaries[activeDictCode];
    let found = true;
    
    for (const key of keys) {
      if (value && value[key] !== undefined) {
        value = value[key];
      } else {
        found = false;
        break;
      }
    }

    if (found) return value;

    // Fallback to English translation
    let englishValue = dictionaries['en'];
    for (const key of keys) {
      if (englishValue && englishValue[key] !== undefined) {
        englishValue = englishValue[key];
      } else {
        return path; // Absolute fallback: return raw path
      }
    }
    return englishValue;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
      {/* Container required for Google Translate initialization (completely hidden) */}
      <div id="google_translate_element" style={{ display: 'none', position: 'absolute', width: 0, height: 0, opacity: 0 }} />
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
