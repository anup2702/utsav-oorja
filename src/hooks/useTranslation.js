import { useLanguage } from '../contexts/LanguageContext.jsx';
import { translations } from '../translations/translations.js';
import translateService from '../services/translateService.js';

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object') {
            value = value[fallbackKey];
          } else {
            return key; // Return key if no translation found
          }
        }
        break;
      }
    }
    
    return value || key;
  };

  // Enhanced translation function that can translate dynamic content
  const translate = async (text, sourceLanguage = 'en') => {
    if (!text || typeof text !== 'string') return text;
    return await translateService.translateText(text, language, sourceLanguage);
  };

  // Translate pandal data
  const translatePandal = async (pandal) => {
    return await translateService.translatePandal(pandal, language);
  };

  // Translate array of pandals
  const translatePandals = async (pandals) => {
    return await translateService.translatePandals(pandals, language);
  };

  return { 
    t, 
    language, 
    translate, 
    translatePandal, 
    translatePandals 
  };
};
