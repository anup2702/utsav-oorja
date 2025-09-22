// Simple test file to verify Gemini AI integration
import { generateAIResponse } from './config/gemini.js';

// Test function (only run if API key is available)
export const testAI = async () => {
  const testPandals = [
    {
      name: "Kumartuli Park",
      location: "Kumartuli, Kolkata",
      votes: 150,
      timings: "6:00 AM - 11:00 PM",
      metroStation: { name: "Shobhabazar Sutanuti" },
      crowdStatus: "Medium",
      instagrammableSpots: "Traditional clay idol making process"
    }
  ];

  try {
    console.log("🤖 Testing AI integration...");
    const response = await generateAIResponse("What are the most popular pandals?", testPandals);
    console.log("✅ AI Response:", response);
    return true;
  } catch (error) {
    console.log("❌ AI Test Failed:", error.message);
    console.log("💡 Make sure to set REACT_APP_GEMINI_API_KEY in your .env file");
    return false;
  }
};

// Uncomment the line below to run the test
// testAI();
