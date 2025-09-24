// Script to update metro station information for specific pandals
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';

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

// Metro station data for specific pandals
const metroStationUpdates = {
  "Ultodanga Sangrami Club": {
    name: "Girish Park",
    line: "Blue",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Haridevpur 41 Pally": {
    name: "Mahanayak Uttam Kumar",
    line: "Blue",
    distance: "0.8 km",
    walkTime: "10 minutes"
  },
  "DumDum Park Bharat Chakra": {
    name: "Belgachia",
    line: "Blue",
    distance: "0.7 km",
    walkTime: "8 minutes"
  },
  "Kashi Bose Lane Durgotsob": {
    name: "Sovabazar Sutanuti",
    line: "Blue",
    distance: "0.6 km",
    walkTime: "7 minutes"
  },
  "Hazra Park Durgotsob": {
    name: "Jatin Das Park",
    line: "Blue",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Pratapaditya Road Tricone Park": {
    name: "Kalighat",
    line: "Blue",
    distance: "0.3 km",
    walkTime: "4 minutes"
  },
  "Tala Barowari Durgotsob": {
    name: "Belgachia",
    line: "Blue",
    distance: "0.9 km",
    walkTime: "11 minutes"
  },
  "Dumdum Park Tarun Sangha": {
    name: "Belgachia",
    line: "Blue",
    distance: "0.8 km",
    walkTime: "10 minutes"
  },
  "Lalabagan Nabankur": {
    name: "Phoolbagan",
    line: "Blue",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Uttar Kalikata Sarbojanin": {
    name: "Shyambazar",
    line: "Blue",
    distance: "0.7 km",
    walkTime: "8 minutes"
  },
  "Behela Young Men's Association": {
    name: "Behala Bazar",
    line: "Green",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Rajdanga Naba Udayan Sangha": {
    name: "Kalighat",
    line: "Blue",
    distance: "1.2 km",
    walkTime: "15 minutes"
  },
  "Arjunpur Amra Sobai Club": {
    name: "Belgachia",
    line: "Blue",
    distance: "1.0 km",
    walkTime: "12 minutes"
  },
  "Dakshindari Youths": {
    name: "Belgachia",
    line: "Blue",
    distance: "0.6 km",
    walkTime: "7 minutes"
  },
  "Chetla Agrani Club": {
    name: "Kalighat",
    line: "Blue",
    distance: "0.8 km",
    walkTime: "10 minutes"
  },
  "Kendua Shanti Sangha": {
    name: "Belgachia",
    line: "Blue",
    distance: "1.1 km",
    walkTime: "13 minutes"
  },
  "Tala Prattoy": {
    name: "Belgachia",
    line: "Blue",
    distance: "0.7 km",
    walkTime: "8 minutes"
  },
  "Samaj Sebi Sangha": {
    name: "Belgachia",
    line: "Blue",
    distance: "0.9 km",
    walkTime: "11 minutes"
  },
  "Mudiali Club": {
    name: "Rabindra Sarobar",
    line: "Green",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Chaltabagan Sarbojonin": {
    name: "Sovabazar Sutanuti",
    line: "Blue",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Shreebhumi Sporting Club": {
    name: "Belgachia",
    line: "Blue",
    distance: "0.8 km",
    walkTime: "10 minutes"
  }
};

async function updateMetroStations() {
  try {
    console.log('🚇 Starting metro station updates...');
    console.log('');

    // Get all pandals from database
    const pandalsSnapshot = await getDocs(collection(db, 'pandals'));
    const pandals = [];
    
    pandalsSnapshot.forEach(doc => {
      pandals.push({
        id: doc.id,
        ...doc.data()
      });
    });

    console.log(`📊 Total pandals in database: ${pandals.length}`);
    console.log(`🎯 Pandals to update: ${Object.keys(metroStationUpdates).length}`);
    console.log('');

    let updatedCount = 0;
    let notFoundCount = 0;

    // Update each pandal with new metro station data
    for (const [pandalName, metroData] of Object.entries(metroStationUpdates)) {
      // Find the pandal in the database
      const pandal = pandals.find(p => p.name === pandalName);
      
      if (pandal) {
        // Update the pandal with new metro station data
        await updateDoc(doc(db, 'pandals', pandal.id), {
          metroStation: metroData
        });
        
        console.log(`✅ Updated: ${pandalName}`);
        console.log(`   Metro: ${metroData.name} (${metroData.line} Line)`);
        console.log(`   Distance: ${metroData.distance}, Walk Time: ${metroData.walkTime}`);
        console.log('');
        updatedCount++;
      } else {
        console.log(`⚠️ Not found: ${pandalName}`);
        console.log('');
        notFoundCount++;
      }
    }

    console.log('🎉 Metro station update completed!');
    console.log('─'.repeat(50));
    console.log(`✅ Successfully updated: ${updatedCount} pandals`);
    console.log(`⚠️ Not found in database: ${notFoundCount} pandals`);
    console.log(`📊 Total processed: ${Object.keys(metroStationUpdates).length} pandals`);
    console.log('');
    console.log('🚇 All metro station information has been updated!');
    console.log('📱 Users can now see accurate metro station details in the app');

  } catch (error) {
    console.error('❌ Error updating metro stations:', error);
  }
}

// Run the script
updateMetroStations();
