# Environment Variables Setup

## ⚠️ Security Notice
The `.env` file has been removed from Git tracking for security. Never commit sensitive API keys to version control.

## Required Environment Variables

### Firebase Configuration (Required)
```bash
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Optional Environment Variables

#### Google Analytics (Optional)
```bash
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
```

#### Google Translate API (Optional)
```bash
REACT_APP_GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key
```

#### Gemini AI API (Optional)
```bash
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
```

## Setup Instructions

### 1. Local Development
Create a `.env` file in the root directory:
```bash
# Copy the template and fill in your values
cp ENVIRONMENT_VARIABLES.md .env
# Then edit .env with your actual values
```

### 2. Vercel Deployment
Add environment variables in Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable for Production, Preview, and Development

### 3. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings → General
4. Scroll down to "Your apps" section
5. Copy the config values to your environment variables

### 4. Google Analytics Setup (Optional)
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Get your Measurement ID (starts with G-)
4. Add it as `REACT_APP_GA_TRACKING_ID`

**Note**: The app uses `react-ga4` for Google Analytics 4 tracking. Analytics will automatically track:
- Page views
- Pandal interactions (votes, favorites, shares)
- Metro station clicks
- Language changes
- AI chatbot usage
- Tab navigation
- Welcome screen interactions

### 5. Google Translate API (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Translation API
3. Create credentials (API Key)
4. Add it as `REACT_APP_GOOGLE_TRANSLATE_API_KEY`

### 6. Gemini AI API (Optional)
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it as `REACT_APP_GEMINI_API_KEY`

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use different API keys** for development and production
3. **Rotate API keys** regularly
4. **Limit API key permissions** to only what's needed
5. **Monitor API usage** for unusual activity

## Troubleshooting

### Common Issues:
- **"Firebase not initialized"**: Check Firebase environment variables
- **"Analytics not working"**: Verify GA tracking ID is correct
- **"Translation not working"**: Check Google Translate API key
- **"AI chat not working"**: Verify Gemini API key

### Testing Environment Variables:
```bash
# Check if variables are loaded
npm start
# Look for console logs showing which services are initialized
```

## File Structure
```
project/
├── .env                    # Local environment variables (not tracked)
├── .env.example           # Template for environment variables
├── .gitignore            # Includes .env to prevent tracking
└── ENVIRONMENT_VARIABLES.md  # This documentation
```

## Support
If you need help setting up environment variables, check:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Google Analytics Setup](https://support.google.com/analytics/answer/9304153)
