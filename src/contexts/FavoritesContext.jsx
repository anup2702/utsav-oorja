import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    // Get favorites from localStorage or default to empty array
    try {
      const stored = localStorage.getItem('kolkata-pandal-favorites');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      return [];
    }
  });

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('kolkata-pandal-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  const addToFavorites = (pandal) => {
    setFavorites(prev => {
      // Check if pandal is already in favorites
      const isAlreadyFavorite = prev.some(fav => fav.id === pandal.id);
      if (isAlreadyFavorite) {
        return prev; // Don't add if already exists
      }
      return [...prev, pandal];
    });
  };

  const removeFromFavorites = (pandalId) => {
    setFavorites(prev => prev.filter(fav => fav.id !== pandalId));
  };

  const toggleFavorite = (pandal) => {
    const isFavorite = favorites.some(fav => fav.id === pandal.id);
    if (isFavorite) {
      removeFromFavorites(pandal.id);
    } else {
      addToFavorites(pandal);
    }
  };

  const isFavorite = (pandalId) => {
    return favorites.some(fav => fav.id === pandalId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
