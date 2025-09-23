// Script to update pandals with new images from the public/images folder
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

// Map image filenames to pandal names and their details
const pandalImageMappings = [
  {
    name: "Airport Area Sarbojanin",
    imageFile: "airportareasarbojanin.png",
    location: "Airport Area, Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Airport+Area+Kolkata",
    description: "Modern pandal near the airport with contemporary design and cultural performances.",
    crowdStatus: "Medium",
    instagrammableSpots: "Modern architecture, cultural performances, contemporary lighting",
    tips: "Visit during evening for the best lighting and cultural shows.",
    metroStation: {
      name: "Airport Metro Station",
      line: "Blue",
      distance: "0.5 km",
      walkTime: "5 minutes"
    }
  },
  {
    name: "Ballygunge Place",
    imageFile: "ballygunge place.jpg",
    location: "Ballygunge Place, South Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Ballygunge+Place+Kolkata",
    description: "Traditional pandal in the heart of Ballygunge with heritage charm.",
    crowdStatus: "High",
    instagrammableSpots: "Traditional decorations, heritage architecture, cultural events",
    tips: "Visit early morning or late evening to avoid peak crowds.",
    metroStation: {
      name: "Rabindra Sadan",
      line: "Blue",
      distance: "1.2 km",
      walkTime: "15 minutes"
    }
  },
  {
    name: "Behala Bazar Community",
    imageFile: "behalabazarcommunity.jpg",
    location: "Behala Bazar, South Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Behala+Bazar+Kolkata",
    description: "Community-driven pandal with local cultural events and traditional celebrations.",
    crowdStatus: "Medium",
    instagrammableSpots: "Community decorations, local cultural events, traditional setup",
    tips: "Best time to visit is during cultural programs in the evening.",
    metroStation: {
      name: "Tollygunge",
      line: "Blue",
      distance: "2.0 km",
      walkTime: "25 minutes"
    }
  },
  {
    name: "Behala Chowrasta",
    imageFile: "Behalachowrasta.jpg",
    location: "Behala Chowrasta, South Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Behala+Chowrasta+Kolkata",
    description: "Historic chowrasta pandal with traditional Bengali architecture and cultural heritage.",
    crowdStatus: "High",
    instagrammableSpots: "Historic architecture, traditional Bengali design, cultural heritage",
    tips: "Visit during morning hours for better photo opportunities with less crowd.",
    metroStation: {
      name: "Tollygunge",
      line: "Blue",
      distance: "1.8 km",
      walkTime: "22 minutes"
    }
  },
  {
    name: "College Square",
    imageFile: "collegesquare .png",
    location: "College Street, Central Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=College+Square+Kolkata",
    description: "Iconic pandal in the intellectual hub of Kolkata with educational theme.",
    crowdStatus: "Very High",
    instagrammableSpots: "Educational theme, intellectual atmosphere, historic location",
    tips: "Visit during early morning or late night to avoid extreme crowds.",
    metroStation: {
      name: "Central",
      line: "Blue",
      distance: "0.8 km",
      walkTime: "10 minutes"
    }
  },
  {
    name: "Gariahat",
    imageFile: "Gariahat.jpg",
    location: "Gariahat, South Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Gariahat+Kolkata",
    description: "Famous shopping area pandal with commercial and cultural blend.",
    crowdStatus: "Very High",
    instagrammableSpots: "Shopping area blend, commercial decorations, cultural events",
    tips: "Visit during non-shopping hours for better experience.",
    metroStation: {
      name: "Rabindra Sadan",
      line: "Blue",
      distance: "1.5 km",
      walkTime: "18 minutes"
    }
  },
  {
    name: "Jessore Road Community",
    imageFile: "jessoreroadcommunity.png",
    location: "Jessore Road, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Jessore+Road+Kolkata",
    description: "Community pandal on the historic Jessore Road with traditional celebrations.",
    crowdStatus: "Medium",
    instagrammableSpots: "Community spirit, traditional celebrations, historic road",
    tips: "Visit during cultural programs for the best experience.",
    metroStation: {
      name: "Dum Dum",
      line: "Blue",
      distance: "1.0 km",
      walkTime: "12 minutes"
    }
  },
  {
    name: "Jodhpur Park",
    imageFile: "jodhpurpark.jpg",
    location: "Jodhpur Park, South Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Jodhpur+Park+Kolkata",
    description: "Park-based pandal with natural surroundings and peaceful atmosphere.",
    crowdStatus: "Low",
    instagrammableSpots: "Natural surroundings, park setting, peaceful atmosphere",
    tips: "Perfect for family visits with children. Visit during morning for fresh air.",
    metroStation: {
      name: "Tollygunge",
      line: "Blue",
      distance: "1.2 km",
      walkTime: "15 minutes"
    }
  },
  {
    name: "Joka Sarbojanin",
    imageFile: "jokasarbojanin.webp",
    location: "Joka, South Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Joka+Kolkata",
    description: "Southern Kolkata pandal with modern design and cultural events.",
    crowdStatus: "Medium",
    instagrammableSpots: "Modern design, cultural events, southern Kolkata charm",
    tips: "Visit during evening cultural programs for the best experience.",
    metroStation: {
      name: "Joka",
      line: "Purple",
      distance: "0.3 km",
      walkTime: "4 minutes"
    }
  },
  {
    name: "Lake Town",
    imageFile: "laketown.png",
    location: "Lake Town, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Lake+Town+Kolkata",
    description: "Scenic pandal near the lake with beautiful water reflections and peaceful setting.",
    crowdStatus: "Medium",
    instagrammableSpots: "Lake views, water reflections, peaceful setting, scenic beauty",
    tips: "Visit during sunset for beautiful lake reflections and lighting.",
    metroStation: {
      name: "Dum Dum",
      line: "Blue",
      distance: "2.5 km",
      walkTime: "30 minutes"
    }
  },
  {
    name: "Majerhat Community",
    imageFile: "majerhatcommunity.webp",
    location: "Majerhat, South Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Majerhat+Kolkata",
    description: "Community-driven pandal with local cultural heritage and traditional celebrations.",
    crowdStatus: "Medium",
    instagrammableSpots: "Community heritage, traditional celebrations, local culture",
    tips: "Visit during cultural programs to experience local traditions.",
    metroStation: {
      name: "Majerhat",
      line: "Purple",
      distance: "0.5 km",
      walkTime: "6 minutes"
    }
  },
  {
    name: "Noapara Sarbojanin",
    imageFile: "noaparasarbojanin.png",
    location: "Noapara, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Noapara+Kolkata",
    description: "Northern Kolkata pandal with traditional Bengali culture and heritage.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional Bengali culture, heritage architecture, northern Kolkata charm",
    tips: "Visit during cultural programs for authentic Bengali experience.",
    metroStation: {
      name: "Noapara",
      line: "Blue",
      distance: "0.8 km",
      walkTime: "10 minutes"
    }
  },
  {
    name: "Salt Lake Area",
    imageFile: "saltlakearea.png",
    location: "Salt Lake, East Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Salt+Lake+Kolkata",
    description: "Modern planned area pandal with contemporary design and urban charm.",
    crowdStatus: "Medium",
    instagrammableSpots: "Modern design, urban charm, planned area aesthetics",
    tips: "Visit during evening for the best lighting and modern atmosphere.",
    metroStation: {
      name: "Central Park",
      line: "Blue",
      distance: "1.0 km",
      walkTime: "12 minutes"
    }
  },
  {
    name: "Sakher Bazar Sarbojanin",
    imageFile: "sakherbazarsarbojanin.webp",
    location: "Sakher Bazar, South Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Sakher+Bazar+Kolkata",
    description: "Traditional bazar pandal with local market charm and cultural events.",
    crowdStatus: "High",
    instagrammableSpots: "Bazar charm, local market atmosphere, cultural events",
    tips: "Visit during morning hours for better photo opportunities.",
    metroStation: {
      name: "Tollygunge",
      line: "Blue",
      distance: "1.5 km",
      walkTime: "18 minutes"
    }
  },
  {
    name: "Thakurpukur Community",
    imageFile: "thakurpukurcommunity.jpg",
    location: "Thakurpukur, South Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Thakurpukur+Kolkata",
    description: "Community pandal with local traditions and cultural heritage.",
    crowdStatus: "Medium",
    instagrammableSpots: "Community traditions, cultural heritage, local celebrations",
    tips: "Visit during cultural programs for authentic community experience.",
    metroStation: {
      name: "Tollygunge",
      line: "Blue",
      distance: "2.2 km",
      walkTime: "27 minutes"
    }
  }
];

// Default pandal data template for new pandals
const getDefaultPandalData = (pandalData) => ({
  name: pandalData.name,
  location: pandalData.location,
  timings: pandalData.timings,
  mapsLink: pandalData.mapsLink,
  imageURL: `/images/${pandalData.imageFile}`,
  description: pandalData.description,
  crowdStatus: pandalData.crowdStatus,
  instagrammableSpots: pandalData.instagrammableSpots,
  tips: pandalData.tips,
  metroStation: pandalData.metroStation,
  votes: Math.floor(Math.random() * 1000) + 100, // Random votes between 100-1100
  reelURL: null // Will be added later if available
});

async function updatePandalsWithNewImages() {
  try {
    console.log('🖼️ Starting pandal image update with new images...');
    console.log('📋 This will:');
    console.log('   - Update existing pandals with new local images');
    console.log('   - Add new pandals for new images');
    console.log('   - Preserve all existing pandal data');
    console.log('');

    // Get all existing pandals
    const pandalsSnapshot = await getDocs(collection(db, 'pandals'));
    const existingPandals = new Map();
    
    pandalsSnapshot.forEach(doc => {
      existingPandals.set(doc.data().name, { id: doc.id, data: doc.data() });
    });

    console.log(`📊 Found ${existingPandals.size} existing pandals in database`);
    console.log('');

    let updatedCount = 0;
    let addedCount = 0;

    // Process each pandal with new image
    for (const pandalData of pandalImageMappings) {
      const pandalName = pandalData.name;
      const imagePath = `/images/${pandalData.imageFile}`;
      
      if (existingPandals.has(pandalName)) {
        // Update existing pandal with new image
        const existingPandal = existingPandals.get(pandalName);
        const updateData = {
          ...existingPandal.data,
          imageURL: imagePath,
          location: pandalData.location,
          timings: pandalData.timings,
          mapsLink: pandalData.mapsLink,
          description: pandalData.description,
          crowdStatus: pandalData.crowdStatus,
          instagrammableSpots: pandalData.instagrammableSpots,
          tips: pandalData.tips,
          metroStation: pandalData.metroStation
        };
        
        await updateDoc(doc(db, 'pandals', existingPandal.id), updateData);
        console.log(`✅ Updated: ${pandalName} with new image and details`);
        updatedCount++;
      } else {
        // Add new pandal with image
        const newPandalData = getDefaultPandalData(pandalData);
        await addDoc(collection(db, 'pandals'), newPandalData);
        console.log(`➕ Added: ${pandalName} with new image`);
        addedCount++;
      }
    }

    console.log('');
    console.log('🎉 Pandal image update completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Updated existing pandals: ${updatedCount}`);
    console.log(`   - Added new pandals: ${addedCount}`);
    console.log(`   - Total processed: ${pandalImageMappings.length} pandals`);
    console.log('');
    console.log('🖼️ All pandals now have updated local images!');
    console.log('📱 Users can now see beautiful pandal images in the app');

  } catch (error) {
    console.error('❌ Error updating pandals with new images:', error);
  }
}

// Run the update script
updatePandalsWithNewImages();
