import React, { createContext, useContext, useState, useEffect } from 'react';

const WelcomeContext = createContext();

export const useWelcome = () => {
  const context = useContext(WelcomeContext);
  if (!context) {
    throw new Error('useWelcome must be used within a WelcomeProvider');
  }
  return context;
};

export const WelcomeProvider = ({ children }) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // Check if this is the first visit or a page refresh
    const hasVisited = localStorage.getItem('kolkata-pandal-visited');
    const lastVisit = localStorage.getItem('kolkata-pandal-last-visit');
    const now = Date.now();
    
    // Show welcome screen if:
    // 1. First time visiting (no localStorage entry)
    // 2. Page refresh (less than 5 minutes since last visit)
    // 3. More than 24 hours since last visit
    if (!hasVisited) {
      setIsFirstVisit(true);
      setShowWelcome(true);
    } else if (lastVisit && (now - parseInt(lastVisit)) < 5 * 60 * 1000) {
      // Page refresh - show welcome
      setShowWelcome(true);
    } else if (lastVisit && (now - parseInt(lastVisit)) > 24 * 60 * 60 * 1000) {
      // More than 24 hours - show welcome
      setShowWelcome(true);
    }

    // Update last visit timestamp
    localStorage.setItem('kolkata-pandal-last-visit', now.toString());
  }, []);

  const closeWelcome = () => {
    setShowWelcome(false);
    if (isFirstVisit) {
      localStorage.setItem('kolkata-pandal-visited', 'true');
      setIsFirstVisit(false);
    }
  };

  const showWelcomeScreen = () => {
    setShowWelcome(true);
  };

  const value = {
    showWelcome,
    closeWelcome,
    showWelcomeScreen,
    isFirstVisit
  };

  return (
    <WelcomeContext.Provider value={value}>
      {children}
    </WelcomeContext.Provider>
  );
};
