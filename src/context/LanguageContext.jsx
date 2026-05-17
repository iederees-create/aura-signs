import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../locales/en';
import { fr } from '../locales/fr';
import { de } from '../locales/de';
import { es } from '../locales/es';

const LanguageContext = createContext();

const dictionaries = { en, fr, de, es };

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // 1. Check local storage override
    const saved = localStorage.getItem('bespoke_language');
    if (saved && dictionaries[saved]) return saved;

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
    if (dictionaries[lang]) {
      setLanguage(lang);
    }
  };

  // Safe nested translation lookup with English fallback
  const t = (path) => {
    const keys = path.split('.');
    
    // Resolve active language translation
    let value = dictionaries[language];
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
