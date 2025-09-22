# 🤖 AI Chatbot Setup Guide

The Kolkata Durga Puja app now includes a **real AI chatbot** powered by Google Gemini AI!

## 🚀 Quick Setup

### 1. Get Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Add Environment Variable
Create a `.env` file in your project root directory:

```bash
# Google Gemini AI API Key
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

**Important:** Replace `your_gemini_api_key_here` with your actual API key.

### 3. Restart Development Server
```bash
npm start
```

## ✨ AI Features

### **What the AI Can Do:**
- 🎭 **Pandal Recommendations** - Suggests best pandals based on votes and popularity
- 🚇 **Route Planning** - Provides metro routes and station information
- ⏰ **Timing Advice** - Suggests best times to visit pandals
- 👥 **Crowd Information** - Tells you about crowd levels and peak hours
- 📸 **Photo Spots** - Recommends Instagram-worthy locations
- 🌍 **Multi-language** - Responds in English, Hindi, and Bengali
- 💬 **Natural Conversation** - Understands context and provides helpful responses

### **Example Queries:**
- "What are the most popular pandals?"
- "How do I reach Kumartuli Park by metro?"
- "When is the best time to visit pandals?"
- "Which pandals have the best photo spots?"
- "Tell me about crowd levels at different times"

## 🔧 Technical Details

### **AI Model:** 
- **Gemini Pro** - Google's latest large language model
- **Context-aware** - Uses live pandal data from Firebase
- **Real-time responses** - No hard-coded responses

### **Fallback System:**
If the AI is unavailable, the chatbot provides helpful fallback responses to ensure users always get assistance.

### **Error Handling:**
- Graceful degradation when API is down
- User-friendly error messages
- Automatic retry suggestions

## 🛠️ Troubleshooting

### **Common Issues:**

1. **"API Key not found"**
   - Make sure your `.env` file is in the project root
   - Check that the variable name is exactly `REACT_APP_GEMINI_API_KEY`
   - Restart your development server

2. **"AI responses not working"**
   - Verify your API key is valid
   - Check your internet connection
   - Look at browser console for error messages

3. **"Slow responses"**
   - This is normal for AI responses (1-3 seconds)
   - The AI is processing complex requests in real-time

## 🔒 Security Notes

- **Never commit your API key** to version control
- **Add `.env` to `.gitignore`** to keep your key secure
- **Use environment variables** in production deployments
- **Monitor API usage** in Google AI Studio dashboard

## 📊 API Usage

The Gemini API has generous free tier limits:
- **Free tier:** 15 requests per minute
- **Paid tier:** Higher limits available
- **Cost:** Very affordable for typical usage

## 🎯 Next Steps

Once set up, your AI chatbot will:
1. **Learn from your pandal data** automatically
2. **Provide intelligent responses** to user queries
3. **Enhance user experience** with personalized recommendations
4. **Scale with your app** as you add more pandals

Enjoy your intelligent Durga Puja assistant! 🎭✨
