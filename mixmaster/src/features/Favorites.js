import React from "react";
import Card from "../components/Card";
import { useFavorites, useShoppingList } from "./FavoritesProvider";

// PUBLIC_INTERFACE
/**
 * Favorites – List, remove, and add favorite cocktails & link to shopping list.
 */
function Favorites() {
  const {
    favorites,
    allCocktails,
    isFavorite,
    toggleFavorite,
  } = useFavorites();
  const {
    shoppingList,
    addToShoppingList,
    removeFromShoppingList,
  } = useShoppingList();

  const notFavorited = allCocktails.filter((c) => !isFavorite(c.id));

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Your Favorite Cocktails</h2>
      {favorites.length === 0 && (
        <div style={{ color: "#ccc", margin: "1em 0 2em" }}>
          (You haven&apos;t favorited any cocktails yet.)
        </div>
      )}
      {favorites.map((cocktail) => (
        <Card
          key={cocktail.id}
          title={cocktail.name}
          actions={
            <>
              <button
                className="btn"
                style={{ backgroundColor: "#F67280" }}
                onClick={() => toggleFavorite(cocktail.id)}
                aria-label={`Unfavorite ${cocktail.name}`}
              >
                <span role="img" aria-label="Unfavorite">💔</span> Remove Favorite
              </button>
              <button
                className="btn"
                onClick={() =>
                  cocktail.ingredients.forEach((ing) => addToShoppingList(ing))
                }
                aria-label={`Add ingredients for ${cocktail.name} to shopping list`}
              >
                <span role="img" aria-label="Add Ingredients">🛒</span> Add All Ingredients
              </button>
            </>
          }
        >
          <div>
            <span style={{ color: "#aaa" }}>{cocktail.desc}</span>
            <ul style={{ marginTop: 6 }}>
              {cocktail.ingredients.map((ing) => (
                <li key={ing}>
                  {ing}
                  {shoppingList.find(item => item.name === ing) ? (
                    <button
                      className="btn"
                      style={{
                        marginLeft: 8,
                        fontSize: "0.85em",
                        background: "#1A1A2E",
                        color: "#fff"
                      }}
                      onClick={() => removeFromShoppingList(ing)}
                    >
                      Remove from List
                    </button>
                  ) : (
                    <button
                      className="btn"
                      style={{
                        marginLeft: 8,
                        fontSize: "0.85em",
                        background: "#F67280"
                      }}
                      onClick={() => addToShoppingList(ing)}
                    >
                      Add to List
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ))}

      <h3 style={{ marginTop: 36 }}>Add More Favorites</h3>
      {notFavorited.length === 0 && <div>All demo cocktails are already favorited!</div>}
      <div className="mm-card-grid">
        {notFavorited.map((cocktail) => (
          <Card
            key={cocktail.id}
            title={cocktail.name}
            actions={
              <button
                className="btn"
                style={{ background: "#F67280" }}
                onClick={() => toggleFavorite(cocktail.id)}
                aria-label={`Favorite ${cocktail.name}`}
              >
                <span role="img" aria-label="Favorite">❤️</span> Favorite
              </button>
            }
          >
            <span style={{ color: "#aaa" }}>{cocktail.desc}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
