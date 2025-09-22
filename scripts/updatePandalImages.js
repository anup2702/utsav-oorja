// Script to update pandal imageURLs to use local images from public/images folder
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';

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

// Mapping of pandal names to local image files
const pandalImageMapping = {
  "Kumartuli Park": "/images/kumartulipark-sarbojanin.jpg",
  "College Square": "/images/collegesquare.jpg",
  "Santosh Mitra Square": "/images/santoshmitrasqaure.jpeg",
  "Salt Lake": "/images/ajblock-saltlake-karunamoyee.jpg",
  "New Town": "/images/newtown-sarbojanin.jpg",
  "FD Block Salt Lake": "/images/fdblock-saltlake.jpg",
  "AK Block Karunamoyee": "/images/akblock-karunamoyee.jpg"
};

// Enhanced pandal details with local images and additional information
const pandalDetails = {
  "Kumartuli Park": {
    imageURL: "/images/kumartulipark-sarbojanin.jpg",
    description: "Traditional clay idol making hub with artisan workshops and heritage charm",
    crowdStatus: "High",
    instagrammableSpots: "Traditional clay idol making, artisan workshops, heritage architecture",
    tips: "Visit early morning for best photos and less crowd. Watch artisans at work.",
    metroStation: {
      name: "Shyambazar",
      line: "North-South",
      distance: "0.8 km",
      walkTime: "10 minutes"
    }
  },
  "College Square": {
    imageURL: "/images/collegesquare.jpg",
    description: "Historic pandal with beautiful water reflections and traditional architecture",
    crowdStatus: "High",
    instagrammableSpots: "Reflection in water, traditional architecture, evening lighting",
    tips: "Evening visits offer beautiful lighting for photos. Best time is 6-8 PM.",
    metroStation: {
      name: "Central",
      line: "East-West",
      distance: "0.5 km",
      walkTime: "6 minutes"
    }
  },
  "Santosh Mitra Square": {
    imageURL: "/images/santoshmitrasqaure.jpeg",
    description: "Cultural hub with intricate decorations and traditional performances",
    crowdStatus: "Medium",
    instagrammableSpots: "Intricate decorations, cultural performances, traditional setup",
    tips: "Check for cultural programs in the evening. Less crowded than major pandals.",
    metroStation: {
      name: "Bowbazar",
      line: "East-West",
      distance: "0.3 km",
      walkTime: "4 minutes"
    }
  },
  "Salt Lake": {
    imageURL: "/images/ajblock-saltlake-karunamoyee.jpg",
    description: "Modern pandal in Salt Lake with contemporary themes and spacious setup",
    crowdStatus: "Medium",
    instagrammableSpots: "Modern architecture, spacious setup, contemporary themes",
    tips: "Great for family visits. Parking available nearby. Less crowded than city pandals.",
    metroStation: {
      name: "Karunamoyee",
      line: "Blue",
      distance: "0.2 km",
      walkTime: "3 minutes"
    }
  },
  "New Town": {
    imageURL: "/images/newtown-sarbojanin.jpg",
    description: "Contemporary pandal in New Town with modern design and cultural fusion",
    crowdStatus: "Low",
    instagrammableSpots: "Modern design, cultural fusion, contemporary art",
    tips: "Newer area with modern facilities. Good for photography with less crowd.",
    metroStation: {
      name: "New Town",
      line: "Blue",
      distance: "0.4 km",
      walkTime: "5 minutes"
    }
  },
  "FD Block Salt Lake": {
    imageURL: "/images/fdblock-saltlake.jpg",
    description: "Community pandal in FD Block with local charm and traditional celebrations",
    crowdStatus: "Low",
    instagrammableSpots: "Community spirit, local charm, traditional celebrations",
    tips: "Authentic local experience. Great for understanding community celebrations.",
    metroStation: {
      name: "Karunamoyee",
      line: "Blue",
      distance: "0.6 km",
      walkTime: "8 minutes"
    }
  },
  "AK Block Karunamoyee": {
    imageURL: "/images/akblock-karunamoyee.jpg",
    description: "Vibrant pandal in AK Block with colorful decorations and festive atmosphere",
    crowdStatus: "Medium",
    instagrammableSpots: "Colorful decorations, festive atmosphere, community participation",
    tips: "Vibrant decorations and good community participation. Evening visits recommended.",
    metroStation: {
      name: "Karunamoyee",
      line: "Blue",
      distance: "0.3 km",
      walkTime: "4 minutes"
    }
  }
};

async function updatePandalImages() {
  try {
    console.log('Starting to update pandal images and details...');
    
    // Get all pandals from Firestore
    const pandalsSnapshot = await getDocs(collection(db, 'pandals'));
    
    for (const docSnapshot of pandalsSnapshot.docs) {
      const pandalData = docSnapshot.data();
      const pandalName = pandalData.name;
      
      // Check if we have updated details for this pandal
      if (pandalDetails[pandalName]) {
        const updates = pandalDetails[pandalName];
        
        // Update the document with new details
        await updateDoc(doc(db, 'pandals', docSnapshot.id), updates);
        console.log(`✅ Updated: ${pandalName} with local image and enhanced details`);
      } else {
        console.log(`⚠️  No updates found for: ${pandalName}`);
      }
    }
    
    console.log('🎉 Successfully updated pandal images and details!');
    console.log('\n📋 Summary of updates:');
    console.log('- Updated imageURLs to use local images from /images/ folder');
    console.log('- Added detailed descriptions for each pandal');
    console.log('- Enhanced crowd status information');
    console.log('- Added Instagram-worthy spots');
    console.log('- Included helpful tips for visitors');
    console.log('- Added metro station information with distances and walk times');
    
  } catch (error) {
    console.error('❌ Error updating pandal images:', error);
  }
}

// Run the update script
updatePandalImages();
