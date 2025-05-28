import React, { useState } from "react";
import Card from "../components/Card";

// Demo recipe data per MixMaster design
const COCKTAILS = [
  {
    id: "margarita",
    name: "Margarita",
    type: "Refreshing",
    base: "Tequila",
    desc: "Lively tequila-lime classic with a salted rim.",
    ingredients: ["Tequila", "Lime Juice", "Cointreau"],
    steps: [
      "Rim glass with salt.",
      "Shake tequila, lime juice, and Cointreau with ice.",
      "Strain into glass and garnish with lime.",
    ],
    emoji: "🌵",
  },
  {
    id: "oldfashioned",
    name: "Old Fashioned",
    type: "Strong",
    base: "Whiskey",
    desc: "Timeless whiskey-bitter cocktail with orange aroma.",
    ingredients: ["Whiskey", "Angostura Bitters", "Sugar Cube"],
    steps: [
      "Muddle sugar cube and bitters in glass.",
      "Add whiskey and ice, stir gently.",
      "Garnish with orange peel.",
    ],
    emoji: "🥃",
  },
  {
    id: "cosmopolitan",
    name: "Cosmopolitan",
    type: "Classic",
    base: "Vodka",
    desc: "Vibrant vodka-cranberry mix, a staple for any party.",
    ingredients: ["Vodka", "Cranberry Juice", "Lime Juice", "Triple Sec"],
    steps: [
      "Shake all with ice.",
      "Strain into chilled glass.",
      "Garnish with lime.",
    ],
    emoji: "🍸",
  },
  {
    id: "mojito",
    name: "Mojito",
    type: "Refreshing",
    base: "Rum",
    desc: "Minty, sparkling Cuban refresher with rum and lime.",
    ingredients: ["White Rum", "Mint", "Lime Juice", "Sugar", "Soda"],
    steps: [
      "Muddle mint and sugar.",
      "Add rum and lime juice, fill with ice.",
      "Top with soda and garnish with mint.",
    ],
    emoji: "🏝️",
  },
  {
    id: "negroni",
    name: "Negroni",
    type: "Strong",
    base: "Gin",
    desc: "Bittersweet, herbal classic with vibrant red color.",
    ingredients: ["Gin", "Campari", "Sweet Vermouth"],
    steps: [
      "Stir all with ice in a glass.",
      "Garnish with orange peel.",
    ],
    emoji: "🍃",
  },
];

const BASE_OPTIONS = [
  ...Array.from(new Set(COCKTAILS.map((c) => c.base))),
];
const TYPE_OPTIONS = [
  ...Array.from(new Set(COCKTAILS.map((c) => c.type))),
];

// PUBLIC_INTERFACE
/**
 * CocktailGenerator – Cocktail generator with filters and recipe cards.
 */
function CocktailGenerator() {
  const [selectedBase, setSelectedBase] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const filtered = COCKTAILS.filter((cocktail) => {
    return (
      (!selectedBase || cocktail.base === selectedBase) &&
      (!selectedType || cocktail.type === selectedType)
    );
  });

  return (
    <>
      <Card
        title={
          <span>
            <span role="img" aria-label="magic" style={{ marginRight: 8 }}>
              ✨
            </span>
            Generate Your Cocktail
          </span>
        }
      >
        <div style={{ marginBottom: 10 }}>
          <label style={{ marginRight: 12 }}>
            <span style={{ color: "#F67280" }}>Base:</span>{" "}
            <select
              value={selectedBase}
              onChange={e => setSelectedBase(e.target.value)}
              style={{
                borderRadius: 4,
                padding: "3px 8px",
                fontSize: "1em",
                marginLeft: 4
              }}
              aria-label="Select base liquor"
            >
              <option value="">All</option>
              {BASE_OPTIONS.map((base) => (
                <option key={base} value={base}>{base}</option>
              ))}
            </select>
          </label>
          <label style={{ marginLeft: 10 }}>
            <span style={{ color: "#E87A41" }}>Style:</span>{" "}
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              style={{
                borderRadius: 4,
                padding: "3px 8px",
                fontSize: "1em",
                marginLeft: 4
              }}
              aria-label="Select cocktail style"
            >
              <option value="">All</option>
              {TYPE_OPTIONS.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ color: "#aaa", fontSize: "0.97em" }}>
          Pick your favorite liquor and style to reveal matching recipes below!
        </div>
      </Card>
      {filtered.length === 0 ? (
        <Card>
          <span style={{ color: "#bbb" }}>No cocktails match your filters.</span>
        </Card>
      ) : (
        filtered.map((cocktail) => (
          <Card
            key={cocktail.id}
            title={
              <span>
                <span role="img" aria-label={cocktail.name} style={{ marginRight: 7 }}>
                  {cocktail.emoji}
                </span>
                {cocktail.name}
              </span>
            }
            actions={
              <span style={{ color: "#E87A41", fontSize: ".97em", marginRight: 4 }}>
                {cocktail.type} · {cocktail.base}
              </span>
            }
          >
            <div style={{ color: "#bbb", marginBottom: 6 }}>{cocktail.desc}</div>
            <div>
              <b style={{ color: "#F67280" }}>Ingredients:</b>
              <ul style={{ margin: "8px 0 0 16px" }}>
                {cocktail.ingredients.map((ing) => (
                  <li key={ing} style={{ color: "#fff" }}>{ing}</li>
                ))}
              </ul>
              <b style={{ color: "#E87A41" }}>Steps:</b>
              <ol style={{ margin: "6px 0 0 16px" }}>
                {cocktail.steps.map((step, idx) => (
                  <li key={idx} style={{ color: "#fff" }}>{step}</li>
                ))}
              </ol>
            </div>
          </Card>
        ))
      )}
    </>
  );
}

export default CocktailGenerator;
