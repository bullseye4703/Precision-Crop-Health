import { createContext, useState, useContext } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const t = (keyPath) => {
    const keys = keyPath.split('.');
    let result = translations[language];
    for (const key of keys) {
      if (result[key] === undefined) {
        // fallback to english
        let fallback = translations['en'];
        for (const k of keys) {
          if (!fallback || fallback[k] === undefined) return keyPath;
          fallback = fallback[k];
        }
        return fallback;
      }
      result = result[key];
    }
    return result;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
