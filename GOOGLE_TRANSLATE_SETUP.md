# Google Translate API Setup Guide

## Overview
This app now uses Google Translate API to dynamically translate all content including pandal names, locations, and descriptions. This ensures that all text changes when you switch languages, not just the UI elements.

## Setup Instructions

### 1. Get Google Translate API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the "Cloud Translation API"
4. Go to "Credentials" and create an API key
5. Copy the API key

### 2. Add API Key to Environment
Add this line to your `.env` file:
```
REACT_APP_GOOGLE_TRANSLATE_API_KEY=your-google-translate-api-key-here
```

### 3. Features
- **Dynamic Translation**: All pandal data (names, locations, descriptions) are translated in real-time
- **Caching**: Translations are cached to avoid repeated API calls
- **Fallback**: If translation fails, original text is shown
- **Performance**: Only translates when language changes

### 4. Supported Languages
- English (en)
- Hindi (hi) 
- Bengali (bn)

### 5. How It Works
1. When you change language, the app calls Google Translate API
2. Pandal names, locations, and descriptions are translated
3. UI elements use the existing translation system
4. Translations are cached for better performance

### 6. Cost Considerations
- Google Translate API charges per character translated
- The app caches translations to minimize API calls
- Consider setting up billing alerts in Google Cloud Console

### 7. Testing
1. Start the app: `npm start`
2. Switch between languages using the language switcher
3. Notice how pandal names and locations change
4. Check that all UI text is translated

## Troubleshooting
- If translations don't work, check your API key
- Ensure the Google Translate API is enabled in your project
- Check browser console for any error messages
- Verify your API key has proper permissions
