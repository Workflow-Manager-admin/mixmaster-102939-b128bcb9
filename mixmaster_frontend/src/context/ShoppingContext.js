import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  items: [],
};

// Actions
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const LOAD_ITEMS = 'LOAD_ITEMS';
const CLEAR_ITEMS = 'CLEAR_ITEMS';

// Reducer
const shoppingReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const existingItemIndex = state.items.findIndex(
        item => item.name.toLowerCase() === action.payload.name.toLowerCase()
      );

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity
        };
        return { ...state, items: updatedItems };
      } else {
        // New item, add to list
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
    }
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item => 
          item.id === action.payload.id 
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case LOAD_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case CLEAR_ITEMS:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

// Create the context
const ShoppingContext = createContext();

// Provider component
export const ShoppingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingReducer, initialState);

  // Load shopping list from localStorage on component mount
  useEffect(() => {
    const storedItems = localStorage.getItem('mixmaster_shopping');
    if (storedItems) {
      dispatch({
        type: LOAD_ITEMS,
        payload: JSON.parse(storedItems),
      });
    }
  }, []);

  // Save shopping list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mixmaster_shopping', JSON.stringify(state.items));
  }, [state.items]);

  // Add an item to shopping list
  const addItem = (item) => {
    // Generate a unique ID if one doesn't exist
    const itemWithId = {
      ...item,
      id: item.id || `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      quantity: item.quantity || 1,
    };
    dispatch({ type: ADD_ITEM, payload: itemWithId });
  };

  // Remove an item from shopping list
  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: id });
  };

  // Update item quantity
  const updateQuantity = (id, quantity) => {
    dispatch({ type: UPDATE_QUANTITY, payload: { id, quantity } });
  };

  // Clear shopping list
  const clearItems = () => {
    dispatch({ type: CLEAR_ITEMS });
  };

  return (
    <ShoppingContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearItems,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

// Custom hook to use the shopping context
export const useShoppingContext = () => {
  return useContext(ShoppingContext);
};
