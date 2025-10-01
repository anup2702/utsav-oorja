// Script to analyze missing data in pandals
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function analyzeMissingPandalData() {
  try {
    console.log('🔍 Analyzing missing data in pandals...');
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

    console.log(`📊 Total pandals analyzed: ${pandals.length}`);
    console.log('');

    // Define expected fields
    const expectedFields = [
      'name',
      'location',
      'timings',
      'mapsLink',
      'imageURL',
      'description',
      'crowdStatus',
      'instagrammableSpots',
      'tips',
      'metroStation',
      'votes',
      'reelURL'
    ];

    // Analyze missing fields
    const missingData = {
      missingFields: {},
      pandalsWithMissingData: [],
      placeholderImages: [],
      missingReels: [],
      incompleteMetroInfo: []
    };

    // Count missing fields
    expectedFields.forEach(field => {
      missingData.missingFields[field] = 0;
    });

    pandals.forEach(pandal => {
      const pandalMissingFields = [];
      
      expectedFields.forEach(field => {
        if (!pandal[field] || pandal[field] === '' || pandal[field] === null) {
          missingData.missingFields[field]++;
          pandalMissingFields.push(field);
        }
      });

      // Check for placeholder images
      if (pandal.imageURL && pandal.imageURL.includes('placeholder')) {
        missingData.placeholderImages.push({
          name: pandal.name,
          id: pandal.id,
          imageURL: pandal.imageURL
        });
      }

      // Check for missing reels
      if (!pandal.reelURL) {
        missingData.missingReels.push({
          name: pandal.name,
          id: pandal.id
        });
      }

      // Check for incomplete metro info
      if (!pandal.metroStation || !pandal.metroStation.name || pandal.metroStation.name === 'Nearest Metro Station') {
        missingData.incompleteMetroInfo.push({
          name: pandal.name,
          id: pandal.id,
          metroStation: pandal.metroStation
        });
      }

      if (pandalMissingFields.length > 0) {
        missingData.pandalsWithMissingData.push({
          name: pandal.name,
          id: pandal.id,
          missingFields: pandalMissingFields
        });
      }
    });

    // Display results
    console.log('📋 MISSING DATA ANALYSIS:');
    console.log('');

    // 1. Missing Fields Summary
    console.log('1️⃣ MISSING FIELDS SUMMARY:');
    console.log('─'.repeat(50));
    Object.entries(missingData.missingFields).forEach(([field, count]) => {
      const percentage = ((count / pandals.length) * 100).toFixed(1);
      const status = count === 0 ? '✅' : count < 5 ? '⚠️' : '❌';
      console.log(`${status} ${field}: ${count}/${pandals.length} (${percentage}%)`);
    });
    console.log('');

    // 2. Pandals with Missing Data
    if (missingData.pandalsWithMissingData.length > 0) {
      console.log('2️⃣ PANDALS WITH MISSING DATA:');
      console.log('─'.repeat(50));
      missingData.pandalsWithMissingData.forEach((pandal, index) => {
        console.log(`${index + 1}. ${pandal.name}`);
        console.log(`   Missing: ${pandal.missingFields.join(', ')}`);
        console.log(`   ID: ${pandal.id}`);
        console.log('');
      });
    } else {
      console.log('2️⃣ PANDALS WITH MISSING DATA:');
      console.log('─'.repeat(50));
      console.log('✅ All pandals have complete data!');
      console.log('');
    }

    // 3. Placeholder Images
    if (missingData.placeholderImages.length > 0) {
      console.log('3️⃣ PANDALS WITH PLACEHOLDER IMAGES:');
      console.log('─'.repeat(50));
      missingData.placeholderImages.forEach((pandal, index) => {
        console.log(`${index + 1}. ${pandal.name}`);
        console.log(`   Current: ${pandal.imageURL}`);
        console.log(`   ID: ${pandal.id}`);
        console.log('');
      });
    } else {
      console.log('3️⃣ PANDALS WITH PLACEHOLDER IMAGES:');
      console.log('─'.repeat(50));
      console.log('✅ All pandals have real images!');
      console.log('');
    }

    // 4. Missing Instagram Reels
    if (missingData.missingReels.length > 0) {
      console.log('4️⃣ PANDALS WITHOUT INSTAGRAM REELS:');
      console.log('─'.repeat(50));
      missingData.missingReels.forEach((pandal, index) => {
        console.log(`${index + 1}. ${pandal.name}`);
        console.log(`   ID: ${pandal.id}`);
        console.log('');
      });
    } else {
      console.log('4️⃣ PANDALS WITHOUT INSTAGRAM REELS:');
      console.log('─'.repeat(50));
      console.log('✅ All pandals have Instagram reels!');
      console.log('');
    }

    // 5. Incomplete Metro Information
    if (missingData.incompleteMetroInfo.length > 0) {
      console.log('5️⃣ PANDALS WITH INCOMPLETE METRO INFO:');
      console.log('─'.repeat(50));
      missingData.incompleteMetroInfo.forEach((pandal, index) => {
        console.log(`${index + 1}. ${pandal.name}`);
        console.log(`   Metro: ${pandal.metroStation ? JSON.stringify(pandal.metroStation) : 'None'}`);
        console.log(`   ID: ${pandal.id}`);
        console.log('');
      });
    } else {
      console.log('5️⃣ PANDALS WITH INCOMPLETE METRO INFO:');
      console.log('─'.repeat(50));
      console.log('✅ All pandals have complete metro information!');
      console.log('');
    }

    // 6. Summary
    console.log('📊 OVERALL SUMMARY:');
    console.log('─'.repeat(50));
    console.log(`Total pandals: ${pandals.length}`);
    console.log(`Pandals with missing data: ${missingData.pandalsWithMissingData.length}`);
    console.log(`Pandals with placeholder images: ${missingData.placeholderImages.length}`);
    console.log(`Pandals without reels: ${missingData.missingReels.length}`);
    console.log(`Pandals with incomplete metro info: ${missingData.incompleteMetroInfo.length}`);
    console.log('');

    // 7. Recommendations
    console.log('💡 RECOMMENDATIONS:');
    console.log('─'.repeat(50));
    
    if (missingData.placeholderImages.length > 0) {
      console.log('🖼️ Add real images for pandals with placeholder images');
    }
    
    if (missingData.missingReels.length > 0) {
      console.log('🎬 Add Instagram reel URLs for pandals without reels');
    }
    
    if (missingData.incompleteMetroInfo.length > 0) {
      console.log('🚇 Update metro station information for better navigation');
    }
    
    if (missingData.pandalsWithMissingData.length > 0) {
      console.log('📝 Complete missing field data for better user experience');
    }

    if (missingData.placeholderImages.length === 0 && 
        missingData.missingReels.length === 0 && 
        missingData.incompleteMetroInfo.length === 0 && 
        missingData.pandalsWithMissingData.length === 0) {
      console.log('🎉 All pandals have complete data! No recommendations needed.');
    }

  } catch (error) {
    console.error('❌ Error analyzing missing pandal data:', error);
  }
}

// Run the script
analyzeMissingPandalData();
