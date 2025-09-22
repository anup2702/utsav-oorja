import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || 'your-api-key-here');

// Get the generative model
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate AI response
export const generateAIResponse = async (userMessage, pandals = []) => {
  try {
    // Create context about the app and available data
    const context = `
You are an AI assistant for the Kolkata Durga Puja 2025 app. You help users discover pandals, find routes, and get information about Durga Puja celebrations in Kolkata.

Available pandal data:
${pandals.map(pandal => `
- Name: ${pandal.name}
- Location: ${pandal.location}
- Votes: ${pandal.votes}
- Timings: ${pandal.timings}
- Metro Station: ${pandal.metroStation?.name || 'Not specified'}
- Crowd Status: ${pandal.crowdStatus || 'Not specified'}
- Instagram Spots: ${pandal.instagrammableSpots || 'Not specified'}
`).join('\n')}

Instructions:
1. Be helpful and friendly
2. Use emojis appropriately (🎭, 🙏, 🚇, 📸, etc.)
3. Provide specific information when available
4. If asked about specific pandals, use the data above
5. For general questions about Durga Puja, provide helpful information
6. Keep responses concise but informative
7. Always be respectful of the cultural significance of Durga Puja

User message: ${userMessage}
`;

    const result = await model.generateContent(context);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate AI response');
  }
};
