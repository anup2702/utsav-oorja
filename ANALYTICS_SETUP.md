# Analytics Setup Guide

## Current Status
✅ **App builds successfully** without analytics dependencies
✅ **Analytics code is ready** but using placeholder functions
✅ **All tracking events are implemented** and will work once packages are installed

## To Enable Full Analytics

### 1. Install Required Packages
```bash
npm install @vercel/analytics react-ga4
```

### 2. Update Analytics Files

#### `src/utils/analytics.js`
Replace the placeholder functions with the real implementations:

```javascript
import ReactGA from 'react-ga4';

// Google Analytics Configuration
const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID || 'G-XXXXXXXXXX';

// Initialize Google Analytics
export const initGA = () => {
  if (GA_TRACKING_ID && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
    ReactGA.initialize(GA_TRACKING_ID, {
      testMode: process.env.NODE_ENV === 'development',
    });
  }
};

// Track page views
export const trackPageView = (path) => {
  if (GA_TRACKING_ID && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
};

// Track custom events
export const trackEvent = (action, category, label, value) => {
  if (GA_TRACKING_ID && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
    ReactGA.event({
      action: action,
      category: category,
      label: label,
      value: value,
    });
  }
};
```

#### `src/App.jsx`
Uncomment the Analytics import and component:

```javascript
import { Analytics } from '@vercel/analytics/react';

// In the App component:
<Analytics />
```

### 3. Set Environment Variables

#### For Local Development
Create `.env.local`:
```
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
```

#### For Vercel Deployment
Add in Vercel dashboard:
```
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
```

### 4. Test Analytics

1. **Local Testing:**
   - Set `REACT_APP_GA_TRACKING_ID` in `.env.local`
   - Run `npm start`
   - Check browser console for analytics logs

2. **Production Testing:**
   - Deploy to Vercel with environment variable
   - Check Google Analytics dashboard
   - Check Vercel Analytics dashboard

## Current Analytics Features

### ✅ Implemented (Ready to Activate)
- **Page View Tracking**: Automatic tracking of all page views
- **Pandal Interactions**: View, vote, favorite, share tracking
- **Navigation Events**: Tab switches, metro interactions
- **User Actions**: Search, filters, language changes
- **AI Chat Events**: Chat interactions and messages
- **Welcome Screen**: Onboarding event tracking
- **Error Tracking**: App errors and performance issues
- **Performance Monitoring**: Load times and user metrics

### 📊 Analytics Events Tracked

#### Pandal Interactions
- `pandal_view` - When user views a pandal
- `pandal_vote` - When user votes for a pandal
- `pandal_favorite` - When user adds/removes favorites
- `pandal_share` - When user shares a pandal

#### Navigation
- `tab_switch` - When user switches between tabs
- `metro_station_click` - When user clicks metro stations
- `language_change` - When user changes language

#### User Behavior
- `search` - When user searches for pandals
- `filter` - When user applies filters
- `ai_chat_start` - When user starts AI chat
- `ai_chat_message` - When user sends messages

#### Performance
- `page_load_time` - Page loading performance
- `image_load_time` - Image loading performance
- `error` - App errors and issues

## Benefits of Analytics

1. **User Insights**: Understand how users interact with your app
2. **Performance Monitoring**: Track app performance and identify issues
3. **Feature Usage**: See which features are most popular
4. **Conversion Tracking**: Monitor user engagement and retention
5. **Error Monitoring**: Quickly identify and fix issues
6. **SEO Optimization**: Track page views and user behavior

## Next Steps

1. **Install packages** when ready to enable analytics
2. **Get Google Analytics tracking ID** from Google Analytics dashboard
3. **Update environment variables** in Vercel
4. **Test analytics** in development and production
5. **Monitor dashboards** for insights

The app is fully prepared for analytics - just needs the packages installed and environment variables set!
