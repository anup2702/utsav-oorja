import React, { useState, useEffect, useMemo } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
// import { Analytics } from '@vercel/analytics/react'; // TODO: Enable once package is installed
import { db } from './firebase';
import Header from './components/Header';
import PandalCard from './components/PandalCard';
import FilterBar from './components/FilterBar';
import MetroGuide from './components/MetroGuide';
import AIChatbot from './components/AIChatbot';
import LanguageSwitcher from './components/LanguageSwitcher.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';
import { FavoritesProvider } from './contexts/FavoritesContext.jsx';
import { WelcomeProvider, useWelcome } from './contexts/WelcomeContext.jsx';
import { useTranslation } from './hooks/useTranslation.js';
import { useFavorites } from './contexts/FavoritesContext.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import VoteDebugPanel from './components/VoteDebugPanel.jsx';
import { useAnalytics } from './hooks/useAnalytics.js';
// import { Analytics } from "@vercel/analytics/react" // TODO: Enable once package is installed
import { 
  Building2, 
  MapPin, 
  Heart, 
  Train, 
  HelpCircle, 
  MessageCircle,
  Phone,
  Shield,
  Ambulance,
  Users,
  Map,
  Bus,
  Info
} from 'lucide-react';

const AppContent = () => {
  const [pandals, setPandals] = useState([]);
  const [translatedPandals, setTranslatedPandals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [sortBy, setSortBy] = useState('votes-desc');
  const [activeTab, setActiveTab] = useState('pandals');
  const [showVoteDebug, setShowVoteDebug] = useState(false);
  const { t, translatePandals } = useTranslation();
  const { favorites, favoritesCount } = useFavorites();
  const { showWelcome, closeWelcome } = useWelcome();
  const { trackEvent } = useAnalytics();

  // Analytics is now initialized in useAnalytics hook

  // Keyboard shortcut for vote debug panel (Ctrl+Shift+V)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'V') {
        event.preventDefault();
        setShowVoteDebug(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'pandals'), orderBy('votes', 'desc'));
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const pandalsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPandals(pandalsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching pandals:', error);
        setError('Failed to load pandals. Please check your Firebase configuration.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Use original pandals for now to avoid API performance issues
  useEffect(() => {
    if (pandals.length > 0) {
      setTranslatedPandals(pandals);
    }
  }, [pandals]);

  // Extract unique areas for filter dropdown
  const areas = useMemo(() => {
    const areaSet = new Set();
    translatedPandals.forEach(pandal => {
      const area = pandal.location.split(',')[1]?.trim() || pandal.location.split(',')[0]?.trim();
      if (area) areaSet.add(area);
    });
    return Array.from(areaSet).sort();
  }, [translatedPandals]);

  // Filter and sort pandals with performance optimization
  const filteredAndSortedPandals = useMemo(() => {
    if (!translatedPandals.length) return [];
    
    let filtered = translatedPandals;
    
    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(pandal => 
        pandal.name.toLowerCase().includes(searchLower) ||
        pandal.location.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply area filter
    if (selectedArea) {
      const areaLower = selectedArea.toLowerCase();
      filtered = filtered.filter(pandal => 
        pandal.location.toLowerCase().includes(areaLower)
      );
    }

    // Sort the filtered results
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'votes-desc':
          return (b.votes || 0) - (a.votes || 0);
        case 'votes-asc':
          return (a.votes || 0) - (b.votes || 0);
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return (b.votes || 0) - (a.votes || 0);
      }
    });
  }, [translatedPandals, searchTerm, selectedArea, sortBy]);



  if (error) {
    return (
      
      <div className="min-h-screen bg-bg-secondary">
        <Header />
        <div className="flex justify-center items-center py-20">
          <div className="text-center bg-bg-primary p-8 rounded-2xl shadow-sm border border-secondary-light max-w-md mx-4">
            <div className="text-error text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-inter font-bold text-text-primary mb-2">{t('error')}</h2>
            <p className="text-text-secondary mb-4">{error}</p>
            <p className="text-sm text-text-tertiary">
              Please check your internet connection and try again
            </p>
            {/* <Analytics /> TODO: Enable once package is installed */}
          </div>
        </div>
      </div>
    );
  }

  return (
        <div className="min-h-screen bg-bg-secondary">
          {/* Welcome Screen */}
          {showWelcome && <WelcomeScreen onClose={closeWelcome} />}
          
          {/* Header */}
          <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Mobile-First Main Content */}
      <main className="pb-20">
        {/* Tab Content */}
        {activeTab === 'pandals' && (
          <>

            {/* Filter Bar - Mobile Optimized */}
            <div className="bg-white border-b border-gray-200 px-4 py-3">
              <FilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedArea={selectedArea}
                setSelectedArea={setSelectedArea}
                sortBy={sortBy}
                setSortBy={setSortBy}
                areas={areas}
              />
            </div>

            {/* Mobile Card Feed */}
            {filteredAndSortedPandals.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-baloo font-bold text-text-primary mb-3">{t('noResults')}</h3>
                  <p className="text-gray-600 mb-6 font-poppins">
                    {searchTerm || selectedArea 
                      ? t('tryAdjusting')
                      : t('addPandals')
                    }
                  </p>
                  {(searchTerm || selectedArea) && (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedArea('');
                      }}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-poppins font-semibold transition-colors duration-200 shadow-lg"
                    >
                      {t('clearFilters')}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="px-4 py-4 space-y-4">
                {/* Results count */}
                <div className="text-center mb-4">
                  <p className="text-gray-600 font-poppins text-sm">
                    {t('showing')} {filteredAndSortedPandals.length} {t('of')} {translatedPandals.length} {t('pandalsFound')}
                  </p>
                </div>

                {/* Mobile Card Feed */}
                {filteredAndSortedPandals.map((pandal, index) => (
                  <div
                    key={pandal.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <PandalCard pandal={pandal} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'metro' && (
          <div className="px-4 py-4">
            <MetroGuide pandals={translatedPandals} />
          </div>
        )}

        {activeTab === 'help' && (
          <div className="px-4 py-4 space-y-4">
            {/* Emergency Contacts */}
            <div className="bg-bg-primary rounded-2xl p-6 shadow-sm border border-secondary-light">
              <h2 className="text-2xl font-inter font-bold text-text-primary mb-4 flex items-center">
                <Shield className="w-6 h-6 text-accent mr-3" />
                {t('emergencyContacts')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-bg-secondary border border-secondary-light rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <Ambulance className="w-6 h-6 text-accent mr-3" />
                    <div>
                      <h3 className="font-inter font-bold text-text-primary">{t('medicalEmergency')}</h3>
                      <p className="font-inter text-text-secondary text-sm">{t('ambulanceHelp')}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <a href="tel:108" className="flex items-center justify-center bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg font-inter font-semibold transition-colors duration-200">
                      <Phone className="w-4 h-4 mr-2" />
                      108 - {t('emergencyAmbulance')}
                    </a>
                    <a href="tel:102" className="flex items-center justify-center bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg font-inter font-semibold transition-colors duration-200">
                      <Phone className="w-4 h-4 mr-2" />
                      102 - {t('medicalEmergencyNumber')}
                    </a>
                  </div>
                </div>

                <div className="bg-bg-secondary border border-secondary-light rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <Shield className="w-6 h-6 text-info mr-3" />
                    <div>
                      <h3 className="font-inter font-bold text-text-primary">{t('policeSecurity')}</h3>
                      <p className="font-inter text-text-secondary text-sm">{t('lawEnforcement')}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <a href="tel:100" className="flex items-center justify-center bg-info hover:bg-info/90 text-white px-4 py-2 rounded-lg font-inter font-semibold transition-colors duration-200">
                      <Phone className="w-4 h-4 mr-2" />
                      100 - {t('policeEmergency')}
                    </a>
                    <a href="tel:1090" className="flex items-center justify-center bg-info hover:bg-info/90 text-white px-4 py-2 rounded-lg font-inter font-semibold transition-colors duration-200">
                      <Phone className="w-4 h-4 mr-2" />
                      1090 - {t('womenHelpline')}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Durga Puja Helplines */}
            <div className="bg-bg-primary rounded-2xl p-6 shadow-sm border border-secondary-light">
              <h2 className="text-2xl font-inter font-bold text-text-primary mb-4 flex items-center">
                <Building2 className="w-6 h-6 text-primary mr-3" />
                Durga Puja Helplines
              </h2>
              <div className="space-y-4">
                <div className="bg-bg-secondary border border-secondary-light rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <Building2 className="w-6 h-6 text-primary mr-3" />
                    <div>
                      <h3 className="font-inter font-bold text-text-primary">Kolkata Municipal Corporation</h3>
                      <p className="font-inter text-text-secondary text-sm">Pandal Information & Support</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <a href="tel:033-2223-3030" className="flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-inter font-semibold transition-colors duration-200">
                      <Phone className="w-4 h-4 mr-2" />
                      033-2223-3030
                    </a>
                    <a href="tel:033-2223-3031" className="flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-inter font-semibold transition-colors duration-200">
                      <Phone className="w-4 h-4 mr-2" />
                      033-2223-3031
                    </a>
                  </div>
                </div>

                <div className="bg-bg-secondary border border-secondary-light rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <Train className="w-6 h-6 text-secondary mr-3" />
                    <div>
                      <h3 className="font-inter font-bold text-text-primary">Kolkata Metro</h3>
                      <p className="font-inter text-text-secondary text-sm">Metro Information & Support</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <a href="tel:033-2223-3030" className="flex items-center justify-center bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg font-inter font-semibold transition-colors duration-200">
                      <Phone className="w-4 h-4 mr-2" />
                      033-2223-3030
                    </a>
                    <a href="tel:033-2223-3031" className="flex items-center justify-center bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg font-inter font-semibold transition-colors duration-200">
                      <Phone className="w-4 h-4 mr-2" />
                      033-2223-3031
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Tourist Information */}
            <div className="bg-bg-primary rounded-2xl p-6 shadow-sm border border-secondary-light">
              <h2 className="text-2xl font-inter font-bold text-text-primary mb-4 flex items-center">
                <Map className="w-6 h-6 text-info mr-3" />
                Tourist Information
              </h2>
              <div className="space-y-4">
                <div className="bg-bg-secondary border border-secondary-light rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <Building2 className="w-6 h-6 text-info mr-3" />
                    <div>
                      <h3 className="font-inter font-bold text-text-primary">West Bengal Tourism</h3>
                      <p className="font-inter text-text-secondary text-sm">Tourist Information & Support</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <a href="tel:033-2223-3030" className="flex items-center justify-center bg-info hover:bg-info/90 text-white px-4 py-2 rounded-lg font-inter font-semibold transition-colors duration-200">
                      <Phone className="w-4 h-4 mr-2" />
                      033-2223-3030
                    </a>
                    <a href="tel:033-2223-3031" className="flex items-center justify-center bg-info hover:bg-info/90 text-white px-4 py-2 rounded-lg font-inter font-semibold transition-colors duration-200">
                      <Phone className="w-4 h-4 mr-2" />
                      033-2223-3031
                    </a>
                  </div>
                </div>

                <div className="bg-bg-secondary border border-secondary-light rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <Bus className="w-6 h-6 text-warning mr-3" />
                    <div>
                      <h3 className="font-inter font-bold text-text-primary">Public Transport</h3>
                      <p className="font-inter text-text-secondary text-sm">Bus & Transport Information</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <a href="tel:033-2223-3030" className="flex items-center justify-center bg-warning hover:bg-warning/90 text-white px-4 py-2 rounded-lg font-inter font-semibold transition-colors duration-200">
                      <Phone className="w-4 h-4 mr-2" />
                      033-2223-3030
                    </a>
                    <a href="tel:033-2223-3031" className="flex items-center justify-center bg-warning hover:bg-warning/90 text-white px-4 py-2 rounded-lg font-inter font-semibold transition-colors duration-200">
                      <Phone className="w-4 h-4 mr-2" />
                      033-2223-3031
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-bg-primary rounded-2xl p-6 shadow-sm border border-secondary-light">
              <h2 className="text-2xl font-inter font-bold text-text-primary mb-4 flex items-center">
                <Info className="w-6 h-6 text-info mr-3" />
                Quick Safety Tips
              </h2>
              <div className="space-y-3">
                <div className="flex items-start p-3 bg-bg-secondary rounded-lg border border-secondary-light">
                  <Phone className="w-5 h-5 text-info mr-3 mt-1" />
                  <div>
                    <p className="font-inter font-semibold text-text-primary text-sm">Keep Emergency Numbers Handy</p>
                    <p className="font-inter text-text-secondary text-sm">Save all emergency contacts in your phone</p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-bg-secondary rounded-lg border border-secondary-light">
                  <Users className="w-5 h-5 text-success mr-3 mt-1" />
                  <div>
                    <p className="font-inter font-semibold text-text-primary text-sm">Stay in Groups</p>
                    <p className="font-inter text-text-secondary text-sm">Avoid visiting pandals alone, especially at night</p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-bg-secondary rounded-lg border border-secondary-light">
                  <MapPin className="w-5 h-5 text-primary mr-3 mt-1" />
                  <div>
                    <p className="font-inter font-semibold text-text-primary text-sm">Share Your Location</p>
                    <p className="font-inter text-text-secondary text-sm">Let family know which pandals you're visiting</p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-bg-secondary rounded-lg border border-secondary-light">
                  <Shield className="w-5 h-5 text-accent mr-3 mt-1" />
                  <div>
                    <p className="font-inter font-semibold text-text-primary text-sm">Report Suspicious Activity</p>
                    <p className="font-inter text-text-secondary text-sm">Call 100 immediately if you see anything suspicious</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="px-4 py-4">
            {favorites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
                  <div className="text-6xl mb-4">💔</div>
                  <h3 className="text-xl font-baloo font-bold text-text-primary mb-3">{t('noFavoritesYet')}</h3>
                  <p className="text-gray-600 mb-6 font-poppins">
                    {t('startExploring')}
                  </p>
                  <button
                    onClick={() => setActiveTab('pandals')}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-poppins font-semibold transition-colors duration-200 shadow-lg"
                  >
                    {t('explorePandals')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Favorites Header */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-baloo font-bold text-text-primary flex items-center">
                        <Heart className="w-6 h-6 text-red-500 mr-3 fill-current" />
                        {t('myFavorites')}
                      </h2>
                      <p className="text-gray-600 font-poppins text-sm mt-1">
                        {favorites.length} {t('pandalsSaved')}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('pandals')}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-poppins font-semibold transition-colors duration-200"
                    >
                      {t('exploreMore')}
                    </button>
                  </div>
                </div>

                {/* Favorites List */}
                <div className="space-y-4">
                  {favorites.map((pandal, index) => (
                    <div
                      key={pandal.id}
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <PandalCard pandal={pandal} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'chatbot' && (
          <div className="px-4 py-4 h-full">
            <AIChatbot pandals={translatedPandals} />
          </div>
        )}
      </main>

      {/* Mobile Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex items-center justify-around py-2">
          <button 
            onClick={() => {
              setActiveTab('pandals');
              trackEvent.tabSwitch('pandals');
            }}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 ${
              activeTab === 'pandals' ? 'bg-primary/10' : ''
            }`}
          >
            <Building2 className={`w-6 h-6 mb-1 ${activeTab === 'pandals' ? 'text-primary' : 'text-gray-500'}`} />
            <span className={`text-xs font-poppins font-medium ${
              activeTab === 'pandals' ? 'text-primary' : 'text-gray-500'
            }`}>{t('pandals')}</span>
          </button>
          <button 
            onClick={() => {
              setActiveTab('metro');
              trackEvent.tabSwitch('metro');
            }}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 ${
              activeTab === 'metro' ? 'bg-primary/10' : ''
            }`}
          >
            <Train className={`w-6 h-6 mb-1 ${activeTab === 'metro' ? 'text-primary' : 'text-gray-500'}`} />
            <span className={`text-xs font-poppins font-medium ${
              activeTab === 'metro' ? 'text-primary' : 'text-gray-500'
            }`}>{t('metro')}</span>
          </button>
          <button 
            onClick={() => {
              setActiveTab('help');
              trackEvent.tabSwitch('help');
            }}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 ${
              activeTab === 'help' ? 'bg-primary/10' : ''
            }`}
          >
            <HelpCircle className={`w-6 h-6 mb-1 ${activeTab === 'help' ? 'text-primary' : 'text-gray-500'}`} />
            <span className={`text-xs font-poppins font-medium ${
              activeTab === 'help' ? 'text-primary' : 'text-gray-500'
            }`}>{t('help')}</span>
          </button>
          <button 
            onClick={() => {
              setActiveTab('chatbot');
              trackEvent.tabSwitch('chatbot');
            }}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 ${
              activeTab === 'chatbot' ? 'bg-primary/10' : ''
            }`}
          >
            <MessageCircle className={`w-6 h-6 mb-1 ${activeTab === 'chatbot' ? 'text-primary' : 'text-gray-500'}`} />
            <span className={`text-xs font-poppins font-medium ${
              activeTab === 'chatbot' ? 'text-primary' : 'text-gray-500'
            }`}>{t('aiChat')}</span>
          </button>
        </div>
      </div>

      {/* Vote Debug Panel */}
      <VoteDebugPanel 
        isOpen={showVoteDebug} 
        onClose={() => setShowVoteDebug(false)} 
      />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <FavoritesProvider>
        <WelcomeProvider>
          <AppContent />
          {/* <Analytics /> TODO: Enable once package is installed */}
        </WelcomeProvider>
      </FavoritesProvider>
    </LanguageProvider>
  );
}

export default App;
