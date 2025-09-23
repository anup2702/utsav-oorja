import { useEffect } from 'react';
import { initGA, trackPageView, trackAppEvents } from '../utils/analytics.js';

// Custom hook for analytics
export const useAnalytics = () => {
  // Initialize Google Analytics and track initial page view
  useEffect(() => {
    // Initialize GA4
    initGA();
    
    // Track initial page view
    trackPageView(window.location.pathname + window.location.search);
  }, []);

  return {
    trackEvent: trackAppEvents,
  };
};

// Hook for tracking specific page analytics
export const usePageAnalytics = (pageName) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      trackAppEvents.pageLoad?.(pageName, loadTime);
    };
  }, [pageName]);
};
