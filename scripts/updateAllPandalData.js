// Comprehensive script to update all pandal data with local images and enhanced details
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, addDoc, query, where } from 'firebase/firestore';

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

// Complete pandal data with local images
const completePandalData = [
  {
    name: "Kumartuli Park Sarbojanin",
    location: "Kumartuli, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Kumartuli+Park+Kolkata",
    imageURL: "/images/kumartulipark-sarbojanin.jpg",
    description: "Traditional clay idol making hub with artisan workshops and heritage charm. Experience the authentic process of Durga idol creation.",
    crowdStatus: "High",
    instagrammableSpots: "Traditional clay idol making, artisan workshops, heritage architecture, working artisans",
    tips: "Visit early morning for best photos and less crowd. Watch artisans at work. Best time: 7-9 AM.",
    metroStation: {
      name: "Shyambazar",
      line: "North-South",
      distance: "0.8 km",
      walkTime: "10 minutes"
    },
    votes: 1250
  },
  {
    name: "College Square Sarbojanin",
    location: "College Street, Central Kolkata",
    timings: "5:30 AM - 12:00 AM",
    mapsLink: "https://maps.google.com/?q=College+Square+Kolkata",
    imageURL: "/images/collegesquare.jpg",
    description: "Historic pandal with beautiful water reflections and traditional architecture. One of the most iconic pandals in Kolkata.",
    crowdStatus: "High",
    instagrammableSpots: "Reflection in water, traditional architecture, evening lighting, historic setting",
    tips: "Evening visits offer beautiful lighting for photos. Best time is 6-8 PM. Very crowded during peak hours.",
    metroStation: {
      name: "Central",
      line: "East-West",
      distance: "0.5 km",
      walkTime: "6 minutes"
    },
    votes: 1180
  },
  {
    name: "Santosh Mitra Square",
    location: "Bowbazar, Central Kolkata",
    timings: "6:00 AM - 11:30 PM",
    mapsLink: "https://maps.google.com/?q=Santosh+Mitra+Square+Kolkata",
    imageURL: "/images/santoshmitrasqaure.jpeg",
    description: "Cultural hub with intricate decorations and traditional performances. Known for its artistic themes and cultural programs.",
    crowdStatus: "Medium",
    instagrammableSpots: "Intricate decorations, cultural performances, traditional setup, artistic themes",
    tips: "Check for cultural programs in the evening. Less crowded than major pandals. Good for photography.",
    metroStation: {
      name: "Bowbazar",
      line: "East-West",
      distance: "0.3 km",
      walkTime: "4 minutes"
    },
    votes: 1100
  },
  {
    name: "AJ Block Salt Lake Karunamoyee",
    location: "AJ Block, Salt Lake, East Kolkata",
    timings: "5:00 AM - 12:00 AM",
    mapsLink: "https://maps.google.com/?q=AJ+Block+Salt+Lake+Kolkata",
    imageURL: "/images/ajblock-saltlake-karunamoyee.jpg",
    description: "Modern pandal in Salt Lake with contemporary themes and spacious setup. Features innovative designs and community participation.",
    crowdStatus: "Medium",
    instagrammableSpots: "Modern architecture, spacious setup, contemporary themes, innovative designs",
    tips: "Great for family visits. Parking available nearby. Less crowded than city pandals. Good for children.",
    metroStation: {
      name: "Karunamoyee",
      line: "Blue",
      distance: "0.2 km",
      walkTime: "3 minutes"
    },
    votes: 950
  },
  {
    name: "New Town Sarbojanin",
    location: "New Town, North 24 Parganas",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=New+Town+Kolkata",
    imageURL: "/images/newtown-sarbojanin.jpg",
    description: "Contemporary pandal in New Town with modern design and cultural fusion. Showcases the new face of Kolkata's Durga Puja celebrations.",
    crowdStatus: "Low",
    instagrammableSpots: "Modern design, cultural fusion, contemporary art, new age architecture",
    tips: "Newer area with modern facilities. Good for photography with less crowd. Family-friendly environment.",
    metroStation: {
      name: "New Town",
      line: "Blue",
      distance: "0.4 km",
      walkTime: "5 minutes"
    },
    votes: 850
  },
  {
    name: "FD Block Salt Lake",
    location: "FD Block, Salt Lake, East Kolkata",
    timings: "6:00 AM - 11:30 PM",
    mapsLink: "https://maps.google.com/?q=FD+Block+Salt+Lake+Kolkata",
    imageURL: "/images/fdblock-saltlake.jpg",
    description: "Community pandal in FD Block with local charm and traditional celebrations. Emphasizes community participation and local culture.",
    crowdStatus: "Low",
    instagrammableSpots: "Community spirit, local charm, traditional celebrations, neighborhood participation",
    tips: "Authentic local experience. Great for understanding community celebrations. Less commercialized.",
    metroStation: {
      name: "Karunamoyee",
      line: "Blue",
      distance: "0.6 km",
      walkTime: "8 minutes"
    },
    votes: 750
  },
  {
    name: "AK Block Karunamoyee",
    location: "AK Block, Salt Lake, East Kolkata",
    timings: "5:30 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=AK+Block+Salt+Lake+Kolkata",
    imageURL: "/images/akblock-karunamoyee.jpg",
    description: "Vibrant pandal in AK Block with colorful decorations and festive atmosphere. Known for its enthusiastic community participation.",
    crowdStatus: "Medium",
    instagrammableSpots: "Colorful decorations, festive atmosphere, community participation, vibrant themes",
    tips: "Vibrant decorations and good community participation. Evening visits recommended. Great for family photos.",
    metroStation: {
      name: "Karunamoyee",
      line: "Blue",
      distance: "0.3 km",
      walkTime: "4 minutes"
    },
    votes: 800
  }
];

async function updateAllPandalData() {
  try {
    console.log('🚀 Starting comprehensive pandal data update...');
    console.log('📋 This will:');
    console.log('   - Update existing pandals with local images');
    console.log('   - Add new pandals matching the images');
    console.log('   - Enhance all pandals with detailed information');
    console.log('');

    // Get all existing pandals
    const pandalsSnapshot = await getDocs(collection(db, 'pandals'));
    const existingPandals = new Map();
    
    pandalsSnapshot.forEach(doc => {
      existingPandals.set(doc.data().name, { id: doc.id, data: doc.data() });
    });

    let updatedCount = 0;
    let addedCount = 0;

    // Process each pandal in our complete data
    for (const pandalData of completePandalData) {
      const pandalName = pandalData.name;
      
      if (existingPandals.has(pandalName)) {
        // Update existing pandal
        const existingPandal = existingPandals.get(pandalName);
        await updateDoc(doc(db, 'pandals', existingPandal.id), pandalData);
        console.log(`✅ Updated: ${pandalName}`);
        updatedCount++;
      } else {
        // Add new pandal
        await addDoc(collection(db, 'pandals'), pandalData);
        console.log(`➕ Added: ${pandalName}`);
        addedCount++;
      }
    }

    console.log('');
    console.log('🎉 Pandal data update completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Updated: ${updatedCount} pandals`);
    console.log(`   - Added: ${addedCount} new pandals`);
    console.log(`   - Total processed: ${completePandalData.length} pandals`);
    console.log('');
    console.log('🖼️  All pandals now use local images from /images/ folder');
    console.log('📝 Enhanced with detailed descriptions, tips, and metro information');
    console.log('🎯 Ready for production deployment!');

  } catch (error) {
    console.error('❌ Error updating pandal data:', error);
  }
}

// Run the comprehensive update
updateAllPandalData();
