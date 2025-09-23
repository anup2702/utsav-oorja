// Comprehensive script to update all pandal data with local images and enhanced details
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

// Complete pandal data with local images
const completePandalData = [
  {
    name: "Kumartuli Park Sarbojanin",
    location: "Kumartuli, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Kumartuli+Park+Kolkata",
    imageURL: "/images/kumartulipark-sarbojanin.jpg",
    description: "Traditional clay idol making hub with artisan workshops and heritage charm. Experience the authentic process of Durga idol creation.",
    crowdStatus: "High",
    instagrammableSpots: "Traditional clay idol making, artisan workshops, heritage architecture, working artisans",
    tips: "Visit early morning for best photos and less crowd. Watch artisans at work. Best time: 7-9 AM.",
    metroStation: {
      name: "Shyambazar",
      line: "North-South",
      distance: "0.8 km",
      walkTime: "10 minutes"
    },
    votes: 1250
  },
  {
    name: "College Square Sarbojanin",
    location: "College Street, Central Kolkata",
    timings: "5:30 AM - 12:00 AM",
    mapsLink: "https://maps.google.com/?q=College+Square+Kolkata",
    imageURL: "/images/collegesquare.jpg",
    description: "Historic pandal with beautiful water reflections and traditional architecture. One of the most iconic pandals in Kolkata.",
    crowdStatus: "High",
    instagrammableSpots: "Reflection in water, traditional architecture, evening lighting, historic setting",
    tips: "Evening visits offer beautiful lighting for photos. Best time is 6-8 PM. Very crowded during peak hours.",
    metroStation: {
      name: "Central",
      line: "East-West",
      distance: "0.5 km",
      walkTime: "6 minutes"
    },
    votes: 1180
  },
  {
    name: "Santosh Mitra Square",
    location: "Bowbazar, Central Kolkata",
    timings: "6:00 AM - 11:30 PM",
    mapsLink: "https://maps.google.com/?q=Santosh+Mitra+Square+Kolkata",
    imageURL: "/images/santoshmitrasqaure.jpeg",
    description: "Cultural hub with intricate decorations and traditional performances. Known for its artistic themes and cultural programs.",
    crowdStatus: "Medium",
    instagrammableSpots: "Intricate decorations, cultural performances, traditional setup, artistic themes",
    tips: "Check for cultural programs in the evening. Less crowded than major pandals. Good for photography.",
    metroStation: {
      name: "Bowbazar",
      line: "East-West",
      distance: "0.3 km",
      walkTime: "4 minutes"
    },
    votes: 1100
  },
  {
    name: "AJ Block Salt Lake Karunamoyee",
    location: "AJ Block, Salt Lake, East Kolkata",
    timings: "5:00 AM - 12:00 AM",
    mapsLink: "https://maps.google.com/?q=AJ+Block+Salt+Lake+Kolkata",
    imageURL: "/images/ajblock-saltlake-karunamoyee.jpg",
    description: "Modern pandal in Salt Lake with contemporary themes and spacious setup. Features innovative designs and community participation.",
    crowdStatus: "Medium",
    instagrammableSpots: "Modern architecture, spacious setup, contemporary themes, innovative designs",
    tips: "Great for family visits. Parking available nearby. Less crowded than city pandals. Good for children.",
    metroStation: {
      name: "Karunamoyee",
      line: "Blue",
      distance: "0.2 km",
      walkTime: "3 minutes"
    },
    votes: 950
  },
  {
    name: "New Town Sarbojanin",
    location: "New Town, North 24 Parganas",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=New+Town+Kolkata",
    imageURL: "/images/newtown-sarbojanin.jpg",
    description: "Contemporary pandal in New Town with modern design and cultural fusion. Showcases the new face of Kolkata's Durga Puja celebrations.",
    crowdStatus: "Low",
    instagrammableSpots: "Modern design, cultural fusion, contemporary art, new age architecture",
    tips: "Newer area with modern facilities. Good for photography with less crowd. Family-friendly environment.",
    metroStation: {
      name: "New Town",
      line: "Blue",
      distance: "0.4 km",
      walkTime: "5 minutes"
    },
    votes: 850
  },
  {
    name: "FD Block Salt Lake",
    location: "FD Block, Salt Lake, East Kolkata",
    timings: "6:00 AM - 11:30 PM",
    mapsLink: "https://maps.google.com/?q=FD+Block+Salt+Lake+Kolkata",
    imageURL: "/images/fdblock-saltlake.jpg",
    description: "Community pandal in FD Block with local charm and traditional celebrations. Emphasizes community participation and local culture.",
    crowdStatus: "Low",
    instagrammableSpots: "Community spirit, local charm, traditional celebrations, neighborhood participation",
    tips: "Authentic local experience. Great for understanding community celebrations. Less commercialized.",
    metroStation: {
      name: "Karunamoyee",
      line: "Blue",
      distance: "0.6 km",
      walkTime: "8 minutes"
    },
    votes: 750
  },
  {
    name: "AK Block Karunamoyee",
    location: "AK Block, Salt Lake, East Kolkata",
    timings: "5:30 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=AK+Block+Salt+Lake+Kolkata",
    imageURL: "/images/akblock-karunamoyee.jpg",
    description: "Vibrant pandal in AK Block with colorful decorations and festive atmosphere. Known for its enthusiastic community participation.",
    crowdStatus: "Medium",
    instagrammableSpots: "Colorful decorations, festive atmosphere, community participation, vibrant themes",
    tips: "Vibrant decorations and good community participation. Evening visits recommended. Great for family photos.",
    metroStation: {
      name: "Karunamoyee",
      line: "Blue",
      distance: "0.3 km",
      walkTime: "4 minutes"
    },
    votes: 800
  },
  {
    name: "Baghbazar Sarbojanin",
    location: "Baghbazar, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Baghbazar+Kolkata",
    imageURL: "/images/baghbazarsarbojanin",
    description: "Historic pandal in Baghbazar with traditional Bengali architecture and cultural heritage. One of the oldest community pandals in Kolkata.",
    crowdStatus: "High",
    instagrammableSpots: "Traditional Bengali architecture, historic setting, cultural heritage, community spirit",
    tips: "Visit during evening for traditional lighting. Very crowded during peak hours. Rich cultural history.",
    metroStation: {
      name: "Shyambazar",
      line: "North-South",
      distance: "0.5 km",
      walkTime: "6 minutes"
    },
    votes: 1200
  },
  {
    name: "Deshapriya Park",
    location: "Deshapriya Park, South Kolkata",
    timings: "5:30 AM - 12:00 AM",
    mapsLink: "https://maps.google.com/?q=Deshapriya+Park+Kolkata",
    imageURL: "/images/deshapriyapark.webp",
    description: "Popular pandal in South Kolkata with modern themes and artistic decorations. Known for its innovative designs and community participation.",
    crowdStatus: "High",
    instagrammableSpots: "Modern themes, artistic decorations, innovative designs, community participation",
    tips: "Very popular pandal with long queues. Visit early morning or late evening. Great for photography.",
    metroStation: {
      name: "Kalighat",
      line: "North-South",
      distance: "0.8 km",
      walkTime: "10 minutes"
    },
    votes: 1350
  },
  {
    name: "Ekbalpore",
    location: "Ekbalpore, South Kolkata",
    timings: "6:00 AM - 11:30 PM",
    mapsLink: "https://maps.google.com/?q=Ekbalpore+Kolkata",
    imageURL: "/images/ekbalpore.webp",
    description: "Community pandal in Ekbalpore with local charm and traditional celebrations. Emphasizes neighborhood participation and cultural heritage.",
    crowdStatus: "Medium",
    instagrammableSpots: "Local charm, traditional celebrations, neighborhood participation, cultural heritage",
    tips: "Authentic local experience. Less crowded than major pandals. Good for understanding community celebrations.",
    metroStation: {
      name: "Maidan",
      line: "North-South",
      distance: "1.2 km",
      walkTime: "15 minutes"
    },
    votes: 900
  },
  {
    name: "Kalighat",
    location: "Kalighat, South Kolkata",
    timings: "5:00 AM - 12:00 AM",
    mapsLink: "https://maps.google.com/?q=Kalighat+Temple+Kolkata",
    imageURL: "/images/kalighat.webp",
    description: "Sacred pandal near Kalighat Temple with religious significance and traditional rituals. Combines spiritual experience with festive celebrations.",
    crowdStatus: "Very High",
    instagrammableSpots: "Religious significance, traditional rituals, spiritual atmosphere, temple architecture",
    tips: "Very crowded due to temple proximity. Visit early morning for peaceful experience. Respect religious sentiments.",
    metroStation: {
      name: "Kalighat",
      line: "North-South",
      distance: "0.3 km",
      walkTime: "4 minutes"
    },
    votes: 1500
  },
  {
    name: "Md. Ali Park",
    location: "Md. Ali Park, Central Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Md+Ali+Park+Kolkata",
    imageURL: "/images/mdalipark.jpeg",
    description: "Historic pandal in Md. Ali Park with traditional architecture and cultural programs. Known for its artistic themes and community involvement.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional architecture, cultural programs, artistic themes, community involvement",
    tips: "Good for cultural programs. Less crowded than major pandals. Great for photography with traditional themes.",
    metroStation: {
      name: "Central",
      line: "East-West",
      distance: "0.7 km",
      walkTime: "9 minutes"
    },
    votes: 1000
  },
  {
    name: "Suruchi Sangha",
    location: "Suruchi Sangha, South Kolkata",
    timings: "5:30 AM - 11:30 PM",
    mapsLink: "https://maps.google.com/?q=Suruchi+Sangha+Kolkata",
    imageURL: "/images/suruchisangha.webp",
    description: "Artistic pandal by Suruchi Sangha with creative themes and innovative designs. Known for its unique artistic approach and cultural programs.",
    crowdStatus: "High",
    instagrammableSpots: "Creative themes, innovative designs, artistic approach, cultural programs",
    tips: "Very popular for its artistic themes. Long queues expected. Visit during off-peak hours for better experience.",
    metroStation: {
      name: "Kalighat",
      line: "North-South",
      distance: "0.6 km",
      walkTime: "8 minutes"
    },
    votes: 1300
  },
  {
    name: "Noapara Sarbojanin",
    location: "Noapara, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Noapara+Kolkata",
    imageURL: "/images/noapara-sarbojanin.jpg",
    description: "Community pandal in Noapara with traditional celebrations and local charm. Known for its neighborhood participation and cultural programs.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional celebrations, local charm, neighborhood participation, cultural programs",
    tips: "Good for family visits. Less crowded than city pandals. Authentic local experience.",
    metroStation: {
      name: "Noapara",
      line: "Yellow",
      distance: "0.2 km",
      walkTime: "3 minutes"
    },
    votes: 700
  },
  {
    name: "Dum Dum Cantonment",
    location: "Dum Dum Cantonment, North Kolkata",
    timings: "5:30 AM - 11:30 PM",
    mapsLink: "https://maps.google.com/?q=Dum+Dum+Cantonment+Kolkata",
    imageURL: "/images/dumdum-cantonment.jpg",
    description: "Historic pandal in Dum Dum Cantonment area with military heritage and traditional celebrations. Combines cultural heritage with community spirit.",
    crowdStatus: "Medium",
    instagrammableSpots: "Military heritage, traditional celebrations, cultural heritage, community spirit",
    tips: "Rich historical significance. Good for understanding local culture. Less crowded than major pandals.",
    metroStation: {
      name: "Dum Dum Cantonment",
      line: "Yellow",
      distance: "0.4 km",
      walkTime: "5 minutes"
    },
    votes: 800
  },
  {
    name: "Jessore Road Community",
    location: "Jessore Road, North Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Jessore+Road+Kolkata",
    imageURL: "/images/jessore-road-community.jpg",
    description: "Vibrant community pandal on Jessore Road with colorful decorations and festive atmosphere. Known for its enthusiastic local participation.",
    crowdStatus: "High",
    instagrammableSpots: "Colorful decorations, festive atmosphere, local participation, vibrant themes",
    tips: "Very popular with locals. Evening visits recommended for best experience. Great for photography.",
    metroStation: {
      name: "Jessore Road",
      line: "Yellow",
      distance: "0.3 km",
      walkTime: "4 minutes"
    },
    votes: 950
  },
  {
    name: "Airport Area Sarbojanin",
    location: "Near Airport, North Kolkata",
    timings: "5:00 AM - 12:00 AM",
    mapsLink: "https://maps.google.com/?q=Kolkata+Airport+Area",
    imageURL: "/images/airport-area-sarbojanin.jpg",
    description: "Modern pandal near airport area with contemporary themes and spacious setup. Features innovative designs and community participation.",
    crowdStatus: "Low",
    instagrammableSpots: "Modern themes, spacious setup, contemporary designs, community participation",
    tips: "Great for family visits. Less crowded than city pandals. Good parking facilities available.",
    metroStation: {
      name: "Jai Hind (Airport)",
      line: "Yellow",
      distance: "0.5 km",
      walkTime: "6 minutes"
    },
    votes: 650
  },
  {
    name: "Joka Sarbojanin",
    location: "Joka, South Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Joka+Kolkata",
    imageURL: "/images/joka-sarbojanin.jpg",
    description: "Community pandal in Joka with traditional celebrations and local charm. Known for its neighborhood participation and cultural heritage.",
    crowdStatus: "Medium",
    instagrammableSpots: "Traditional celebrations, local charm, neighborhood participation, cultural heritage",
    tips: "Good for family visits. Less crowded than city pandals. Authentic local experience.",
    metroStation: {
      name: "Joka",
      line: "Purple",
      distance: "0.3 km",
      walkTime: "4 minutes"
    },
    votes: 750
  },
  {
    name: "Thakurpukur Community",
    location: "Thakurpukur, South Kolkata",
    timings: "5:30 AM - 11:30 PM",
    mapsLink: "https://maps.google.com/?q=Thakurpukur+Kolkata",
    imageURL: "/images/thakurpukur-community.jpg",
    description: "Vibrant community pandal in Thakurpukur with colorful decorations and festive atmosphere. Known for its enthusiastic local participation.",
    crowdStatus: "High",
    instagrammableSpots: "Colorful decorations, festive atmosphere, local participation, vibrant themes",
    tips: "Very popular with locals. Evening visits recommended for best experience. Great for photography.",
    metroStation: {
      name: "Thakurpukur",
      line: "Purple",
      distance: "0.2 km",
      walkTime: "3 minutes"
    },
    votes: 900
  },
  {
    name: "Sakherbazar Sarbojanin",
    location: "Sakherbazar, South Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Sakherbazar+Kolkata",
    imageURL: "/images/sakherbazar-sarbojanin.jpg",
    description: "Traditional pandal in Sakherbazar with cultural heritage and community spirit. Emphasizes local traditions and neighborhood participation.",
    crowdStatus: "Medium",
    instagrammableSpots: "Cultural heritage, community spirit, local traditions, neighborhood participation",
    tips: "Rich cultural significance. Good for understanding local traditions. Less crowded than major pandals.",
    metroStation: {
      name: "Sakherbazar",
      line: "Purple",
      distance: "0.4 km",
      walkTime: "5 minutes"
    },
    votes: 800
  },
  {
    name: "Behala Chowrasta",
    location: "Behala Chowrasta, South Kolkata",
    timings: "5:30 AM - 12:00 AM",
    mapsLink: "https://maps.google.com/?q=Behala+Chowrasta+Kolkata",
    imageURL: "/images/behala-chowrasta.jpg",
    description: "Historic pandal at Behala Chowrasta with traditional architecture and cultural programs. Known for its artistic themes and community involvement.",
    crowdStatus: "High",
    instagrammableSpots: "Traditional architecture, cultural programs, artistic themes, community involvement",
    tips: "Very popular pandal with long queues. Visit early morning or late evening. Great for photography.",
    metroStation: {
      name: "Behala Chowrasta",
      line: "Purple",
      distance: "0.1 km",
      walkTime: "2 minutes"
    },
    votes: 1100
  },
  {
    name: "Behala Bazar Community",
    location: "Behala Bazar, South Kolkata",
    timings: "6:00 AM - 11:30 PM",
    mapsLink: "https://maps.google.com/?q=Behala+Bazar+Kolkata",
    imageURL: "/images/behala-bazar-community.jpg",
    description: "Community pandal in Behala Bazar with local charm and traditional celebrations. Emphasizes neighborhood participation and cultural heritage.",
    crowdStatus: "Medium",
    instagrammableSpots: "Local charm, traditional celebrations, neighborhood participation, cultural heritage",
    tips: "Authentic local experience. Less crowded than major pandals. Good for understanding community celebrations.",
    metroStation: {
      name: "Behala Bazar",
      line: "Purple",
      distance: "0.3 km",
      walkTime: "4 minutes"
    },
    votes: 850
  },
  {
    name: "Taratala Sarbojanin",
    location: "Taratala, South Kolkata",
    timings: "5:30 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Taratala+Kolkata",
    imageURL: "/images/taratala-sarbojanin.jpg",
    description: "Traditional pandal in Taratala with cultural significance and community spirit. Known for its artistic decorations and local participation.",
    crowdStatus: "Medium",
    instagrammableSpots: "Cultural significance, community spirit, artistic decorations, local participation",
    tips: "Good for cultural programs. Less crowded than major pandals. Great for photography with traditional themes.",
    metroStation: {
      name: "Taratala",
      line: "Purple",
      distance: "0.2 km",
      walkTime: "3 minutes"
    },
    votes: 700
  },
  {
    name: "Majerhat Community",
    location: "Majerhat, South Kolkata",
    timings: "6:00 AM - 11:30 PM",
    mapsLink: "https://maps.google.com/?q=Majerhat+Kolkata",
    imageURL: "/images/majerhat-community.jpg",
    description: "Vibrant community pandal in Majerhat with modern themes and artistic decorations. Known for its innovative designs and community participation.",
    crowdStatus: "High",
    instagrammableSpots: "Modern themes, artistic decorations, innovative designs, community participation",
    tips: "Very popular for its artistic themes. Long queues expected. Visit during off-peak hours for better experience.",
    metroStation: {
      name: "Majerhat",
      line: "Purple",
      distance: "0.3 km",
      walkTime: "4 minutes"
    },
    votes: 1000
  },
  {
    name: "Ballygunge Cultural",
    location: "Ballygunge, South Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Ballygunge+Cultural+Kolkata",
    imageURL: "/images/ballygunge-cultural.webp",
    description: "Cultural pandal in Ballygunge with artistic themes and community participation. Known for its creative decorations and cultural programs.",
    crowdStatus: "Medium",
    instagrammableSpots: "Artistic themes, community participation, creative decorations, cultural programs",
    tips: "Good for cultural programs. Less crowded than major pandals. Great for photography with artistic themes.",
    metroStation: {
      name: "Ballygunge",
      line: "North-South",
      distance: "0.3 km",
      walkTime: "4 minutes"
    },
    votes: 850
  },
  {
    name: "Hindustan Park",
    location: "Hindustan Park, South Kolkata",
    timings: "5:30 AM - 11:30 PM",
    mapsLink: "https://maps.google.com/?q=Hindustan+Park+Kolkata",
    imageURL: "/images/hindustan-park.webp",
    description: "Community pandal in Hindustan Park with local charm and traditional celebrations. Emphasizes neighborhood participation and cultural heritage.",
    crowdStatus: "Medium",
    instagrammableSpots: "Local charm, traditional celebrations, neighborhood participation, cultural heritage",
    tips: "Authentic local experience. Less crowded than major pandals. Good for understanding community celebrations.",
    metroStation: {
      name: "Ballygunge",
      line: "North-South",
      distance: "0.5 km",
      walkTime: "6 minutes"
    },
    votes: 750
  },
  {
    name: "Rashbehari Avenue",
    location: "Rashbehari Avenue, South Kolkata",
    timings: "6:00 AM - 11:00 PM",
    mapsLink: "https://maps.google.com/?q=Rashbehari+Avenue+Kolkata",
    imageURL: "/images/rashbehari-avenue.webp",
    description: "Popular pandal on Rashbehari Avenue with modern themes and artistic decorations. Known for its innovative designs and community participation.",
    crowdStatus: "High",
    instagrammableSpots: "Modern themes, artistic decorations, innovative designs, community participation",
    tips: "Very popular pandal with long queues. Visit early morning or late evening. Great for photography.",
    metroStation: {
      name: "Kalighat",
      line: "North-South",
      distance: "0.4 km",
      walkTime: "5 minutes"
    },
    votes: 1200
  },
  {
    name: "Tridhara Sammilani",
    location: "Tridhara Sammilani, South Kolkata",
    timings: "5:30 AM - 12:00 AM",
    mapsLink: "https://maps.google.com/?q=Tridhara+Sammilani+Kolkata",
    imageURL: "/images/tridhara-sammilani.webp",
    description: "Historic pandal by Tridhara Sammilani with traditional architecture and cultural programs. Known for its artistic themes and community involvement.",
    crowdStatus: "High",
    instagrammableSpots: "Traditional architecture, cultural programs, artistic themes, community involvement",
    tips: "Very popular for its artistic themes. Long queues expected. Visit during off-peak hours for better experience.",
    metroStation: {
      name: "Kalighat",
      line: "North-South",
      distance: "0.7 km",
      walkTime: "9 minutes"
    },
    votes: 1300
  }
];

async function updateAllPandalData() {
  try {
    console.log('🚀 Starting comprehensive pandal data update...');
    console.log('📋 This will:');
    console.log('   - Update existing pandals with local images');
    console.log('   - Add new pandals matching the images');
    console.log('   - Enhance all pandals with detailed information');
    console.log('');

    // Get all existing pandals
    const pandalsSnapshot = await getDocs(collection(db, 'pandals'));
    const existingPandals = new Map();
    
    pandalsSnapshot.forEach(doc => {
      existingPandals.set(doc.data().name, { id: doc.id, data: doc.data() });
    });

    let updatedCount = 0;
    let addedCount = 0;

    // Process each pandal in our complete data
    for (const pandalData of completePandalData) {
      const pandalName = pandalData.name;
      
      if (existingPandals.has(pandalName)) {
        // Update existing pandal
        const existingPandal = existingPandals.get(pandalName);
        await updateDoc(doc(db, 'pandals', existingPandal.id), pandalData);
        console.log(`✅ Updated: ${pandalName}`);
        updatedCount++;
      } else {
        // Add new pandal
        await addDoc(collection(db, 'pandals'), pandalData);
        console.log(`➕ Added: ${pandalName}`);
        addedCount++;
      }
    }

    console.log('');
    console.log('🎉 Pandal data update completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Updated: ${updatedCount} pandals`);
    console.log(`   - Added: ${addedCount} new pandals`);
    console.log(`   - Total processed: ${completePandalData.length} pandals`);
    console.log('');
    console.log('🖼️  All pandals now use local images from /images/ folder');
    console.log('📝 Enhanced with detailed descriptions, tips, and metro information');
    console.log('🎯 Ready for production deployment!');

  } catch (error) {
    console.error('❌ Error updating pandal data:', error);
  }
}

// Run the comprehensive update
updateAllPandalData();
