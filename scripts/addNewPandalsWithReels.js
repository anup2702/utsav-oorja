// Script to add new pandals with Instagram reels
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

// New pandals data with Instagram reels
const newPandals = [
  {
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
    votes: Math.floor(Math.random() * 1000) + 100,
    reelURL: "https://www.instagram.com/reel/DO3duFVCUCy/?igsh=eXh1cDNubnJyNW9z"
  },
  {
    name: "Naktala Udayan Sangha",
    location: "Naktala, South Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Naktala+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Naktala+Udayan+Sangha",
    description: "Community-driven pandal in Naktala with traditional Bengali culture and local celebrations.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional Bengali culture, community celebrations, local heritage",
    tips: "Visit during cultural programs for authentic Bengali experience. Best time is evening for cultural shows.",
    metroStation: {
      name: "Tollygunge",
      line: "Blue",
      distance: "2.0 km",
      walkTime: "25 minutes"
    },
    votes: Math.floor(Math.random() * 1000) + 100,
    reelURL: "https://www.instagram.com/reel/DO6IZJsj0tc/?igsh=MW5rYWh2ZDYxNTF4Ng=="
  },
  {
    name: "Shreebhumi",
    location: "Shreebhumi, Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Shreebhumi+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Shreebhumi",
    description: "Modern pandal in Shreebhumi with contemporary design and cultural events.",
    crowdStatus: "Medium",
    instagrammableSpots: "Modern design, contemporary architecture, cultural events",
    tips: "Visit during evening for the best lighting and cultural atmosphere.",
    metroStation: {
      name: "Nearest Metro Station",
      line: "Various",
      distance: "Walking distance",
      walkTime: "5-10 minutes"
    },
    votes: Math.floor(Math.random() * 1000) + 100,
    reelURL: "https://www.instagram.com/reel/DOkJddfkuQ2/?igsh=cW90bXBnZ28xa2E="
  },
  {
    name: "Chaltabagan Sarbojanin",
    location: "Chaltabagan, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Chaltabagan+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Chaltabagan+Sarbojanin",
    description: "Traditional Sarbojanin pandal in Chaltabagan with heritage architecture and cultural celebrations.",
    crowdStatus: "High",
    instagrammableSpots: "Heritage architecture, traditional Sarbojanin celebrations, cultural heritage",
    tips: "Visit during cultural programs for authentic Sarbojanin experience. Best time is evening for cultural shows.",
    metroStation: {
      name: "Shyambazar",
      line: "North-South",
      distance: "1.2 km",
      walkTime: "15 minutes"
    },
    votes: Math.floor(Math.random() * 1000) + 100,
    reelURL: "https://www.instagram.com/reel/DOtW9MuEmSP/?igsh=MXRnczgxMndwNjdvZA=="
  },
  {
    name: "Rajdanga Naba Uday",
    location: "Rajdanga, East Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Rajdanga+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Rajdanga+Naba+Uday",
    description: "Community pandal in Rajdanga with traditional celebrations and local cultural events.",
    crowdStatus: "Medium",
    instagrammableSpots: "Community celebrations, traditional events, local culture",
    tips: "Visit during cultural programs for authentic community experience. Best time is evening for cultural shows.",
    metroStation: {
      name: "Sealdah",
      line: "Blue",
      distance: "2.0 km",
      walkTime: "25 minutes"
    },
    votes: Math.floor(Math.random() * 1000) + 100,
    reelURL: "https://www.instagram.com/reel/DOv6tAekne4/?igsh=dTNidDJlam0xZHY3"
  },
  {
    name: "Kashibose Lane",
    location: "Kashibose Lane, Central Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Kashibose+Lane+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Kashibose+Lane",
    description: "Historic lane pandal with traditional Bengali architecture and cultural heritage.",
    crowdStatus: "Medium",
    instagrammableSpots: "Historic lane architecture, traditional Bengali design, cultural heritage",
    tips: "Visit during morning hours for better photo opportunities. Best time is evening for cultural programs.",
    metroStation: {
      name: "Central",
      line: "Blue",
      distance: "1.0 km",
      walkTime: "12 minutes"
    },
    votes: Math.floor(Math.random() * 1000) + 100,
    reelURL: "https://www.instagram.com/reel/DOujy2GEnd4/?igsh=dDczbDB3NDc2dzQ="
  },
  {
    name: "Kendua Shanti Sangha",
    location: "Kendua, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Kendua+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Kendua+Shanti+Sangha",
    description: "Peaceful community pandal in Kendua with traditional celebrations and cultural harmony.",
    crowdStatus: "Low",
    instagrammableSpots: "Peaceful atmosphere, traditional celebrations, community harmony",
    tips: "Perfect for family visits. Visit during cultural programs for authentic community experience.",
    metroStation: {
      name: "Dum Dum",
      line: "Blue",
      distance: "1.5 km",
      walkTime: "18 minutes"
    },
    votes: Math.floor(Math.random() * 1000) + 100,
    reelURL: "https://www.instagram.com/reel/DOwXLTykk9Y/?igsh=ZHhqbHduM3NmajI0"
  },
  {
    name: "Ballygunge Cultural",
    location: "Ballygunge, South Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Ballygunge+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Ballygunge+Cultural",
    description: "Cultural pandal in Ballygunge with artistic decorations and cultural performances.",
    crowdStatus: "High",
    instagrammableSpots: "Artistic decorations, cultural performances, modern design",
    tips: "Visit during cultural programs for the best experience. Best time is evening for performances.",
    metroStation: {
      name: "Rabindra Sadan",
      line: "Blue",
      distance: "1.0 km",
      walkTime: "12 minutes"
    },
    votes: Math.floor(Math.random() * 1000) + 100,
    reelURL: "https://www.instagram.com/reel/DO8NxMBkhq6/?igsh=MTV2NzlvaXRnbjAxMA=="
  },
  {
    name: "Lalabagan Nabankur",
    location: "Lalabagan, Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Lalabagan+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Lalabagan+Nabankur",
    description: "Community pandal in Lalabagan with traditional celebrations and cultural events.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional celebrations, community events, cultural heritage",
    tips: "Visit during cultural programs for authentic community experience. Best time is evening for cultural shows.",
    metroStation: {
      name: "Nearest Metro Station",
      line: "Various",
      distance: "Walking distance",
      walkTime: "5-10 minutes"
    },
    votes: Math.floor(Math.random() * 1000) + 100,
    reelURL: "https://www.instagram.com/reel/DO5kcelkm0-/?igsh=b25oYmg2cjFuZTR2"
  },
  {
    name: "Deshapriya Park",
    location: "Deshapriya Park, South Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Deshapriya+Park+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Deshapriya+Park",
    description: "Park-based pandal in Deshapriya Park with natural surroundings and cultural events.",
    crowdStatus: "Medium",
    instagrammableSpots: "Natural park setting, cultural events, peaceful atmosphere",
    tips: "Perfect for family visits. Visit during morning for fresh air and evening for cultural programs.",
    metroStation: {
      name: "Rabindra Sadan",
      line: "Blue",
      distance: "1.5 km",
      walkTime: "18 minutes"
    },
    votes: Math.floor(Math.random() * 1000) + 100,
    reelURL: "https://www.instagram.com/reel/DO3d3-zCe0M/?igsh=MXFyZWo5aTZjNnVpZg=="
  },
  {
    name: "Suruchi Sangha",
    location: "Suruchi Sangha, Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Suruchi+Sangha+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Suruchi+Sangha",
    description: "Traditional Sangha pandal with cultural heritage and community celebrations.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional Sangha celebrations, cultural heritage, community spirit",
    tips: "Visit during cultural programs for authentic Sangha experience. Best time is evening for cultural shows.",
    metroStation: {
      name: "Nearest Metro Station",
      line: "Various",
      distance: "Walking distance",
      walkTime: "5-10 minutes"
    },
    votes: Math.floor(Math.random() * 1000) + 100,
    reelURL: "https://www.instagram.com/reel/DO5w4Dkk8XO/?igsh=czZlZDdudWwwOTV1"
  },
  {
    name: "Santosh Mitra Squares",
    location: "Santosh Mitra Square, Central Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Santosh+Mitra+Square+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Santosh+Mitra+Squares",
    description: "Historic square pandal with traditional architecture and cultural celebrations.",
    crowdStatus: "High",
    instagrammableSpots: "Historic square architecture, traditional celebrations, cultural heritage",
    tips: "Visit during cultural programs for authentic experience. Best time is evening for cultural shows.",
    metroStation: {
      name: "Central",
      line: "Blue",
      distance: "0.8 km",
      walkTime: "10 minutes"
    },
    votes: Math.floor(Math.random() * 1000) + 100,
    reelURL: "https://www.instagram.com/reel/DO6WYmUE9xu/?igsh=NXo3aWh5YXA2bmk4"
  }
];

async function addNewPandalsWithReels() {
  try {
    console.log('🎬 Adding new pandals with Instagram reels...');
    console.log('📋 This will:');
    console.log('   - Add new pandals with Instagram reel URLs');
    console.log('   - Include comprehensive details');
    console.log('   - Set up metro information');
    console.log('');

    let addedCount = 0;

    // Add each new pandal
    for (const pandal of newPandals) {
      await addDoc(collection(db, 'pandals'), pandal);
      console.log(`✅ Added: ${pandal.name}`);
      console.log(`   📍 Location: ${pandal.location}`);
      console.log(`   🎬 Reel URL: ${pandal.reelURL ? 'Available' : 'Not available'}`);
      console.log(`   🚇 Metro: ${pandal.metroStation.name} (${pandal.metroStation.line} Line)`);
      console.log('');
      addedCount++;
    }

    console.log('🎉 Successfully added all new pandals!');
    console.log(`📊 Summary:`);
    console.log(`   - Added: ${addedCount} new pandals`);
    console.log(`   - All pandals have Instagram reel URLs`);
    console.log('📱 Users can now view reels directly in the app!');

  } catch (error) {
    console.error('❌ Error adding new pandals:', error);
  }
}

// Run the script
addNewPandalsWithReels();
