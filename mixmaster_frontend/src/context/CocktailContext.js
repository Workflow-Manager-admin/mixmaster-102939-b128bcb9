import React, { createContext, useContext, useState, useReducer } from 'react';
import { cocktailData, liquorTypes } from '../services/mockData';

// Initial state for the cocktail context
const initialState = {
  cocktails: [],
  liquorTypes: [],
  loading: false,
  error: null,
  filters: {
    liquorType: 'all',
    category: 'all',
    searchTerm: '',
  },
  currentCocktail: null,
};

// Reducer for cocktail state
const cocktailReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'SET_COCKTAILS':
      return { ...state, loading: false, cocktails: action.payload };
    case 'SET_LIQUOR_TYPES':
      return { ...state, liquorTypes: action.payload };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_FILTER':
      return { 
        ...state, 
        filters: { 
          ...state.filters, 
          [action.payload.name]: action.payload.value 
        } 
      };
    case 'CLEAR_FILTERS':
      return { 
        ...state, 
        filters: {
          liquorType: 'all',
          category: 'all',
          searchTerm: '',
        } 
      };
    case 'SET_CURRENT_COCKTAIL':
      return { ...state, currentCocktail: action.payload };
    default:
      return state;
  }
};

// Create the context
const CocktailContext = createContext();

// Provider component
export const CocktailProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cocktailReducer, initialState);

  // Load initial data when the component mounts
  React.useEffect(() => {
    loadCocktails();
    loadLiquorTypes();
  }, []);

  // Load cocktails from mock data
  const loadCocktails = () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      // Simulate API call with mock data
      dispatch({ type: 'SET_COCKTAILS', payload: cocktailData });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load cocktails.' });
    }
  };

  // Load liquor types from mock data
  const loadLiquorTypes = () => {
    try {
      dispatch({ type: 'SET_LIQUOR_TYPES', payload: liquorTypes });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load liquor types.' });
    }
  };

  // Set a filter
  const setFilter = (name, value) => {
    dispatch({ type: 'SET_FILTER', payload: { name, value } });
  };

  // Clear all filters
  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  // Get cocktail by ID
  const getCocktailById = (id) => {
    const cocktail = state.cocktails.find((c) => c.id === id);
    dispatch({ type: 'SET_CURRENT_COCKTAIL', payload: cocktail });
    return cocktail;
  };

  // Get filtered cocktails
  const getFilteredCocktails = () => {
    let filtered = [...state.cocktails];
    
    // Filter by liquor type
    if (state.filters.liquorType !== 'all') {
      filtered = filtered.filter(
        (cocktail) => cocktail.liquorType === state.filters.liquorType
      );
    }
    
    // Filter by category
    if (state.filters.category !== 'all') {
      filtered = filtered.filter(
        (cocktail) => cocktail.category === state.filters.category
      );
    }
    
    // Filter by search term
    if (state.filters.searchTerm) {
      filtered = filtered.filter(
        (cocktail) =>
          cocktail.name.toLowerCase().includes(state.filters.searchTerm.toLowerCase()) ||
          cocktail.ingredients.some((ing) =>
            ing.name.toLowerCase().includes(state.filters.searchTerm.toLowerCase())
          )
      );
    }
    
    return filtered;
  };

  return (
    <CocktailContext.Provider
      value={{
        ...state,
        setFilter,
        clearFilters,
        getCocktailById,
        getFilteredCocktails,
      }}
    >
      {children}
    </CocktailContext.Provider>
  );
};

// Custom hook to use the cocktail context
export const useCocktailContext = () => {
  return useContext(CocktailContext);
};
