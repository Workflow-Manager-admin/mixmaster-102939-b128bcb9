import React, { useState } from "react";
import Card from "../components/Card";
import { useShoppingList } from "./FavoritesProvider";

// PUBLIC_INTERFACE
/**
 * ShoppingList – Interactive shopping list demo UI.
 */
function ShoppingList() {
  const {
    shoppingList,
    addToShoppingList,
    removeFromShoppingList,
    togglePurchased,
    demoShopping,
  } = useShoppingList();
  const [input, setInput] = useState("");

  const availableSuggestions = demoShopping.filter(
    (sug) => !shoppingList.some((item) => item.name === sug.name)
  );

  return (
    <div>
      <h2>Shopping List</h2>
      <Card>
        <form
          style={{ display: "flex", alignItems: "center", gap: 8 }}
          onSubmit={e => {
            e.preventDefault();
            if (input.trim()) {
              addToShoppingList(input.trim());
              setInput("");
            }
          }}
        >
          <input
            type="text"
            style={{
              width: 200,
              background: "var(--card-bg)",
              color: "#fff",
              border: "2px solid var(--kavia-accent)",
              borderRadius: "6px",
              padding: "9px 14px",
              fontSize: "1em"
            }}
            placeholder="Add item (e.g. Gin)"
            value={input}
            onChange={e => setInput(e.target.value)}
            aria-label="New shopping item"
          />
          <button className="btn" type="submit">
            Add
          </button>
        </form>
        <div style={{ marginBlock: "0.8em 0.2em" }}>
          {availableSuggestions.length > 0 && (
            <span style={{ color: "#aaa", fontSize: "0.91em" }}>
              Suggestions:&nbsp;
              {availableSuggestions.slice(0, 7).map((sug, i) => (
                <button
                  key={sug.id}
                  className="btn"
                  style={{
                    backgroundColor: "#16213E",
                    color: "#fff",
                    fontSize: "0.92em",
                    marginRight: 5,
                    marginBlock: 2,
                  }}
                  onClick={() => addToShoppingList(sug.name)}
                  type="button"
                >
                  {sug.name}
                </button>
              ))}
            </span>
          )}
        </div>
      </Card>
      <div>
        {shoppingList.length === 0 ? (
          <div style={{ color: "#ccc", margin: 24 }}>
            (No items in your shopping list yet.)
          </div>
        ) : (
          <div className="mm-card-grid" style={{ marginTop: 18 }}>
            {shoppingList.map((item) => (
              <Card
                key={item.id}
                title={item.name}
                actions={
                  <>
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "#F67280",
                        color: "#fff",
                        fontSize: "0.93em",
                      }}
                      onClick={() => removeFromShoppingList(item.name)}
                      aria-label={`Remove ${item.name} from list`}
                    >
                      Remove
                    </button>
                    <button
                      className="btn"
                      style={{
                        fontSize: "0.93em",
                        backgroundColor: item.purchased
                          ? "#1A1A2E"
                          : "#E87A41",
                        color: "#fff",
                        marginLeft: 8,
                        opacity: item.purchased ? 0.7 : 1,
                      }}
                      onClick={() => togglePurchased(item.name)}
                      aria-label={
                        item.purchased
                          ? `Mark ${item.name} as not purchased`
                          : `Mark ${item.name} as purchased`
                      }
                    >
                      {item.purchased ? "Purchased" : "Mark Purchased"}
                    </button>
                  </>
                }
              >
                {item.purchased ? (
                  <span style={{ color: "#9dbb9c" }}>✓ Purchased</span>
                ) : (
                  <span style={{ color: "#ccc" }}>Not purchased</span>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingList;
