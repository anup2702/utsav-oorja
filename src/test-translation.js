// Test file for Google Translate integration
// This file can be used to test the translation service

import translateService from './services/translateService.js';

// Test function to verify translation works
export const testTranslation = async () => {
  console.log('Testing Google Translate integration...');
  
  try {
    // Test translating a simple text
    const testText = "Hello, this is a test pandal in Kolkata";
    const translated = await translateService.translateText(testText, 'hi');
    
    console.log('Original:', testText);
    console.log('Translated to Hindi:', translated);
    
    // Test translating a pandal object
    const testPandal = {
      id: 'test-1',
      name: 'Test Pandal',
      location: 'Park Street, Kolkata',
      description: 'A beautiful test pandal for Durga Puja',
      votes: 100
    };
    
    const translatedPandal = await translateService.translatePandal(testPandal, 'bn');
    console.log('Original Pandal:', testPandal);
    console.log('Translated Pandal:', translatedPandal);
    
    return true;
  } catch (error) {
    console.error('Translation test failed:', error);
    return false;
  }
};

// Uncomment the line below to run the test
// testTranslation();
