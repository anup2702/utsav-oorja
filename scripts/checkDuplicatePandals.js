// Script to check for duplicate pandals in the database
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

async function checkDuplicatePandals() {
  try {
    console.log('🔍 Checking for duplicate pandals in the database...');
    console.log('');

    // Get all pandals from database
    const pandalsSnapshot = await getDocs(collection(db, 'pandals'));
    const pandals = [];
    
    pandalsSnapshot.forEach(doc => {
      pandals.push({
        id: doc.id,
        name: doc.data().name,
        location: doc.data().location,
        reelURL: doc.data().reelURL || 'No reel',
        imageURL: doc.data().imageURL || 'No image'
      });
    });

    console.log(`📊 Total pandals in database: ${pandals.length}`);
    console.log('');

    // Find duplicates by name
    const nameCounts = {};
    const duplicates = [];

    pandals.forEach(pandal => {
      const name = pandal.name;
      if (nameCounts[name]) {
        nameCounts[name].push(pandal);
      } else {
        nameCounts[name] = [pandal];
      }
    });

    // Identify duplicates
    Object.keys(nameCounts).forEach(name => {
      if (nameCounts[name].length > 1) {
        duplicates.push({
          name: name,
          count: nameCounts[name].length,
          pandals: nameCounts[name]
        });
      }
    });

    if (duplicates.length === 0) {
      console.log('✅ No duplicate pandals found!');
      console.log('All pandal names are unique.');
    } else {
      console.log(`❌ Found ${duplicates.length} duplicate pandal name(s):`);
      console.log('');

      duplicates.forEach((duplicate, index) => {
        console.log(`${index + 1}. "${duplicate.name}" (${duplicate.count} entries):`);
        duplicate.pandals.forEach((pandal, pandalIndex) => {
          console.log(`   ${pandalIndex + 1}. ID: ${pandal.id}`);
          console.log(`      Location: ${pandal.location}`);
          console.log(`      Reel: ${pandal.reelURL}`);
          console.log(`      Image: ${pandal.imageURL}`);
          console.log('');
        });
        console.log('---');
      });

      console.log('');
      console.log('📋 Summary of duplicate names:');
      duplicates.forEach((duplicate, index) => {
        console.log(`${index + 1}. "${duplicate.name}" - ${duplicate.count} entries`);
      });
    }

    // Also check for similar names (case-insensitive)
    console.log('');
    console.log('🔍 Checking for similar names (case-insensitive)...');
    
    const similarNames = [];
    const allNames = pandals.map(p => p.name.toLowerCase());
    
    for (let i = 0; i < allNames.length; i++) {
      for (let j = i + 1; j < allNames.length; j++) {
        if (allNames[i] === allNames[j]) {
          const originalName1 = pandals[i].name;
          const originalName2 = pandals[j].name;
          if (originalName1 !== originalName2) {
            similarNames.push({
              name1: originalName1,
              name2: originalName2,
              id1: pandals[i].id,
              id2: pandals[j].id
            });
          }
        }
      }
    }

    if (similarNames.length > 0) {
      console.log('⚠️ Found similar names (case differences):');
      similarNames.forEach((similar, index) => {
        console.log(`${index + 1}. "${similar.name1}" (ID: ${similar.id1})`);
        console.log(`   "${similar.name2}" (ID: ${similar.id2})`);
        console.log('');
      });
    } else {
      console.log('✅ No similar names found (case differences).');
    }

  } catch (error) {
    console.error('❌ Error checking for duplicates:', error);
  }
}

// Run the script
checkDuplicatePandals();
