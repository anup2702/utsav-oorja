import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-bg-secondary hover:bg-bg-tertiary text-text-secondary hover:text-text-primary px-3 py-2.5 rounded-xl transition-all duration-200 border border-secondary-light"
        title="Change Language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-inter font-medium">
          {currentLanguage?.flag} {currentLanguage?.name}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-bg-primary rounded-xl shadow-lg border border-secondary-light z-20 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-bg-secondary transition-colors duration-200 ${
                  language === lang.code ? 'bg-primary-light' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{lang.flag}</span>
                  <span className="font-inter text-sm text-text-primary">
                    {lang.name}
                  </span>
                </div>
                {language === lang.code && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
