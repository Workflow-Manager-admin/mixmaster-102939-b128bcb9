import React from "react";
import Card from "../components/Card";
import { useFavorites, useShoppingList } from "./FavoritesProvider";

// PUBLIC_INTERFACE
/**
 * Favorites – Full-page visually grouped card & grid redesign.
 * All sections and lists are rendered with prominent spacing, card grouping, and elevated presentation.
 * Responsive and modern, uses space, whitespace, and accent color for section distinguishment.
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
    <main>
      {/* Group 1: Your Favorites */}
      <div className="container" style={{ padding: '0', maxWidth: 940, marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 9 }}>
          <span className="subtitle" style={{ color: "var(--kavia-orange)", fontSize: "1.28rem", fontWeight: 600, marginRight: 2, letterSpacing: 0.01 }}>Your Favorites</span>
          <span role="img" aria-label="favorites" style={{ fontSize: 27, marginTop: -3 }}>❤️</span>
        </div>
        {favorites.length === 0 && (
          <Card>
            <span style={{ color: "#bbb" }}>(You haven't favorited any cocktails yet.)</span>
          </Card>
        )}
        <div className="mm-card-grid" style={{ marginTop: favorites.length ? 0 : 24 }}>
          {favorites.map((cocktail) => (
            <Card
              key={cocktail.id}
              title={
                <span>
                  <span role="img" aria-label={cocktail.name} style={{ marginRight: 8 }}>
                    {cocktail.emoji || "🍹"}
                  </span>
                  {cocktail.name}
                </span>
              }
              actions={
                <>
                  <button
                    className="btn"
                    style={{ background: "#F67280" }}
                    onClick={() => toggleFavorite(cocktail.id)}
                    aria-label={`Unfavorite ${cocktail.name}`}
                  >
                    <span role="img" aria-label="Unfavorite">💔</span> Remove
                  </button>
                  <button
                    className="btn btn-outline"
                    style={{}}
                    onClick={() =>
                      cocktail.ingredients.forEach((ing) => addToShoppingList(ing))
                    }
                    aria-label={`Add all ingredients for ${cocktail.name} to list`}
                  >
                    <span role="img" aria-label="Add Ingredients">🛒</span> Add All Ingredients
                  </button>
                </>
              }
            >
              <div>
                <span style={{ color: "#aaa" }}>{cocktail.desc}</span>
                <ul style={{ margin: "8px 0 0 0", paddingLeft: 16 }}>
                  {cocktail.ingredients.map((ing) => (
                    <li key={ing} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "#fff", padding: "2px 0" }}>
                      <span>{ing}</span>
                      {shoppingList.find(item => item.name === ing) ? (
                        <button
                          className="btn btn-outline"
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
                          className="btn btn-ghost"
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
        </div>
      </div>

      {/* Divider visual */}
      <div className="container" style={{
        margin: "30px auto 16px",
        borderTop: "2.5px solid var(--brand-accent)",
        opacity: 0.13,
        width: "90%"
      }} />

      {/* Group 2: Add More Favorites */}
      <div className="container" style={{ padding: 0, maxWidth: 940 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 9 }}>
          <span className="subtitle" style={{ color: "var(--brand-accent)", fontWeight: 600, fontSize: "1.12rem" }}>Add More Favorites</span>
          <span role="img" aria-label="star" style={{ fontSize: 21, marginTop: -2 }}>✨</span>
        </div>
        {notFavorited.length === 0 &&
          <Card>
            <span style={{ color: "#aaa" }}>All demo cocktails are already favorited!</span>
          </Card>
        }
        <div className="mm-card-grid">
          {notFavorited.map((cocktail) => (
            <Card
              key={cocktail.id}
              title={
                <span>
                  <span role="img" aria-label={cocktail.name} style={{ marginRight: 8 }}>
                    {cocktail.emoji || "🍹"}
                  </span>
                  {cocktail.name}
                </span>
              }
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
    </main>
  );
}

export default Favorites;
