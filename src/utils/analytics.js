import ReactGA from 'react-ga4';

// Google Analytics Configuration
const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID || 'G-XXXXXXXXXX';

// Initialize Google Analytics
export const initGA = () => {
  if (GA_TRACKING_ID && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
    ReactGA.initialize(GA_TRACKING_ID, {
      testMode: process.env.NODE_ENV === 'development',
      debug: process.env.NODE_ENV === 'development'
    });
    console.log('Google Analytics initialized with ID:', GA_TRACKING_ID);
  } else {
    console.warn('Google Analytics not initialized: Missing or invalid tracking ID');
  }
};

// Track page views
export const trackPageView = (path) => {
  if (GA_TRACKING_ID && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
    ReactGA.send({ hitType: 'pageview', page: path });
    console.log('Page view tracked:', path);
  }
};

// Track custom events
export const trackEvent = (action, category, label, value) => {
  if (GA_TRACKING_ID && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
    ReactGA.event({
      action: action,
      category: category,
      label: label,
      value: value
    });
    console.log('Event tracked:', { action, category, label, value });
  }
};

// Track specific app events
export const trackAppEvents = {
  // Pandal interactions
  pandalView: (pandalName) => {
    trackEvent('pandal_view', 'pandal_interaction', pandalName);
  },
  
  pandalVote: (pandalName) => {
    trackEvent('pandal_vote', 'pandal_interaction', pandalName);
  },
  
  pandalFavorite: (pandalName, action) => {
    trackEvent(`pandal_${action}`, 'favorites', pandalName);
  },
  
  pandalShare: (pandalName, method) => {
    trackEvent('pandal_share', 'sharing', `${pandalName}_${method}`);
  },
  
  // Navigation events
  tabSwitch: (tabName) => {
    trackEvent('tab_switch', 'navigation', tabName);
  },
  
  metroStationClick: (stationName, line) => {
    trackEvent('metro_station_click', 'metro_interaction', `${stationName}_${line}`);
  },
  
  // Language events
  languageChange: (language) => {
    trackEvent('language_change', 'localization', language);
  },
  
  // Search and filter events
  search: (searchTerm) => {
    trackEvent('search', 'user_interaction', searchTerm);
  },
  
  filter: (filterType, filterValue) => {
    trackEvent('filter', 'user_interaction', `${filterType}_${filterValue}`);
  },
  
  // AI Chat events
  aiChatStart: () => {
    trackEvent('ai_chat_start', 'ai_interaction', 'chatbot');
  },
  
  aiChatMessage: (messageLength) => {
    trackEvent('ai_chat_message', 'ai_interaction', `message_${messageLength}_chars`);
  },
  
  // Welcome screen events
  welcomeScreenClose: () => {
    trackEvent('welcome_screen_close', 'onboarding', 'get_started');
  },
  
  // Error tracking
  error: (errorType, errorMessage) => {
    trackEvent('error', 'app_error', `${errorType}_${errorMessage}`);
  }
};

// Performance tracking
export const trackPerformance = {
  pageLoad: (pageName, loadTime) => {
    trackEvent('page_load_time', 'performance', pageName, Math.round(loadTime));
  },
  
  imageLoad: (imageUrl, loadTime) => {
    trackEvent('image_load_time', 'performance', imageUrl, Math.round(loadTime));
  }
};
