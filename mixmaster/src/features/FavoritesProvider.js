import React, { createContext, useContext, useState } from "react";

// Mock demo data for cocktails (id, name, short description, ingredient list)
const DEMO_COCKTAILS = [
  { id: "margarita", name: "Margarita", desc: "Tequila, lime, orange liqueur", ingredients: ["Tequila", "Lime Juice", "Cointreau"] },
  { id: "oldfashioned", name: "Old Fashioned", desc: "Whiskey, bitters, sugar", ingredients: ["Whiskey", "Angostura Bitters", "Sugar Cube"] },
  { id: "negroni", name: "Negroni", desc: "Gin, Campari, vermouth", ingredients: ["Gin", "Campari", "Sweet Vermouth"] },
  { id: "mojito", name: "Mojito", desc: "Rum, mint, lime", ingredients: ["White Rum", "Mint", "Lime Juice", "Sugar", "Soda"] },
  { id: "cosmopolitan", name: "Cosmopolitan", desc: "Vodka, cranberry, lime", ingredients: ["Vodka", "Cranberry Juice", "Lime Juice", "Triple Sec"] },
];

// Shopping items = all unique ingredients in demo
const DEMO_SHOPPING_SUGGESTIONS = [
  ...Array.from(new Set(DEMO_COCKTAILS.flatMap(c => c.ingredients))),
].map((ingredient, idx) => ({ id: `shop-${idx}`, name: ingredient }));

const FavoritesContext = createContext();
// PUBLIC_INTERFACE
export function FavoritesProvider({ children }) {
  // List of cocktail ids
  const [favoriteIds, setFavoriteIds] = useState([]);
  // Shopping list: array of {id, name, purchased}
  const [shoppingList, setShoppingList] = useState([]);

  // Add to favorites
  const addFavorite = (cocktailId) =>
    setFavoriteIds((prev) => prev.includes(cocktailId) ? prev : [...prev, cocktailId]);
  // Remove from favorites
  const removeFavorite = (cocktailId) =>
    setFavoriteIds((prev) => prev.filter((id) => id !== cocktailId));
  // Toggle favorite
  const toggleFavorite = (cocktailId) =>
    setFavoriteIds((prev) =>
      prev.includes(cocktailId)
        ? prev.filter((id) => id !== cocktailId)
        : [...prev, cocktailId]
    );

  // Add to shopping list (ingredient - string)
  const addToShoppingList = (ingredientName) => {
    setShoppingList((prev) =>
      prev.some((item) => item.name === ingredientName)
        ? prev
        : [...prev, { id: `shop-${Date.now()}-${ingredientName}`, name: ingredientName, purchased: false }]
    );
  };
  // Remove from shopping list
  const removeFromShoppingList = (ingredientName) => {
    setShoppingList((prev) => prev.filter((item) => item.name !== ingredientName));
  };
  // Toggle purchased
  const togglePurchased = (ingredientName) => {
    setShoppingList((prev) =>
      prev.map((item) =>
        item.name === ingredientName
          ? { ...item, purchased: !item.purchased }
          : item
      )
    );
  };
  // For demo: start with a couple of items
  React.useEffect(() => {
    if (shoppingList.length === 0) {
      // Add some demo ingredients at first render
      setShoppingList([
        { id: "shop-0", name: "Lime Juice", purchased: false },
        { id: "shop-1", name: "Vodka", purchased: false },
      ]);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        demoCocktails: DEMO_COCKTAILS,
        demoShopping: DEMO_SHOPPING_SUGGESTIONS,
        favoriteIds,
        shoppingList,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        addToShoppingList,
        removeFromShoppingList,
        togglePurchased,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useFavorites() {
  // For Card-level cocktails (see if it's in favoriteIds)
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return {
    favorites: ctx.demoCocktails.filter((c) => ctx.favoriteIds.includes(c.id)),
    isFavorite: (id) => ctx.favoriteIds.includes(id),
    toggleFavorite: ctx.toggleFavorite,
    addFavorite: ctx.addFavorite,
    removeFavorite: ctx.removeFavorite,
    allCocktails: ctx.demoCocktails,
    favoriteIds: ctx.favoriteIds,
  };
}

// PUBLIC_INTERFACE
export function useShoppingList() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useShoppingList must be used inside FavoritesProvider");
  return {
    shoppingList: ctx.shoppingList,
    addToShoppingList: ctx.addToShoppingList,
    removeFromShoppingList: ctx.removeFromShoppingList,
    togglePurchased: ctx.togglePurchased,
    demoShopping: ctx.demoShopping,
  };
}
