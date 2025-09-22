// Script to populate Firestore with sample Durga Puja pandal data
// Run this script after setting up your Firebase project

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Your Firebase configuration - replace with your actual config
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

const samplePandals = [
  {
    name: "Kumartuli Park",
    location: "Kumartuli, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Kumartuli+Park+Kolkata",
    imageURL: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    votes: 1250
  },
  {
    name: "College Square",
    location: "College Street, Central Kolkata",
    timings: "5:30 AM - 12:00 AM",
    mapsLink: "https://maps.google.com/?q=College+Square+Kolkata",
    imageURL: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
    votes: 1180
  },
  {
    name: "Santosh Mitra Square",
    location: "Bowbazar, Central Kolkata",
    timings: "6:00 AM - 11:30 PM",
    mapsLink: "https://maps.google.com/?q=Santosh+Mitra+Square+Kolkata",
    imageURL: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    votes: 1100
  },
  {
    name: "Md. Ali Park",
    location: "Park Street, Central Kolkata",
    timings: "5:00 AM - 12:00 AM",
    mapsLink: "https://maps.google.com/?q=Md+Ali+Park+Kolkata",
    imageURL: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
    votes: 1050
  },
  {
    name: "Baghbazar Sarbojanin",
    location: "Baghbazar, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Baghbazar+Sarbojanin+Kolkata",
    imageURL: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    votes: 980
  },
  {
    name: "Ekbalpore",
    location: "Ekbalpore, South Kolkata",
    timings: "5:30 AM - 11:30 PM",
    mapsLink: "https://maps.google.com/?q=Ekbalpore+Kolkata",
    imageURL: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
    votes: 920
  },
  {
    name: "Suruchi Sangha",
    location: "New Alipore, South Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Suruchi+Sangha+New+Alipore+Kolkata",
    imageURL: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    votes: 890
  },
  {
    name: "Ballygunge Cultural",
    location: "Ballygunge, South Kolkata",
    timings: "5:00 AM - 12:00 AM",
    mapsLink: "https://maps.google.com/?q=Ballygunge+Cultural+Kolkata",
    imageURL: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
    votes: 850
  },
  {
    name: "Tridhara Sammilani",
    location: "Bhowanipore, South Kolkata",
    timings: "6:00 AM - 11:30 PM",
    mapsLink: "https://maps.google.com/?q=Tridhara+Sammilani+Kolkata",
    imageURL: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    votes: 820
  },
  {
    name: "Jodhpur Park",
    location: "Jodhpur Park, South Kolkata",
    timings: "5:30 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Jodhpur+Park+Kolkata",
    imageURL: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
    votes: 780
  },
  {
    name: "Baghajatin",
    location: "Baghajatin, South Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Baghajatin+Kolkata",
    imageURL: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    votes: 750
  },
  {
    name: "Deshapriya Park",
    location: "Deshapriya Park, South Kolkata",
    timings: "5:00 AM - 12:00 AM",
    mapsLink: "https://maps.google.com/?q=Deshapriya+Park+Kolkata",
    imageURL: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
    votes: 720
  },
  {
    name: "Hindustan Park",
    location: "Hindustan Park, South Kolkata",
    timings: "6:00 AM - 11:30 PM",
    mapsLink: "https://maps.google.com/?q=Hindustan+Park+Kolkata",
    imageURL: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    votes: 680
  },
  {
    name: "Ballygunge Place",
    location: "Ballygunge Place, South Kolkata",
    timings: "5:30 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Ballygunge+Place+Kolkata",
    imageURL: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
    votes: 650
  },
  {
    name: "Lake Town",
    location: "Lake Town, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Lake+Town+Kolkata",
    imageURL: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    votes: 620
  },
  {
    name: "Salt Lake",
    location: "Salt Lake, East Kolkata",
    timings: "5:00 AM - 12:00 AM",
    mapsLink: "https://maps.google.com/?q=Salt+Lake+Kolkata",
    imageURL: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
    votes: 580
  },
  {
    name: "New Market",
    location: "New Market, Central Kolkata",
    timings: "6:00 AM - 11:30 PM",
    mapsLink: "https://maps.google.com/?q=New+Market+Kolkata",
    imageURL: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    votes: 550
  },
  {
    name: "Gariahat",
    location: "Gariahat, South Kolkata",
    timings: "5:30 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Gariahat+Kolkata",
    imageURL: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
    votes: 520
  },
  {
    name: "Rashbehari Avenue",
    location: "Rashbehari Avenue, South Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Rashbehari+Avenue+Kolkata",
    imageURL: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    votes: 490
  },
  {
    name: "Kalighat",
    location: "Kalighat, South Kolkata",
    timings: "5:00 AM - 12:00 AM",
    mapsLink: "https://maps.google.com/?q=Kalighat+Kolkata",
    imageURL: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
    votes: 450
  }
];

async function populateDatabase() {
  try {
    console.log('Starting to populate Firestore database...');
    
    for (const pandal of samplePandals) {
      await addDoc(collection(db, 'pandals'), pandal);
      console.log(`Added: ${pandal.name}`);
    }
    
    console.log('✅ Successfully populated database with sample data!');
  } catch (error) {
    console.error('❌ Error populating database:', error);
  }
}

// Run the population script
populateDatabase();
