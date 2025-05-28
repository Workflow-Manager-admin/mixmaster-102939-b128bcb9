import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  favorites: [],
};

// Actions
const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
const LOAD_FAVORITES = 'LOAD_FAVORITES';

// Reducer
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      // Prevent adding duplicates
      if (state.favorites.find(fav => fav.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.id !== action.payload),
      };
    case LOAD_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };
    default:
      return state;
  }
};

// Create the context
const FavoritesContext = createContext();

// Provider component
export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('mixmaster_favorites');
    if (storedFavorites) {
      dispatch({
        type: LOAD_FAVORITES,
        payload: JSON.parse(storedFavorites),
      });
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('mixmaster_favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  // Add a cocktail to favorites
  const addToFavorites = (cocktail) => {
    dispatch({ type: ADD_FAVORITE, payload: cocktail });
  };

  // Remove a cocktail from favorites
  const removeFromFavorites = (id) => {
    dispatch({ type: REMOVE_FAVORITE, payload: id });
  };

  // Check if a cocktail is in favorites
  const isFavorite = (id) => {
    return state.favorites.some(fav => fav.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites: state.favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the favorites context
export const useFavoritesContext = () => {
  return useContext(FavoritesContext);
};
