// Script to add Beliaghata 33 Pally pandal with Instagram reel
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQEJpWNnM60tEDsjLo3iFArRIeJRhQRgI",
  authDomain: "durgapuja-dc996.firebaseapp.com",
  projectId: "durgapuja-dc996",
  storageBucket: "durgapuja-dc996.firebasestorage.app",
  messagingSenderId: "599154572247",
  appId: "1:599154572247:web:7a8f806da9987e879de992",
  measurementId: "G-LD6R89L7TS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Beliaghata 33 Pally pandal data
const beliaghataPandal = {
  name: "Beliaghata 33 Pally",
  location: "Beliaghata, East Kolkata",
  timings: "6:00 AM - 11:00 PM",
  mapsLink: "https://maps.google.com/?q=Beliaghata+Kolkata",
  imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Beliaghata+33+Pally",
  description: "Traditional community pandal in Beliaghata with local cultural heritage and neighborhood celebrations.",
  crowdStatus: "Medium",
  instagrammableSpots: "Traditional community decorations, local cultural events, neighborhood charm",
  tips: "Visit during cultural programs for authentic community experience. Best time is evening for cultural shows.",
  metroStation: {
    name: "Sealdah",
    line: "Blue",
    distance: "1.5 km",
    walkTime: "18 minutes"
  },
  votes: Math.floor(Math.random() * 1000) + 100, // Random votes between 100-1100
  reelURL: "https://www.instagram.com/reel/DO3duFVCUCy/?igsh=eXh1cDNubnJyNW9z"
};

async function addBeliaghataPandal() {
  try {
    console.log('🏘️ Adding Beliaghata 33 Pally pandal...');
    console.log('📋 This will:');
    console.log('   - Add new pandal with Instagram reel');
    console.log('   - Include comprehensive details');
    console.log('   - Set up metro information');
    console.log('');

    // Add the new pandal
    await addDoc(collection(db, 'pandals'), beliaghataPandal);
    
    console.log('✅ Successfully added: Beliaghata 33 Pally');
    console.log('🎬 Instagram reel URL added');
    console.log('📍 Location: Beliaghata, East Kolkata');
    console.log('🚇 Nearest Metro: Sealdah (Blue Line)');
    console.log('📱 Users can now view the reel directly in the app!');

  } catch (error) {
    console.error('❌ Error adding Beliaghata 33 Pally pandal:', error);
  }
}

// Run the script
addBeliaghataPandal();
