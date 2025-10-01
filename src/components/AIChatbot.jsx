import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Phone } from 'lucide-react';
import { generateAIResponse } from '../config/gemini.js';
import { trackAppEvents } from '../utils/analytics.js';

const AIChatbot = ({ pandals }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Namaste! I'm your AI Pandal Assistant. I can help you find the best pandals, suggest routes, and answer questions about Durga Puja 2025. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Real AI response using Gemini API
  const getAIResponse = async (userMessage) => {
    setIsLoading(true);
    
    try {
      const response = await generateAIResponse(userMessage, pandals);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      
      // Fallback response if AI fails
      return `I'm having trouble connecting to my AI brain right now! 😅 But I can still help you with basic information about Durga Puja pandals. Please try asking about:\n\n• Popular pandals\n• Metro routes\n• Timings\n• Crowd levels\n\nOr try again in a moment! 🙏`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Track AI chat message
    trackAppEvents.aiChatMessage(inputMessage.length);

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    try {
      const botResponse = await getAIResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting right now. Please try again later! 😅",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Track when chatbot is opened
  useEffect(() => {
    trackAppEvents.aiChatStart();
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="bg-white rounded-t-2xl p-4 shadow-lg">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center mr-3">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-baloo font-bold text-text-primary">Your Pujoo Sathi</h2>
            <p className="text-sm font-poppins text-gray-600">Powered by Utsav Oorja</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-white/60 backdrop-blur-sm p-4 overflow-y-auto max-h-96">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-text-primary'
                }`}
              >
                <p className="font-poppins text-sm whitespace-pre-line">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-text-primary max-w-xs px-4 py-3 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="font-poppins text-sm text-gray-600">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="bg-white rounded-b-2xl p-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about pandals, routes, timings..."
              className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 font-poppins text-text-primary placeholder-gray-500"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-amber-600 hover:bg-amber-600/90 disabled:bg-gray-400 text-white p-3 rounded-xl transition-colors duration-200 shadow-lg"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        {/* Quick Suggestions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "Best pandals to visit?",
            "Metro routes?",
            "Crowd timings?",
            "Photo spots?"
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(suggestion)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors duration-200 font-poppins"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
