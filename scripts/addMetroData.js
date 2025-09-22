// Script to add metro station information to existing pandals
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

// Metro station data for each pandal
const metroData = {
  "Kumartuli Park": {
    name: "Shyambazar",
    line: "Blue",
    distance: "0.8 km",
    walkTime: "10 mins"
  },
  "College Square": {
    name: "Central",
    line: "Blue",
    distance: "0.5 km",
    walkTime: "6 mins"
  },
  "Santosh Mitra Square": {
    name: "Central",
    line: "Blue",
    distance: "0.7 km",
    walkTime: "8 mins"
  },
  "Md. Ali Park": {
    name: "Park Street",
    line: "Blue",
    distance: "0.3 km",
    walkTime: "4 mins"
  },
  "Baghbazar Sarbojanin": {
    name: "Shyambazar",
    line: "Blue",
    distance: "0.6 km",
    walkTime: "7 mins"
  },
  "Ekbalpore": {
    name: "Rabindra Sarobar",
    line: "Green",
    distance: "1.2 km",
    walkTime: "15 mins"
  },
  "Suruchi Sangha": {
    name: "Rabindra Sarobar",
    line: "Green",
    distance: "0.9 km",
    walkTime: "11 mins"
  },
  "Ballygunge Cultural": {
    name: "Rabindra Sarobar",
    line: "Green",
    distance: "0.4 km",
    walkTime: "5 mins"
  },
  "Tridhara Sammilani": {
    name: "Rabindra Sarobar",
    line: "Green",
    distance: "0.8 km",
    walkTime: "10 mins"
  },
  "Jodhpur Park": {
    name: "Rabindra Sarobar",
    line: "Green",
    distance: "1.0 km",
    walkTime: "12 mins"
  },
  "Baghajatin": {
    name: "Rabindra Sarobar",
    line: "Green",
    distance: "1.5 km",
    walkTime: "18 mins"
  },
  "Deshapriya Park": {
    name: "Rabindra Sarobar",
    line: "Green",
    distance: "0.6 km",
    walkTime: "7 mins"
  },
  "Hindustan Park": {
    name: "Rabindra Sarobar",
    line: "Green",
    distance: "0.7 km",
    walkTime: "8 mins"
  },
  "Ballygunge Place": {
    name: "Rabindra Sarobar",
    line: "Green",
    distance: "0.5 km",
    walkTime: "6 mins"
  },
  "Lake Town": {
    name: "Dum Dum",
    line: "Blue",
    distance: "2.0 km",
    walkTime: "25 mins"
  },
  "Salt Lake": {
    name: "Salt Lake Stadium",
    line: "Blue",
    distance: "1.8 km",
    walkTime: "22 mins"
  },
  "New Market": {
    name: "Central",
    line: "Blue",
    distance: "0.4 km",
    walkTime: "5 mins"
  },
  "Gariahat": {
    name: "Rabindra Sarobar",
    line: "Green",
    distance: "0.3 km",
    walkTime: "4 mins"
  },
  "Rashbehari Avenue": {
    name: "Rabindra Sarobar",
    line: "Green",
    distance: "0.8 km",
    walkTime: "10 mins"
  },
  "Kalighat": {
    name: "Rabindra Sarobar",
    line: "Green",
    distance: "1.1 km",
    walkTime: "13 mins"
  }
};

async function addMetroData() {
  try {
    console.log('Starting to add metro station data...');
    
    const pandalsSnapshot = await getDocs(collection(db, 'pandals'));
    let updatedCount = 0;
    
    for (const pandalDoc of pandalsSnapshot.docs) {
      const pandalData = pandalDoc.data();
      const pandalName = pandalData.name;
      
      if (metroData[pandalName]) {
        const metroInfo = metroData[pandalName];
        
        await updateDoc(doc(db, 'pandals', pandalDoc.id), {
          metroStation: metroInfo
        });
        
        console.log(`✅ Added metro data for: ${pandalName} - ${metroInfo.name} (${metroInfo.line} Line)`);
        updatedCount++;
      } else {
        console.log(`⚠️ No metro data for: ${pandalName}`);
      }
    }
    
    console.log(`🎉 Successfully added metro data to ${updatedCount} pandals!`);
  } catch (error) {
    console.error('❌ Error adding metro data:', error);
  }
}

// Run the script
addMetroData();
