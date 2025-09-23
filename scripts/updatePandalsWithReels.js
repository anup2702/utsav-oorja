// Script to update pandals with Instagram reel URLs
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

// Pandal names and their corresponding Instagram reel URLs
const pandalReels = [
  {
    name: "Chetla Agrani Club",
    reelURL: "https://www.instagram.com/reel/DO7oubOk2lF/?utm_source=ig_web_copy_link"
  },
  {
    name: "Behela Young Men's Association",
    reelURL: "https://www.instagram.com/reel/DO6T8FIE1vj/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    name: "New Town Sarbojanin",
    reelURL: "https://www.instagram.com/reel/DO3IVosk6aE/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    name: "DumDum Park is back with Bharat Chakra",
    reelURL: "https://www.instagram.com/reel/DO2-Puqk6p_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    name: "Kendua Shanti Sangha",
    reelURL: "https://www.instagram.com/reel/DO1rmMTk8bk/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    name: "Dumdum Park Tarun Sangha",
    reelURL: "https://www.instagram.com/reel/DO0hByuEyhR/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    name: "Dakshindari Youths",
    reelURL: "https://www.instagram.com/reel/DOz-NHOk_3Z/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    name: "Uttar Kalikata Sarbojanin",
    reelURL: "https://www.instagram.com/reel/DOyIf2JARYM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    name: "Pratapaditya Road Tricone Park",
    reelURL: "https://www.instagram.com/reel/DOx8esok6Cw/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    name: "Ultodanga Sangrami Club",
    reelURL: "https://www.instagram.com/reel/DOxWRfNE6kN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    name: "Rajdanga Naba Udayan Sangha",
    reelURL: "https://www.instagram.com/reel/DOxXgjcElSC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    name: "Tala Prattoy",
    reelURL: "https://www.instagram.com/reel/DOv34olEz3-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    name: "Chaltabagan Sarbojonin",
    reelURL: "https://www.instagram.com/reel/DOvpun1E7G8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    name: "Kashi Bose Lane Durgotsob",
    reelURL: "https://www.instagram.com/reel/DOu33WNE_jL/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    name: "Samaj Sebi Sangha",
    reelURL: "https://www.instagram.com/reel/DOuu_trE_Lq/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    name: "Arjunpur Amra Sobai Club",
    reelURL: "https://www.instagram.com/reel/DOsJJs0k6N5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    name: "Haridevpur 41 Pally",
    reelURL: "https://www.instagram.com/reel/DOqJCk3kz02/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    name: "Hazra Park Durgotsob",
    reelURL: "https://www.instagram.com/reel/DOpgy8oE89H/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    name: "Tala Barowari Durgotsob",
    reelURL: "https://www.instagram.com/reel/DOnDbtrE5wA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    name: "Kumartuli Park Sarbojanin",
    reelURL: "https://www.instagram.com/reel/DOkgO16kzM8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    name: "Mudiali Club",
    reelURL: "https://www.instagram.com/reel/DOdSXCiE4O2/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  }
];

// Default pandal data template for new pandals
const getDefaultPandalData = (name, reelURL) => ({
  name: name,
  location: "Kolkata, West Bengal", // Default location, can be updated later
  timings: "6:00 AM - 11:00 PM", // Default timings
  mapsLink: `https://maps.google.com/?q=${encodeURIComponent(name + " Kolkata")}`,
  imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Durga+Puja+Pandal", // Default placeholder
  description: `Experience the beautiful Durga Puja celebrations at ${name}. A traditional pandal with modern touches.`,
  crowdStatus: "Medium",
  instagrammableSpots: "Traditional decorations, modern lighting, cultural performances",
  tips: "Visit during evening hours for the best lighting and atmosphere.",
  metroStation: {
    name: "Nearest Metro Station",
    line: "Various",
    distance: "Walking distance",
    walkTime: "5-10 minutes"
  },
  votes: Math.floor(Math.random() * 1000) + 100, // Random votes between 100-1100
  reelURL: reelURL
});

async function updatePandalsWithReels() {
  try {
    console.log('🎬 Starting Instagram reel update for pandals...');
    console.log('📋 This will:');
    console.log('   - Update existing pandals with reel URLs');
    console.log('   - Add new pandals if they don\'t exist');
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
    let notFoundCount = 0;

    // Process each pandal with reel URL
    for (const pandalReel of pandalReels) {
      const pandalName = pandalReel.name;
      const reelURL = pandalReel.reelURL;
      
      if (existingPandals.has(pandalName)) {
        // Update existing pandal with reel URL
        const existingPandal = existingPandals.get(pandalName);
        const updateData = {
          ...existingPandal.data,
          reelURL: reelURL
        };
        
        await updateDoc(doc(db, 'pandals', existingPandal.id), updateData);
        console.log(`✅ Updated: ${pandalName} with reel URL`);
        updatedCount++;
      } else {
        // Add new pandal with reel URL
        const newPandalData = getDefaultPandalData(pandalName, reelURL);
        await addDoc(collection(db, 'pandals'), newPandalData);
        console.log(`➕ Added: ${pandalName} with reel URL`);
        addedCount++;
      }
    }

    console.log('');
    console.log('🎉 Instagram reel update completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Updated existing pandals: ${updatedCount}`);
    console.log(`   - Added new pandals: ${addedCount}`);
    console.log(`   - Total processed: ${pandalReels.length} pandals`);
    console.log('');
    console.log('🎬 All pandals now have Instagram reel functionality!');
    console.log('📱 Users can now view reels directly in the app');

  } catch (error) {
    console.error('❌ Error updating pandals with reels:', error);
  }
}

// Run the update script
updatePandalsWithReels();
