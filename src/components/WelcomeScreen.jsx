import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { trackAppEvents } from '../utils/analytics.js';

const WelcomeScreen = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Show welcome screen after a short delay for smooth animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    // Track welcome screen close
    trackAppEvents.welcomeScreenClose();
    
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Wait for fade out animation
  };

  return (
    <div className="fixed inset-0 bg-bg-secondary z-50 flex items-center justify-center p-4">
      <div className={`transition-all duration-500 transform ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        <div className="bg-bg-primary rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-secondary-light">
          {/* Logo */}
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <img 
                src="/logo_welcome.png" 
                alt="App Logo" 
                className="w-16 h-16 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="text-4xl hidden">🎭</span>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className="text-3xl font-inter font-bold text-text-primary mb-3">
              {t('welcomeTitle')}
            </h1>
            <p className="text-lg font-inter text-text-secondary mb-2">
              {t('welcomeSubtitle')}
            </p>
            <p className="text-sm font-inter text-text-tertiary">
              {t('welcomeDescription')}
            </p>
          </div>

          {/* Features Preview */}
          <div className="mb-8 space-y-3">
            <div className="flex items-center justify-center text-sm text-text-secondary">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              <span className="font-inter">{t('interactiveMetroMap')}</span>
            </div>
            <div className="flex items-center justify-center text-sm text-text-secondary">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              <span className="font-inter">{t('aiPandalAssistant')}</span>
            </div>
            <div className="flex items-center justify-center text-sm text-text-secondary">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              <span className="font-inter">{t('multilingualSupport')}</span>
            </div>
            <div className="flex items-center justify-center text-sm text-text-secondary">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              <span className="font-inter">{t('favoritesSharing')}</span>
            </div>
          </div>

          {/* Get Started Button */}
          <button
            onClick={handleGetStarted}
            className="w-full bg-primary hover:bg-primary-dark text-white font-inter font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {t('getStarted')}
          </button>

          {/* Footer */}
          <p className="text-xs text-text-tertiary mt-6 font-inter">
            {t('madeWithLove')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
