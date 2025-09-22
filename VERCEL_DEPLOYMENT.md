# Vercel Deployment Guide

## Prerequisites
1. Vercel account
2. GitHub repository with your code
3. Environment variables configured

## Environment Variables to Set in Vercel

### Firebase Configuration
```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### Google Analytics
```
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Google Translate API
```
REACT_APP_GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key
```

### Gemini AI API
```
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
```

## Deployment Steps

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - Framework Preset: `Create React App`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

3. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all the environment variables listed above
   - Make sure to set them for Production, Preview, and Development

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be available at the provided Vercel URL

## Analytics Features Added

### Google Analytics 4 (GA4)
- Page view tracking
- Custom event tracking for:
  - Pandal interactions (view, vote, favorite, share)
  - Navigation (tab switches)
  - Metro station clicks
  - Language changes
  - Search and filter usage
  - AI chat interactions
  - Welcome screen interactions
  - Error tracking

### Vercel Analytics
- Performance monitoring
- Real user metrics
- Core Web Vitals tracking
- Automatic deployment analytics

## Post-Deployment Checklist

1. ✅ Verify all environment variables are set
2. ✅ Test Firebase connection
3. ✅ Verify Google Analytics is tracking
4. ✅ Test all app functionality
5. ✅ Check Vercel Analytics dashboard
6. ✅ Test on mobile devices
7. ✅ Verify PWA features work
8. ✅ Test offline functionality

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Enable SSL certificate

## Performance Optimization

The app includes:
- Code splitting
- Image optimization
- Caching headers
- Service worker for offline support
- Lazy loading of components

## Monitoring

- **Vercel Analytics**: Real-time performance metrics
- **Google Analytics**: User behavior and engagement
- **Firebase**: Real-time data and error monitoring
- **Console Logs**: Development debugging

## Troubleshooting

### Common Issues:
1. **Build Failures**: Check environment variables
2. **Firebase Errors**: Verify API keys and project settings
3. **Analytics Not Working**: Ensure GA tracking ID is correct
4. **Performance Issues**: Check Vercel Analytics dashboard

### Support:
- Vercel Documentation: https://vercel.com/docs
- Firebase Documentation: https://firebase.google.com/docs
- Google Analytics: https://support.google.com/analytics
