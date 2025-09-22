// Test file for Favorites functionality
// This file can be used to test the favorites system

// Test function to verify favorites work
export const testFavorites = () => {
  console.log('Testing Favorites functionality...');
  
  try {
    // Test localStorage operations
    const testPandal = {
      id: 'test-1',
      name: 'Test Pandal',
      location: 'Park Street, Kolkata',
      votes: 100
    };
    
    // Test adding to favorites
    const favorites = JSON.parse(localStorage.getItem('kolkata-pandal-favorites') || '[]');
    console.log('Current favorites:', favorites);
    
    // Test adding a pandal
    const newFavorites = [...favorites, testPandal];
    localStorage.setItem('kolkata-pandal-favorites', JSON.stringify(newFavorites));
    console.log('Added test pandal to favorites');
    
    // Test removing from favorites
    const filteredFavorites = newFavorites.filter(fav => fav.id !== testPandal.id);
    localStorage.setItem('kolkata-pandal-favorites', JSON.stringify(filteredFavorites));
    console.log('Removed test pandal from favorites');
    
    return true;
  } catch (error) {
    console.error('Favorites test failed:', error);
    return false;
  }
};

// Uncomment the line below to run the test
// testFavorites();
