import React, { useEffect } from 'react';
import { Heart, Coffee } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useFavorites } from '../contexts/FavoritesContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  const { favoritesCount } = useFavorites();

  useEffect(() => {
    // Load Buy Me a Coffee button script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js';
    script.setAttribute('data-name', 'bmc-button');
    script.setAttribute('data-slug', 'anup2702');
    script.setAttribute('data-color', '#FFDD00');
    script.setAttribute('data-emoji', '☕');
    script.setAttribute('data-font', 'Comic');
    script.setAttribute('data-text', 'Buy me a coffee');
    script.setAttribute('data-outline-color', '#000000');
    script.setAttribute('data-font-color', '#000000');
    script.setAttribute('data-coffee-color', '#ffffff');
    
    document.head.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-bg-primary border-b border-secondary-light shadow-sm backdrop-blur-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/logo_header.png" 
              alt="App Logo" 
              className="w-10 h-10 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="text-primary text-lg hidden">🎭</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('favorites')}
              className={`relative p-2.5 rounded-xl transition-all duration-200 ${
                activeTab === 'favorites' 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-bg-secondary hover:bg-bg-tertiary text-text-secondary hover:text-text-primary'
              }`}
              title={t('viewFavorites')}
            >
              <Heart 
                className={`w-5 h-5 ${
                  favoritesCount > 0 ? 'fill-current' : ''
                }`} 
              />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {favoritesCount}
                </span>
              )}
            </button>
            
            {/* Buy Me a Coffee Button */}
            {/* <a
              href="https://buymeacoffee.com/anup2702"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl transition-all duration-200 bg-yellow-500 text-white shadow-sm"
              title="Buy me a coffee"
            >
              ☕
            </a> */}
            
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
