// Comprehensive script to update metro station information based on detailed metro line mapping
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

// Comprehensive metro station mapping based on metro lines
const comprehensiveMetroMapping = {
  // Blue Line (Dakshineswar to Kavi Subhash)
  "Noapara Udayan Sangha": {
    name: "Noapara",
    line: "Blue",
    distance: "0.3 km",
    walkTime: "4 minutes"
  },
  "Sinthee Sarbojanin": {
    name: "Dumdum",
    line: "Blue",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Tala Park": {
    name: "Belgachia",
    line: "Blue",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Tala Prattay": {
    name: "Belgachia",
    line: "Blue",
    distance: "0.7 km",
    walkTime: "8 minutes"
  },
  "Dakshinpara": {
    name: "Belgachia",
    line: "Blue",
    distance: "0.6 km",
    walkTime: "7 minutes"
  },
  "Arjunpur Amra Sabai Club": {
    name: "Belgachia",
    line: "Blue",
    distance: "1.0 km",
    walkTime: "12 minutes"
  },
  "DumDum Park Bharat Chakra": {
    name: "Belgachia",
    line: "Blue",
    distance: "0.7 km",
    walkTime: "8 minutes"
  },
  "Dumdum Park Sarbajanin": {
    name: "Belgachia",
    line: "Blue",
    distance: "0.8 km",
    walkTime: "10 minutes"
  },
  "Dumdum Park Tarun Dal": {
    name: "Belgachia",
    line: "Blue",
    distance: "0.8 km",
    walkTime: "10 minutes"
  },
  "Sree Bhumi Sporting Club": {
    name: "Belgachia",
    line: "Blue",
    distance: "0.8 km",
    walkTime: "10 minutes"
  },
  "Golaghata Sammilani": {
    name: "Belgachia",
    line: "Blue",
    distance: "0.9 km",
    walkTime: "11 minutes"
  },
  "Dakshindari Youth": {
    name: "Belgachia",
    line: "Blue",
    distance: "0.6 km",
    walkTime: "7 minutes"
  },
  "Telengabagan": {
    name: "Belgachia",
    line: "Blue",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Baghbazar Sarbojanin": {
    name: "Shyambazar",
    line: "Blue",
    distance: "0.6 km",
    walkTime: "7 minutes"
  },
  "Sikdar Bagan": {
    name: "Shyambazar",
    line: "Blue",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Hatibagan Nabinpally": {
    name: "Shyambazar",
    line: "Blue",
    distance: "0.3 km",
    walkTime: "4 minutes"
  },
  "Nalin Sarkar Street": {
    name: "Shyambazar",
    line: "Blue",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Hatibagan Sarbojonin": {
    name: "Shyambazar",
    line: "Blue",
    distance: "0.3 km",
    walkTime: "4 minutes"
  },
  "Kashi Bose Lane": {
    name: "Shyambazar",
    line: "Blue",
    distance: "0.6 km",
    walkTime: "7 minutes"
  },
  "Lalabagan Nabankur": {
    name: "Shyambazar",
    line: "Blue",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Sovabazar Rajbari": {
    name: "Shobhabazar",
    line: "Blue",
    distance: "0.2 km",
    walkTime: "3 minutes"
  },
  "Jagat Mukherjee Park": {
    name: "Shobhabazar",
    line: "Blue",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Kumartuli Sarbojanin": {
    name: "Shobhabazar",
    line: "Blue",
    distance: "0.3 km",
    walkTime: "4 minutes"
  },
  "Kumartuli Park": {
    name: "Shobhabazar",
    line: "Blue",
    distance: "0.3 km",
    walkTime: "4 minutes"
  },
  "Beniatola Sarbojonin": {
    name: "Shobhabazar",
    line: "Blue",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Ahiritola Sarbojonin": {
    name: "Shobhabazar",
    line: "Blue",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Jorasanko Sadharan": {
    name: "Girish Park",
    line: "Blue",
    distance: "0.3 km",
    walkTime: "4 minutes"
  },
  "Chorebagan Sarbojonin": {
    name: "Girish Park",
    line: "Blue",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Simla Byayam Samity": {
    name: "Girish Park",
    line: "Blue",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Chaltabagan Lohapatty": {
    name: "Girish Park",
    line: "Blue",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Muhammad Ali Park": {
    name: "MG Road",
    line: "Blue",
    distance: "0.3 km",
    walkTime: "4 minutes"
  },
  "College Square": {
    name: "MG Road",
    line: "Blue",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Santosh Mitra Square": {
    name: "MG Road",
    line: "Blue",
    distance: "0.7 km",
    walkTime: "8 minutes"
  },
  "Sealdah Athletic Club": {
    name: "MG Road",
    line: "Blue",
    distance: "0.6 km",
    walkTime: "7 minutes"
  },
  "Subodh Mallick Square": {
    name: "Central",
    line: "Blue",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Kapalitola Sarbajanin": {
    name: "Central",
    line: "Blue",
    distance: "0.3 km",
    walkTime: "4 minutes"
  },
  "Janbazar Rajbari": {
    name: "Chandni Chowk",
    line: "Blue",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Taltala Sarbojanin": {
    name: "Chandni Chowk",
    line: "Blue",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Chakraberia Sarbojanin": {
    name: "Rabindra Sadan",
    line: "Blue",
    distance: "0.6 km",
    walkTime: "7 minutes"
  },
  "68 Pally": {
    name: "Netaji Bhavan",
    line: "Blue",
    distance: "0.3 km",
    walkTime: "4 minutes"
  },
  "76 Pally": {
    name: "Netaji Bhavan",
    line: "Blue",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Bhowanipur 75 Pally": {
    name: "Netaji Bhavan",
    line: "Blue",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "22 Pally (Northern Park)": {
    name: "Netaji Bhavan",
    line: "Blue",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Paddapukur Youth": {
    name: "Netaji Bhavan",
    line: "Blue",
    distance: "0.6 km",
    walkTime: "7 minutes"
  },
  "Harish Park": {
    name: "Netaji Bhavan",
    line: "Blue",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Agradut Udaya Sangha": {
    name: "Netaji Bhavan",
    line: "Blue",
    distance: "0.7 km",
    walkTime: "8 minutes"
  },
  "Swadhin Sangha": {
    name: "Netaji Bhavan",
    line: "Blue",
    distance: "0.6 km",
    walkTime: "7 minutes"
  },
  "Jatin Das Park": {
    name: "Jatin Das Park",
    line: "Blue",
    distance: "0.2 km",
    walkTime: "3 minutes"
  },
  "23 Pally": {
    name: "Jatin Das Park",
    line: "Blue",
    distance: "0.3 km",
    walkTime: "4 minutes"
  },
  "Forward Club": {
    name: "Jatin Das Park",
    line: "Blue",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Matri Mandir": {
    name: "Jatin Das Park",
    line: "Blue",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Bakul Bagan": {
    name: "Jatin Das Park",
    line: "Blue",
    distance: "0.3 km",
    walkTime: "4 minutes"
  },
  "Maddox Square": {
    name: "Jatin Das Park",
    line: "Blue",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Suruchi Sangha": {
    name: "Kalighat",
    line: "Blue",
    distance: "0.8 km",
    walkTime: "10 minutes"
  },
  "Chetla Agrani": {
    name: "Kalighat",
    line: "Blue",
    distance: "0.8 km",
    walkTime: "10 minutes"
  },
  "66 Pally": {
    name: "Kalighat",
    line: "Blue",
    distance: "0.6 km",
    walkTime: "7 minutes"
  },
  "Badamtala Ashar Sangha": {
    name: "Kalighat",
    line: "Blue",
    distance: "0.7 km",
    walkTime: "8 minutes"
  },
  "Deshapriya Park": {
    name: "Kalighat",
    line: "Blue",
    distance: "0.9 km",
    walkTime: "11 minutes"
  },
  "Tridhara Sammilani": {
    name: "Kalighat",
    line: "Blue",
    distance: "0.8 km",
    walkTime: "10 minutes"
  },
  "Ballygunge Cultural": {
    name: "Kalighat",
    line: "Blue",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Hindusthan Park": {
    name: "Kalighat",
    line: "Blue",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Hindusthan Club": {
    name: "Kalighat",
    line: "Blue",
    distance: "0.6 km",
    walkTime: "7 minutes"
  },
  "Singhi Park": {
    name: "Kalighat",
    line: "Blue",
    distance: "0.7 km",
    walkTime: "8 minutes"
  },
  "Ekdalia Evergreen": {
    name: "Kalighat",
    line: "Blue",
    distance: "0.8 km",
    walkTime: "10 minutes"
  },
  "Bosepukur Sitala Mandir": {
    name: "Kalighat",
    line: "Blue",
    distance: "1.0 km",
    walkTime: "12 minutes"
  },
  "Rajdanga Naba Uday Sangha": {
    name: "Kalighat",
    line: "Blue",
    distance: "1.2 km",
    walkTime: "15 minutes"
  },
  "Mudiali": {
    name: "Rabindra Sarobar",
    line: "Blue",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Shib Mandir": {
    name: "Rabindra Sarobar",
    line: "Blue",
    distance: "0.6 km",
    walkTime: "7 minutes"
  },
  "Haridevpur 41 Pally": {
    name: "Mahanayak Uttam Kumar",
    line: "Blue",
    distance: "0.8 km",
    walkTime: "10 minutes"
  },
  "Vivekananda Park": {
    name: "Mahanayak Uttam Kumar",
    line: "Blue",
    distance: "0.6 km",
    walkTime: "7 minutes"
  },
  "Ajeya Sanghati": {
    name: "Mahanayak Uttam Kumar",
    line: "Blue",
    distance: "0.7 km",
    walkTime: "8 minutes"
  },
  "New Sporting Club": {
    name: "Mahanayak Uttam Kumar",
    line: "Blue",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Barisha Club": {
    name: "Mahanayak Uttam Kumar",
    line: "Blue",
    distance: "0.9 km",
    walkTime: "11 minutes"
  },
  "Naktala Pally Unnayan Samity": {
    name: "Netaji",
    line: "Blue",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Regent Park": {
    name: "Masterda Surya Sen",
    line: "Blue",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Roynagar Unyan Samity": {
    name: "Masterda Surya Sen",
    line: "Blue",
    distance: "0.6 km",
    walkTime: "7 minutes"
  },
  "Naktala Udayan Sangha": {
    name: "Gitanjali (Naktala)",
    line: "Blue",
    distance: "0.3 km",
    walkTime: "4 minutes"
  },
  "Baishnabghata Balak Samity": {
    name: "Gitanjali (Naktala)",
    line: "Blue",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Naba Durga": {
    name: "Kavi Nazrul",
    line: "Blue",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Garia Mitali": {
    name: "Kavi Nazrul",
    line: "Blue",
    distance: "0.6 km",
    walkTime: "7 minutes"
  },
  "Tarun Sathi": {
    name: "Kavi Nazrul",
    line: "Blue",
    distance: "0.7 km",
    walkTime: "8 minutes"
  },
  "Shyama Pally": {
    name: "Kavi Nazrul",
    line: "Blue",
    distance: "0.8 km",
    walkTime: "10 minutes"
  },
  "Kamdahari Purbapara": {
    name: "Kavi Nazrul",
    line: "Blue",
    distance: "0.9 km",
    walkTime: "11 minutes"
  },
  "Patuli Sarbojanin": {
    name: "Shahid Khudiram",
    line: "Blue",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Santoshpur Lake Pally": {
    name: "Kavi Subhash",
    line: "Blue",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Santoshpur Trikon Park": {
    name: "Kavi Subhash",
    line: "Blue",
    distance: "0.6 km",
    walkTime: "7 minutes"
  },
  "Pally Mangal": {
    name: "Kavi Subhash",
    line: "Blue",
    distance: "0.7 km",
    walkTime: "8 minutes"
  },

  // Green Line (Howrah Maidan to Salt Lake Sector V)
  "Beliaghata 33 Pally": {
    name: "Phoolbagan",
    line: "Green",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Kankurgachi Jubak Brinda": {
    name: "Phoolbagan",
    line: "Green",
    distance: "0.6 km",
    walkTime: "7 minutes"
  },
  "IB Block": {
    name: "Saltlake Stadium",
    line: "Green",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "GB Block": {
    name: "Saltlake Stadium",
    line: "Green",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Swapnar Bagan Yubak Brinda": {
    name: "Bengal Chemical",
    line: "Green",
    distance: "0.3 km",
    walkTime: "4 minutes"
  },
  "Mitali Sangha kankurgachi": {
    name: "Bengal Chemical",
    line: "Green",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "EC Block": {
    name: "City Centre",
    line: "Green",
    distance: "0.2 km",
    walkTime: "3 minutes"
  },
  "FD Block": {
    name: "City Centre",
    line: "Green",
    distance: "0.3 km",
    walkTime: "4 minutes"
  },
  "AB Block": {
    name: "City Centre",
    line: "Green",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "AD Block": {
    name: "City Centre",
    line: "Green",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "BD Block": {
    name: "City Centre",
    line: "Green",
    distance: "0.6 km",
    walkTime: "7 minutes"
  },
  "AE Block": {
    name: "Central Park",
    line: "Green",
    distance: "0.3 km",
    walkTime: "4 minutes"
  },
  "AG Block": {
    name: "Central Park",
    line: "Green",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "AH Block": {
    name: "Central Park",
    line: "Green",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "BL Block": {
    name: "Karunamoyee",
    line: "Green",
    distance: "0.2 km",
    walkTime: "3 minutes"
  },
  "AK Block": {
    name: "Karunamoyee",
    line: "Green",
    distance: "0.3 km",
    walkTime: "4 minutes"
  },
  "AJ Block": {
    name: "Karunamoyee",
    line: "Green",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "BJ Block": {
    name: "Karunamoyee",
    line: "Green",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "FE Block": {
    name: "Karunamoyee",
    line: "Green",
    distance: "0.6 km",
    walkTime: "7 minutes"
  },

  // Purple Line (Esplanade to Joka)
  "Behala Nutan Dal": {
    name: "Behala Bazar",
    line: "Purple",
    distance: "0.3 km",
    walkTime: "4 minutes"
  },
  "Friends Club": {
    name: "Behala Bazar",
    line: "Purple",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Behala Notun Sangha": {
    name: "Behala Bazar",
    line: "Purple",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "Barisha Sarbojonin": {
    name: "Behala Chowrasta",
    line: "Purple",
    distance: "0.4 km",
    walkTime: "5 minutes"
  },
  "Players Corner Club": {
    name: "Behala Chowrasta",
    line: "Purple",
    distance: "0.5 km",
    walkTime: "6 minutes"
  },
  "State Bank Park": {
    name: "Behala Chowrasta",
    line: "Purple",
    distance: "0.6 km",
    walkTime: "7 minutes"
  }
};

async function updateComprehensiveMetroStations() {
  try {
    console.log('🚇 Starting comprehensive metro station updates...');
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
    console.log(`🎯 Pandals to update: ${Object.keys(comprehensiveMetroMapping).length}`);
    console.log('');

    let updatedCount = 0;
    let notFoundCount = 0;
    const notFoundPandals = [];

    // Update each pandal with new metro station data
    for (const [pandalName, metroData] of Object.entries(comprehensiveMetroMapping)) {
      // Find the pandal in the database (try exact match first, then partial match)
      let pandal = pandals.find(p => p.name === pandalName);
      
      if (!pandal) {
        // Try partial matching for common variations
        pandal = pandals.find(p => 
          p.name.toLowerCase().includes(pandalName.toLowerCase()) ||
          pandalName.toLowerCase().includes(p.name.toLowerCase())
        );
      }
      
      if (pandal) {
        // Update the pandal with new metro station data
        await updateDoc(doc(db, 'pandals', pandal.id), {
          metroStation: metroData
        });
        
        console.log(`✅ Updated: ${pandal.name}`);
        console.log(`   Metro: ${metroData.name} (${metroData.line} Line)`);
        console.log(`   Distance: ${metroData.distance}, Walk Time: ${metroData.walkTime}`);
        console.log('');
        updatedCount++;
      } else {
        console.log(`⚠️ Not found: ${pandalName}`);
        notFoundPandals.push(pandalName);
        console.log('');
        notFoundCount++;
      }
    }

    console.log('🎉 Comprehensive metro station update completed!');
    console.log('─'.repeat(60));
    console.log(`✅ Successfully updated: ${updatedCount} pandals`);
    console.log(`⚠️ Not found in database: ${notFoundCount} pandals`);
    console.log(`📊 Total processed: ${Object.keys(comprehensiveMetroMapping).length} pandals`);
    console.log('');

    if (notFoundPandals.length > 0) {
      console.log('📋 Pandals not found in database:');
      notFoundPandals.forEach((name, index) => {
        console.log(`   ${index + 1}. ${name}`);
      });
      console.log('');
    }

    console.log('🚇 All metro station information has been comprehensively updated!');
    console.log('📱 Users can now see accurate metro station details organized by metro lines');

  } catch (error) {
    console.error('❌ Error updating comprehensive metro stations:', error);
  }
}

// Run the script
updateComprehensiveMetroStations();
