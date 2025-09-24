// Script to add missing pandals from the comprehensive metro mapping to the database
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

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

// Missing pandals data with metro station information
const missingPandals = [
  // Blue Line pandals
  {
    name: "Noapara Udayan Sangha",
    location: "Noapara, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Noapara+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Noapara+Udayan+Sangha",
    description: "Traditional pandal in Noapara area with cultural heritage and community spirit.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional architecture, cultural performances, community gatherings",
    tips: "Visit during evening for cultural shows and less crowd.",
    metroStation: {
      name: "Noapara",
      line: "Blue",
      distance: "0.3 km",
      walkTime: "4 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Sinthee Sarbojanin",
    location: "Sinthee, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Sinthee+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Sinthee+Sarbojanin",
    description: "Community pandal in Sinthee with traditional celebrations and local culture.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional decorations, community spirit, cultural events",
    tips: "Best time to visit is during evening aarti.",
    metroStation: {
      name: "Dumdum",
      line: "Blue",
      distance: "0.5 km",
      walkTime: "6 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Tala Park",
    location: "Tala, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Tala+Park+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Tala+Park",
    description: "Historic pandal in Tala area with traditional Bengali culture and heritage.",
    crowdStatus: "High",
    instagrammableSpots: "Historic architecture, traditional decorations, cultural performances",
    tips: "Visit early morning for peaceful darshan and good photos.",
    metroStation: {
      name: "Belgachia",
      line: "Blue",
      distance: "0.4 km",
      walkTime: "5 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Tala Prattay",
    location: "Tala, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Tala+Prattay+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Tala+Prattay",
    description: "Traditional pandal in Tala area with community celebrations and cultural heritage.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional architecture, community gatherings, cultural events",
    tips: "Evening time offers the best cultural experience.",
    metroStation: {
      name: "Belgachia",
      line: "Blue",
      distance: "0.7 km",
      walkTime: "8 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Dakshinpara",
    location: "Dakshinpara, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Dakshinpara+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Dakshinpara",
    description: "Community pandal in Dakshinpara with traditional Bengali celebrations.",
    crowdStatus: "Medium",
    instagrammableSpots: "Community spirit, traditional decorations, cultural performances",
    tips: "Visit during evening for cultural shows.",
    metroStation: {
      name: "Belgachia",
      line: "Blue",
      distance: "0.6 km",
      walkTime: "7 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Arjunpur Amra Sabai Club",
    location: "Arjunpur, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Arjunpur+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Arjunpur+Amra+Sabai+Club",
    description: "Youth club pandal in Arjunpur with modern celebrations and community spirit.",
    crowdStatus: "High",
    instagrammableSpots: "Modern decorations, youth activities, community events",
    tips: "Best time to visit is during evening cultural programs.",
    metroStation: {
      name: "Belgachia",
      line: "Blue",
      distance: "1.0 km",
      walkTime: "12 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "DumDum Park Bharat Chakra",
    location: "DumDum Park, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=DumDum+Park+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=DumDum+Park+Bharat+Chakra",
    description: "Patriotic themed pandal in DumDum Park celebrating national unity and heritage.",
    crowdStatus: "High",
    instagrammableSpots: "Patriotic decorations, national symbols, cultural performances",
    tips: "Visit during evening for patriotic cultural shows.",
    metroStation: {
      name: "Belgachia",
      line: "Blue",
      distance: "0.7 km",
      walkTime: "8 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Dumdum Park Sarbajanin",
    location: "DumDum Park, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=DumDum+Park+Sarbajanin+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=DumDum+Park+Sarbajanin",
    description: "Community pandal in DumDum Park with traditional Bengali celebrations.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional architecture, community gatherings, cultural events",
    tips: "Early morning visit offers peaceful darshan.",
    metroStation: {
      name: "Belgachia",
      line: "Blue",
      distance: "0.8 km",
      walkTime: "10 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Dumdum Park Tarun Dal",
    location: "DumDum Park, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=DumDum+Park+Tarun+Dal+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=DumDum+Park+Tarun+Dal",
    description: "Youth organization pandal in DumDum Park with modern celebrations.",
    crowdStatus: "High",
    instagrammableSpots: "Modern decorations, youth activities, cultural performances",
    tips: "Evening time offers the best cultural experience.",
    metroStation: {
      name: "Belgachia",
      line: "Blue",
      distance: "0.8 km",
      walkTime: "10 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Sree Bhumi Sporting Club",
    location: "Sree Bhumi, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Sree+Bhumi+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Sree+Bhumi+Sporting+Club",
    description: "Sports club pandal in Sree Bhumi with athletic theme and community spirit.",
    crowdStatus: "Medium",
    instagrammableSpots: "Sports theme decorations, athletic activities, community events",
    tips: "Visit during evening for sports-themed cultural shows.",
    metroStation: {
      name: "Belgachia",
      line: "Blue",
      distance: "0.8 km",
      walkTime: "10 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Golaghata Sammilani",
    location: "Golaghata, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Golaghata+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Golaghata+Sammilani",
    description: "Traditional pandal in Golaghata with cultural heritage and community celebrations.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional architecture, cultural performances, community gatherings",
    tips: "Best time to visit is during evening aarti.",
    metroStation: {
      name: "Belgachia",
      line: "Blue",
      distance: "0.9 km",
      walkTime: "11 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Telengabagan",
    location: "Telengabagan, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Telengabagan+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Telengabagan",
    description: "Community pandal in Telengabagan with traditional Bengali celebrations.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional decorations, community spirit, cultural events",
    tips: "Visit during evening for cultural shows.",
    metroStation: {
      name: "Belgachia",
      line: "Blue",
      distance: "0.5 km",
      walkTime: "6 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Sikdar Bagan",
    location: "Sikdar Bagan, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Sikdar+Bagan+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Sikdar+Bagan",
    description: "Traditional pandal in Sikdar Bagan with cultural heritage and community spirit.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional architecture, cultural performances, community gatherings",
    tips: "Early morning visit offers peaceful darshan.",
    metroStation: {
      name: "Shyambazar",
      line: "Blue",
      distance: "0.4 km",
      walkTime: "5 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Hatibagan Nabinpally",
    location: "Hatibagan, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Hatibagan+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Hatibagan+Nabinpally",
    description: "New locality pandal in Hatibagan with modern celebrations and community spirit.",
    crowdStatus: "High",
    instagrammableSpots: "Modern decorations, community activities, cultural events",
    tips: "Evening time offers the best cultural experience.",
    metroStation: {
      name: "Shyambazar",
      line: "Blue",
      distance: "0.3 km",
      walkTime: "4 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Nalin Sarkar Street",
    location: "Nalin Sarkar Street, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Nalin+Sarkar+Street+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Nalin+Sarkar+Street",
    description: "Street pandal in Nalin Sarkar Street with traditional Bengali celebrations.",
    crowdStatus: "Medium",
    instagrammableSpots: "Street decorations, traditional architecture, cultural performances",
    tips: "Visit during evening for cultural shows.",
    metroStation: {
      name: "Shyambazar",
      line: "Blue",
      distance: "0.5 km",
      walkTime: "6 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Hatibagan Sarbojonin",
    location: "Hatibagan, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Hatibagan+Sarbojonin+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Hatibagan+Sarbojonin",
    description: "Community pandal in Hatibagan with traditional celebrations and cultural heritage.",
    crowdStatus: "High",
    instagrammableSpots: "Traditional architecture, community gatherings, cultural events",
    tips: "Best time to visit is during evening aarti.",
    metroStation: {
      name: "Shyambazar",
      line: "Blue",
      distance: "0.3 km",
      walkTime: "4 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Sovabazar Rajbari",
    location: "Sovabazar, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Sovabazar+Rajbari+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Sovabazar+Rajbari",
    description: "Royal palace pandal in Sovabazar with historical significance and traditional celebrations.",
    crowdStatus: "High",
    instagrammableSpots: "Royal architecture, historical significance, traditional decorations",
    tips: "Visit early morning for peaceful darshan and historical experience.",
    metroStation: {
      name: "Shobhabazar",
      line: "Blue",
      distance: "0.2 km",
      walkTime: "3 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Jagat Mukherjee Park",
    location: "Jagat Mukherjee Park, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Jagat+Mukherjee+Park+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Jagat+Mukherjee+Park",
    description: "Park pandal in Jagat Mukherjee Park with natural setting and community celebrations.",
    crowdStatus: "Medium",
    instagrammableSpots: "Natural setting, park decorations, community gatherings",
    tips: "Evening time offers the best natural lighting for photos.",
    metroStation: {
      name: "Shobhabazar",
      line: "Blue",
      distance: "0.4 km",
      walkTime: "5 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Kumartuli Sarbojanin",
    location: "Kumartuli, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Kumartuli+Sarbojanin+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Kumartuli+Sarbojanin",
    description: "Traditional pandal in Kumartuli with clay idol making heritage and cultural celebrations.",
    crowdStatus: "High",
    instagrammableSpots: "Clay idol making, traditional architecture, artisan workshops",
    tips: "Visit early morning to see artisans at work and for best photos.",
    metroStation: {
      name: "Shobhabazar",
      line: "Blue",
      distance: "0.3 km",
      walkTime: "4 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Beniatola Sarbojonin",
    location: "Beniatola, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Beniatola+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Beniatola+Sarbojonin",
    description: "Community pandal in Beniatola with traditional Bengali celebrations and cultural heritage.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional decorations, community spirit, cultural performances",
    tips: "Visit during evening for cultural shows.",
    metroStation: {
      name: "Shobhabazar",
      line: "Blue",
      distance: "0.5 km",
      walkTime: "6 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Ahiritola Sarbojonin",
    location: "Ahiritola, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Ahiritola+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Ahiritola+Sarbojonin",
    description: "Traditional pandal in Ahiritola with cultural heritage and community celebrations.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional architecture, cultural performances, community gatherings",
    tips: "Best time to visit is during evening aarti.",
    metroStation: {
      name: "Shobhabazar",
      line: "Blue",
      distance: "0.4 km",
      walkTime: "5 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Jorasanko Sadharan",
    location: "Jorasanko, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Jorasanko+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Jorasanko+Sadharan",
    description: "Traditional pandal in Jorasanko with historical significance and cultural celebrations.",
    crowdStatus: "High",
    instagrammableSpots: "Historical architecture, traditional decorations, cultural performances",
    tips: "Visit early morning for peaceful darshan and historical experience.",
    metroStation: {
      name: "Girish Park",
      line: "Blue",
      distance: "0.3 km",
      walkTime: "4 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Chorebagan Sarbojonin",
    location: "Chorebagan, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Chorebagan+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Chorebagan+Sarbojonin",
    description: "Community pandal in Chorebagan with traditional Bengali celebrations.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional decorations, community spirit, cultural events",
    tips: "Evening time offers the best cultural experience.",
    metroStation: {
      name: "Girish Park",
      line: "Blue",
      distance: "0.4 km",
      walkTime: "5 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Simla Byayam Samity",
    location: "Simla, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Simla+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Simla+Byayam+Samity",
    description: "Sports club pandal in Simla with athletic theme and community spirit.",
    crowdStatus: "Medium",
    instagrammableSpots: "Sports theme decorations, athletic activities, community events",
    tips: "Visit during evening for sports-themed cultural shows.",
    metroStation: {
      name: "Girish Park",
      line: "Blue",
      distance: "0.5 km",
      walkTime: "6 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Chaltabagan Lohapatty",
    location: "Chaltabagan, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Chaltabagan+Lohapatty+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Chaltabagan+Lohapatty",
    description: "Traditional pandal in Chaltabagan with cultural heritage and community celebrations.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional architecture, cultural performances, community gatherings",
    tips: "Best time to visit is during evening aarti.",
    metroStation: {
      name: "Girish Park",
      line: "Blue",
      distance: "0.4 km",
      walkTime: "5 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Muhammad Ali Park",
    location: "Muhammad Ali Park, Central Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Muhammad+Ali+Park+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Muhammad+Ali+Park",
    description: "Historic park pandal with traditional celebrations and cultural heritage.",
    crowdStatus: "High",
    instagrammableSpots: "Historic park setting, traditional decorations, cultural performances",
    tips: "Visit early morning for peaceful darshan in the park setting.",
    metroStation: {
      name: "MG Road",
      line: "Blue",
      distance: "0.3 km",
      walkTime: "4 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Sealdah Athletic Club",
    location: "Sealdah, Central Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Sealdah+Athletic+Club+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Sealdah+Athletic+Club",
    description: "Sports club pandal in Sealdah with athletic theme and community spirit.",
    crowdStatus: "Medium",
    instagrammableSpots: "Sports theme decorations, athletic activities, community events",
    tips: "Visit during evening for sports-themed cultural shows.",
    metroStation: {
      name: "MG Road",
      line: "Blue",
      distance: "0.6 km",
      walkTime: "7 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Subodh Mallick Square",
    location: "Subodh Mallick Square, Central Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Subodh+Mallick+Square+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Subodh+Mallick+Square",
    description: "Square pandal in Subodh Mallick Square with traditional celebrations.",
    crowdStatus: "Medium",
    instagrammableSpots: "Square decorations, traditional architecture, cultural performances",
    tips: "Evening time offers the best cultural experience.",
    metroStation: {
      name: "Central",
      line: "Blue",
      distance: "0.4 km",
      walkTime: "5 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Kapalitola Sarbajanin",
    location: "Kapalitola, Central Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Kapalitola+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Kapalitola+Sarbajanin",
    description: "Community pandal in Kapalitola with traditional Bengali celebrations.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional decorations, community spirit, cultural events",
    tips: "Visit during evening for cultural shows.",
    metroStation: {
      name: "Central",
      line: "Blue",
      distance: "0.3 km",
      walkTime: "4 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Janbazar Rajbari",
    location: "Janbazar, Central Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Janbazar+Rajbari+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Janbazar+Rajbari",
    description: "Royal palace pandal in Janbazar with historical significance and traditional celebrations.",
    crowdStatus: "High",
    instagrammableSpots: "Royal architecture, historical significance, traditional decorations",
    tips: "Visit early morning for peaceful darshan and historical experience.",
    metroStation: {
      name: "Chandni Chowk",
      line: "Blue",
      distance: "0.5 km",
      walkTime: "6 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Taltala Sarbojanin",
    location: "Taltala, Central Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Taltala+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Taltala+Sarbojanin",
    description: "Traditional pandal in Taltala with cultural heritage and community celebrations.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional architecture, cultural performances, community gatherings",
    tips: "Best time to visit is during evening aarti.",
    metroStation: {
      name: "Chandni Chowk",
      line: "Blue",
      distance: "0.4 km",
      walkTime: "5 minutes"
    },
    votes: 0,
    reelURL: ""
  },
  {
    name: "Chakraberia Sarbojanin",
    location: "Chakraberia, Central Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Chakraberia+Kolkata",
    imageURL: "https://via.placeholder.com/400x300/8B4513/ffffff?text=Chakraberia+Sarbojanin",
    description: "Community pandal in Chakraberia with traditional Bengali celebrations.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional decorations, community spirit, cultural events",
    tips: "Evening time offers the best cultural experience.",
    metroStation: {
      name: "Rabindra Sadan",
      line: "Blue",
      distance: "0.6 km",
      walkTime: "7 minutes"
    },
    votes: 0,
    reelURL: ""
  }
];

async function addMissingPandals() {
  try {
    console.log('➕ Starting to add missing pandals to database...');
    console.log('');

    // Get existing pandals to avoid duplicates
    const pandalsSnapshot = await getDocs(collection(db, 'pandals'));
    const existingPandals = new Set();
    
    pandalsSnapshot.forEach(doc => {
      existingPandals.add(doc.data().name);
    });

    console.log(`📊 Existing pandals in database: ${existingPandals.size}`);
    console.log(`🎯 Pandals to add: ${missingPandals.length}`);
    console.log('');

    let addedCount = 0;
    let skippedCount = 0;

    // Add each missing pandal
    for (const pandalData of missingPandals) {
      if (existingPandals.has(pandalData.name)) {
        console.log(`⏭️ Skipped (already exists): ${pandalData.name}`);
        skippedCount++;
        continue;
      }

      // Add new pandal to database
      await addDoc(collection(db, 'pandals'), pandalData);
      
      console.log(`✅ Added: ${pandalData.name}`);
      console.log(`   Metro: ${pandalData.metroStation.name} (${pandalData.metroStation.line} Line)`);
      console.log(`   Location: ${pandalData.location}`);
      console.log('');
      addedCount++;
    }

    console.log('🎉 Missing pandals addition completed!');
    console.log('─'.repeat(60));
    console.log(`✅ Successfully added: ${addedCount} pandals`);
    console.log(`⏭️ Skipped (already exists): ${skippedCount} pandals`);
    console.log(`📊 Total processed: ${missingPandals.length} pandals`);
    console.log('');
    console.log('📱 All new pandals are now available in the app with accurate metro information!');

  } catch (error) {
    console.error('❌ Error adding missing pandals:', error);
  }
}

// Run the script
addMissingPandals();
