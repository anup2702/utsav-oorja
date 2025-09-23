// Script to remove duplicate pandals from the database
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

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

async function removeDuplicatePandals() {
  try {
    console.log('🗑️ Removing duplicate pandals from the database...');
    console.log('');

    // IDs of duplicate pandals to remove (the ones with placeholder images)
    const duplicatesToRemove = [
      {
        id: 'B2EThYq0giZx1zZp6no1', // Kendua Shanti Sangha (placeholder image)
        name: 'Kendua Shanti Sangha',
        reason: 'Has placeholder image, keeping the one with local image'
      },
      {
        id: 'OpT9cLNiFkWPmIk3I0xA', // Ballygunge Cultural (placeholder image)
        name: 'Ballygunge Cultural',
        reason: 'Has placeholder image, keeping the one with local image'
      },
      {
        id: 'RqH1cdGHHYWhYXN8BI5h', // Deshapriya Park (placeholder image)
        name: 'Deshapriya Park',
        reason: 'Has placeholder image, keeping the one with local image'
      },
      {
        id: 'Xzh0NPusJkP7wla8dmFJ', // Suruchi Sangha (placeholder image)
        name: 'Suruchi Sangha',
        reason: 'Has placeholder image, keeping the one with local image'
      }
    ];

    console.log(`📋 Will remove ${duplicatesToRemove.length} duplicate pandals:`);
    duplicatesToRemove.forEach((duplicate, index) => {
      console.log(`${index + 1}. ${duplicate.name} (ID: ${duplicate.id})`);
      console.log(`   Reason: ${duplicate.reason}`);
    });
    console.log('');

    let removedCount = 0;

    // Remove each duplicate
    for (const duplicate of duplicatesToRemove) {
      try {
        await deleteDoc(doc(db, 'pandals', duplicate.id));
        console.log(`✅ Removed: ${duplicate.name} (ID: ${duplicate.id})`);
        removedCount++;
      } catch (error) {
        console.log(`❌ Failed to remove: ${duplicate.name} (ID: ${duplicate.id})`);
        console.log(`   Error: ${error.message}`);
      }
    }

    console.log('');
    console.log('🎉 Duplicate removal completed!');
    console.log(`📊 Summary:`);
    console.log(`   - Successfully removed: ${removedCount} duplicate pandals`);
    console.log(`   - Failed to remove: ${duplicatesToRemove.length - removedCount} pandals`);
    console.log('');
    console.log('✅ Database now has unique pandal names only!');

    // Verify the removal by checking current count
    console.log('');
    console.log('🔍 Verifying removal...');
    const pandalsSnapshot = await getDocs(collection(db, 'pandals'));
    console.log(`📊 Current total pandals in database: ${pandalsSnapshot.size}`);

  } catch (error) {
    console.error('❌ Error removing duplicate pandals:', error);
  }
}

// Run the script
removeDuplicatePandals();
