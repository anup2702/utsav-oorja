// Script to update existing pandals with new fields: crowdStatus, instagrammableSpots, tips
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQEJpWNnM60tEDsjLo3iFArRIeJRhQRgI",
  authDomain: "durgapuja-dc996.firebaseapp.com",
  projectId: "durgapuja-dc996",
  storageBucket: "durgapuja-dc996.firebasestorage.app",
  messagingSenderId: "599154572247",
  appId: "1:599154572247:web:6a8f806da9987e879de992",
  measurementId: "G-LD6R89L7TS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample data for new fields
const pandalEnhancements = {
  "Kumartuli Park": {
    crowdStatus: "High",
    instagrammableSpots: "Traditional clay idol making, artisan workshops",
    tips: "Visit early morning for best photos and less crowd"
  },
  "College Square": {
    crowdStatus: "High",
    instagrammableSpots: "Reflection in water, traditional architecture",
    tips: "Evening visits offer beautiful lighting for photos"
  },
  "Santosh Mitra Square": {
    crowdStatus: "Medium",
    instagrammableSpots: "Intricate decorations, cultural performances",
    tips: "Check for cultural programs in the evening"
  },
  "Md. Ali Park": {
    crowdStatus: "High",
    instagrammableSpots: "Park setting, family-friendly atmosphere",
    tips: "Great for family visits, parking available nearby"
  },
  "Baghbazar Sarbojanin": {
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional Bengali architecture, heritage feel",
    tips: "Historical significance makes it worth visiting"
  },
  "Ekbalpore": {
    crowdStatus: "Low",
    instagrammableSpots: "Local community spirit, authentic celebrations",
    tips: "Less crowded, authentic local experience"
  },
  "Suruchi Sangha": {
    crowdStatus: "Medium",
    instagrammableSpots: "Modern artistic installations, creative themes",
    tips: "Known for innovative themes and artistic excellence"
  },
  "Ballygunge Cultural": {
    crowdStatus: "High",
    instagrammableSpots: "Cultural performances, artistic decorations",
    tips: "Premium location with high-quality decorations"
  },
  "Tridhara Sammilani": {
    crowdStatus: "Medium",
    instagrammableSpots: "Community celebrations, local traditions",
    tips: "Good balance of crowd and authentic experience"
  },
  "Jodhpur Park": {
    crowdStatus: "Low",
    instagrammableSpots: "Peaceful atmosphere, local community feel",
    tips: "Quiet location, good for peaceful visits"
  },
  "Baghajatin": {
    crowdStatus: "Medium",
    instagrammableSpots: "Local community spirit, traditional celebrations",
    tips: "Family-friendly with good local food options nearby"
  },
  "Deshapriya Park": {
    crowdStatus: "High",
    instagrammableSpots: "Park setting, open space, family atmosphere",
    tips: "Popular family destination, arrive early for parking"
  },
  "Hindustan Park": {
    crowdStatus: "Medium",
    instagrammableSpots: "Local community celebrations, authentic feel",
    tips: "Good local food stalls in the area"
  },
  "Ballygunge Place": {
    crowdStatus: "High",
    instagrammableSpots: "Premium decorations, artistic excellence",
    tips: "High-end decorations, expect crowds during peak hours"
  },
  "Lake Town": {
    crowdStatus: "Low",
    instagrammableSpots: "Peaceful setting, local community spirit",
    tips: "Less crowded, good for relaxed visits"
  },
  "Salt Lake": {
    crowdStatus: "Medium",
    instagrammableSpots: "Modern setting, planned area aesthetics",
    tips: "Well-planned area with good infrastructure"
  },
  "New Market": {
    crowdStatus: "High",
    instagrammableSpots: "Historic market setting, bustling atmosphere",
    tips: "Combine pandal visit with shopping, very crowded"
  },
  "Gariahat": {
    crowdStatus: "High",
    instagrammableSpots: "Commercial area setting, vibrant atmosphere",
    tips: "Busy commercial area, good for shopping after visit"
  },
  "Rashbehari Avenue": {
    crowdStatus: "Medium",
    instagrammableSpots: "Avenue setting, street decorations",
    tips: "Good street food options in the area"
  },
  "Kalighat": {
    crowdStatus: "High",
    instagrammableSpots: "Temple setting, religious significance",
    tips: "Religious significance, very crowded during festival"
  }
};

async function updatePandalsWithNewFields() {
  try {
    console.log('Starting to update pandals with new fields...');
    
    const pandalsSnapshot = await getDocs(collection(db, 'pandals'));
    let updatedCount = 0;
    
    for (const pandalDoc of pandalsSnapshot.docs) {
      const pandalData = pandalDoc.data();
      const pandalName = pandalData.name;
      
      if (pandalEnhancements[pandalName]) {
        const enhancements = pandalEnhancements[pandalName];
        
        await updateDoc(doc(db, 'pandals', pandalDoc.id), {
          crowdStatus: enhancements.crowdStatus,
          instagrammableSpots: enhancements.instagrammableSpots,
          tips: enhancements.tips
        });
        
        console.log(`✅ Updated: ${pandalName}`);
        updatedCount++;
      } else {
        console.log(`⚠️ No enhancement data for: ${pandalName}`);
      }
    }
    
    console.log(`🎉 Successfully updated ${updatedCount} pandals with new fields!`);
  } catch (error) {
    console.error('❌ Error updating pandals:', error);
  }
}

// Run the update script
updatePandalsWithNewFields();
