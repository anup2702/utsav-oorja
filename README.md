# Kolkata Durga Puja 2025 Pandals 🎭

A beautiful, feature-rich web application for exploring Kolkata's most popular Durga Puja pandals with real-time voting, filtering, and crowd status updates.

## ✨ Enhanced Features

### 🎨 **UI/UX Improvements**
- **Festive-themed header** with animated Durga Puja decorations
- **Enhanced PandalCard** with hover effects, gradient borders, and smooth animations
- **Responsive grid layout** optimized for mobile, tablet, and desktop
- **Visual vote count** with animated heart icons and bounce effects
- **Gradient backgrounds** and modern card designs

### 🔍 **Filtering & Sorting**
- **Search functionality** by pandal name or location
- **Area-based filtering** with dropdown selection
- **Multiple sorting options**: Most Popular, Least Popular, Name A-Z, Name Z-A
- **Active filters display** with easy clear options
- **Real-time results** with count indicators

### 👥 **Live Crowd Updates**
- **Crowd status badges** (Low/Medium/High) with color coding
- **Real-time crowd information** for better planning
- **Visual indicators** for crowd levels

### 📸 **Additional Information**
- **Instagrammable spots** highlighting for each pandal
- **Pro tips** section with helpful visit information
- **Enhanced location details** with better formatting

### ⚡ **Performance & Feedback**
- **Loading spinners** with festive styling
- **Smooth animations** for card loading and voting
- **Error handling** with user-friendly messages
- **Optimistic UI updates** for better user experience
- **Fade-in animations** for card appearance

### 🏛️ **Core Features**
- Browse 20+ popular Kolkata pandals
- Real-time voting system with animations
- Direct Google Maps integration
- Mobile-friendly responsive design
- Real-time updates with Firebase Firestore
- Beautiful UI with Tailwind CSS

## Tech Stack

- **Frontend**: React 18 with functional components
- **Styling**: Tailwind CSS
- **Backend**: Firebase Firestore
- **Hosting**: Firebase Hosting
- **Real-time**: Firebase Firestore real-time listeners

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Copy your Firebase configuration
4. Update `src/firebase.js` with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id"
};
```

### 3. Populate Sample Data

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize Firebase in your project: `firebase init`
4. Run the data population script:

```bash
node scripts/populateData.js
```

### 4. Run Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

### 5. Deploy to Firebase Hosting

```bash
npm run build
firebase deploy
```

## Project Structure

```
kolkata/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── PandalCard.jsx
│   ├── App.jsx
│   ├── firebase.js
│   ├── index.js
│   └── index.css
├── scripts/
│   └── populateData.js
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Firestore Collection Structure

The app uses a `pandals` collection with the following enhanced document structure:

```javascript
{
  name: "Pandal Name",
  location: "Area, Kolkata",
  timings: "6:00 AM - 11:00 PM",
  mapsLink: "https://maps.google.com/...",
  imageURL: "https://images.unsplash.com/...",
  votes: 1250,
  crowdStatus: "High", // Low, Medium, High
  instagrammableSpots: "Traditional clay idol making, artisan workshops",
  tips: "Visit early morning for best photos and less crowd"
}
```

## Features in Detail

### 🎨 **Enhanced UI/UX**
- **Festive header** with animated emojis and gradient backgrounds
- **Card animations** with hover effects, scaling, and smooth transitions
- **Vote animations** with bouncing hearts and pulse effects
- **Loading states** with custom spinners and festive styling
- **Gradient borders** and modern card designs

### 🔍 **Advanced Filtering**
- **Search by name or location** with real-time filtering
- **Area-based filtering** with dynamic dropdown population
- **Multiple sort options** including popularity and alphabetical
- **Active filter display** with easy removal options
- **Results counter** showing filtered vs total pandals

### 👥 **Crowd Status System**
- **Color-coded badges** (Green: Low, Yellow: Medium, Red: High)
- **Real-time crowd updates** for better visit planning
- **Visual indicators** for crowd levels

### 📸 **Rich Content**
- **Instagrammable spots** highlighting photo opportunities
- **Pro tips** with visit recommendations and timing advice
- **Enhanced information display** with better formatting

### ⚡ **Performance Optimizations**
- **Real-time voting** with optimistic UI updates
- **Smooth animations** for all interactions
- **Efficient filtering** with useMemo optimization
- **Responsive design** that works on all devices
- **Error handling** with user-friendly messages

## Customization

### Adding New Pandals
1. Add documents to the `pandals` collection in Firestore
2. Follow the document structure above
3. Use high-quality images for better visual appeal

### Styling
- Modify `tailwind.config.js` for custom colors
- Update component styles in individual `.jsx` files
- Custom CSS can be added to `src/index.css`

## Deployment

The app is configured for Firebase Hosting with:
- Single Page Application routing
- Optimized build process
- CDN distribution

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

---

Made with ❤️ for Kolkata Durga Puja 2025
