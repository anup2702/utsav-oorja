// Google Translate Service for dynamic content translation
class TranslateService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;
    this.baseUrl = 'https://translation.googleapis.com/language/translate/v2';
    this.cache = new Map(); // Simple cache to avoid repeated API calls
  }

  // Get language code for Google Translate API
  getGoogleLanguageCode(language) {
    const languageMap = {
      'en': 'en',
      'hi': 'hi',
      'bn': 'bn'
    };
    return languageMap[language] || 'en';
  }

  // Translate text using Google Translate API
  async translateText(text, targetLanguage, sourceLanguage = 'en') {
    if (!text || !text.trim()) return text;
    
    // Check cache first
    const cacheKey = `${text}_${sourceLanguage}_${targetLanguage}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // If target language is English, return original text
    if (targetLanguage === 'en') {
      this.cache.set(cacheKey, text);
      return text;
    }

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: sourceLanguage,
          target: targetLanguage,
          format: 'text'
        })
      });

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }

      const data = await response.json();
      const translatedText = data.data.translations[0].translatedText;
      
      // Cache the result
      this.cache.set(cacheKey, translatedText);
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      // Return original text if translation fails
      return text;
    }
  }

  // Translate an object with multiple text fields
  async translateObject(obj, targetLanguage, fieldsToTranslate = []) {
    if (targetLanguage === 'en') return obj;

    const translatedObj = { ...obj };
    
    for (const field of fieldsToTranslate) {
      if (obj[field] && typeof obj[field] === 'string') {
        translatedObj[field] = await this.translateText(obj[field], targetLanguage);
      }
    }
    
    return translatedObj;
  }

  // Translate pandal data
  async translatePandal(pandal, targetLanguage) {
    const fieldsToTranslate = ['name', 'location', 'description', 'instagrammableSpots'];
    return await this.translateObject(pandal, targetLanguage, fieldsToTranslate);
  }

  // Translate array of pandals
  async translatePandals(pandals, targetLanguage) {
    if (targetLanguage === 'en') return pandals;
    
    const translatedPandals = await Promise.all(
      pandals.map(pandal => this.translatePandal(pandal, targetLanguage))
    );
    
    return translatedPandals;
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }
}

// Create singleton instance
const translateService = new TranslateService();

export default translateService;
