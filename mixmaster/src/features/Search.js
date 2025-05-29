import React, { useState } from "react";
import Card from "../components/Card";
import { LIQUOR_BRANDS } from "./liquorBrands";

// --- Mock Data (for search) ---

// Liquor Data - matches Explorer.js but expanded a little for demo.
const LIQUOR_DATA = [
  {
    id: "whiskey",
    name: "Whiskey",
    desc: "Rich, oaky, and smooth; great straight or in classic cocktails.",
    mixers: ["Ginger Ale", "Vermouth", "Bitters"],
    cocktails: ["Old Fashioned", "Whiskey Sour", "Manhattan"],
    emoji: "🥃",
    type: "liquor",
  },
  {
    id: "gin",
    name: "Gin",
    desc: "Botanical & refreshing; ideal for martinis and citrus drinks.",
    mixers: ["Tonic", "Lime Juice", "Soda"],
    cocktails: ["Negroni", "Gin & Tonic", "Tom Collins"],
    emoji: "🍃",
    type: "liquor",
  },
  {
    id: "vodka",
    name: "Vodka",
    desc: "Clean and versatile; perfect for endless mixing possibilities.",
    mixers: ["Orange Juice", "Cranberry Juice", "Soda"],
    cocktails: ["Cosmopolitan", "Moscow Mule", "Bloody Mary"],
    emoji: "🍸",
    type: "liquor",
  },
  {
    id: "tequila",
    name: "Tequila",
    desc: "Agave-based spirit, bright and earthy, for a bold kick.",
    mixers: ["Lime", "Triple Sec", "Pineapple Juice"],
    cocktails: ["Margarita", "Paloma", "Tequila Sunrise"],
    emoji: "🌵",
    type: "liquor",
  },
  {
    id: "rum",
    name: "Rum",
    desc: "Sweet and tropical, from white to dark, a taste of the islands.",
    mixers: ["Cola", "Mint", "Coconut Cream"],
    cocktails: ["Mojito", "Piña Colada", "Daiquiri"],
    emoji: "🏝️",
    type: "liquor",
  },
  {
    id: "vermouth",
    name: "Vermouth",
    desc: "Herbal, aromatic fortified wine—key for classic mixtures.",
    mixers: ["Gin", "Soda", "Olive"],
    cocktails: ["Negroni", "Manhattan", "Martini"],
    emoji: "🍷",
    type: "liquor",
  },
];

// Cocktail Data - reuse from CocktailGenerator.
const COCKTAILS = [
  {
    id: "margarita",
    name: "Margarita",
    type: "Refreshing",
    base: "Tequila",
    desc: "Lively tequila-lime classic with a salted rim.",
    ingredients: ["Tequila", "Lime Juice", "Cointreau"],
    emoji: "🌵",
    kind: "cocktail",
  },
  {
    id: "oldfashioned",
    name: "Old Fashioned",
    type: "Strong",
    base: "Whiskey",
    desc: "Timeless whiskey-bitter cocktail with orange aroma.",
    ingredients: ["Whiskey", "Angostura Bitters", "Sugar Cube"],
    emoji: "🥃",
    kind: "cocktail",
  },
  {
    id: "cosmopolitan",
    name: "Cosmopolitan",
    type: "Classic",
    base: "Vodka",
    desc: "Vibrant vodka-cranberry mix, a staple for any party.",
    ingredients: ["Vodka", "Cranberry Juice", "Lime Juice", "Triple Sec"],
    emoji: "🍸",
    kind: "cocktail",
  },
  {
    id: "mojito",
    name: "Mojito",
    type: "Refreshing",
    base: "Rum",
    desc: "Minty, sparkling Cuban refresher with rum and lime.",
    ingredients: ["White Rum", "Mint", "Lime Juice", "Sugar", "Soda"],
    emoji: "🏝️",
    kind: "cocktail",
  },
  {
    id: "negroni",
    name: "Negroni",
    type: "Strong",
    base: "Gin",
    desc: "Bittersweet, herbal classic with vibrant red color.",
    ingredients: ["Gin", "Campari", "Sweet Vermouth"],
    emoji: "🍃",
    kind: "cocktail",
  },
];

// Card for a liquor item
function LiquorResultCard({ liquor }) {
  return (
    <Card
      title={
        <span>
          <span role="img" aria-label={liquor.name} style={{ marginRight: 8 }}>
            {liquor.emoji}
          </span>
          {liquor.name}
        </span>
      }
      actions={
        <span style={{ color: "#F67280", fontSize: ".97em" }}>
          Liquor · {liquor.mixers.join(", ")}
        </span>
      }
    >
      <div style={{ color: "#bbb", marginBottom: 7 }}>{liquor.desc}</div>
      <div>
        <b style={{ color: "#E87A41" }}>Pairs:</b>{" "}
        <span style={{ color: "#fff" }}>{liquor.cocktails.join(", ")}</span>
      </div>
    </Card>
  );
}

/**
 * Card for a liquor brand item (from central module)
 */
function BrandResultCard({ brand }) {
  return (
    <Card
      title={
        <span>
          <span role="img" aria-label={brand.name} style={{ marginRight: 8 }}>
            {brand.emoji}
          </span>
          {brand.name}
        </span>
      }
      actions={
        <span style={{ color: "#E87A41", fontSize: ".97em" }}>
          {brand.type} · {brand.country}
        </span>
      }
    >
      <div style={{ color: "#bbb", marginBottom: 6 }}>{brand.desc}</div>
      {brand.image && (
        <img
          src={brand.image}
          alt={brand.name}
          style={{
            width: "100px",
            borderRadius: "4px",
            margin: "7px 0",
            display: "block",
          }}
        />
      )}
    </Card>
  );
}

// Card for a cocktail item
function CocktailResultCard({ cocktail }) {
  return (
    <Card
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
      <b style={{ color: "#F67280" }}>Ingredients:</b>
      <ul style={{ margin: "7px 0 0 18px" }}>
        {cocktail.ingredients && cocktail.ingredients.map((ing) => (
          <li key={ing} style={{ color: "#fff" }}>{ing}</li>
        ))}
      </ul>
    </Card>
  );
}

// PUBLIC_INTERFACE
/**
 * Search – Smart Search UI for liquor/cocktail lookup.
 * Features:
 * - Search input bar (live, insensitive)
 * - Shows liquors and cocktails matching name, base, or ingredient
 * - Responsive card grid
 */
function Search() {
  const [term, setTerm] = useState("");

  // Normalize search term (case-insensitive, trimmed)
  const searchTerm = term.trim().toLowerCase();

  // Filter logic: matches liquor or cocktail (partial in name, ingredient, base, etc.)
  const matchedLiquors = LIQUOR_DATA.filter(
    l =>
      l.name.toLowerCase().includes(searchTerm) ||
      l.desc.toLowerCase().includes(searchTerm) ||
      l.mixers.some(m => m.toLowerCase().includes(searchTerm)) ||
      l.cocktails.some(c => c.toLowerCase().includes(searchTerm))
  );

  const matchedCocktails = COCKTAILS.filter(
    c =>
      c.name.toLowerCase().includes(searchTerm) ||
      (c.base && c.base.toLowerCase().includes(searchTerm)) ||
      (c.type && c.type.toLowerCase().includes(searchTerm)) ||
      (c.desc && c.desc.toLowerCase().includes(searchTerm)) ||
      (c.ingredients && c.ingredients.some(ing => ing.toLowerCase().includes(searchTerm)))
  );

  const hasSearch = searchTerm.length > 0;

  // Collect unique results (demo only, so small).
  const foundAny = matchedLiquors.length > 0 || matchedCocktails.length > 0;

  return (
    <>
      {/* Search Input Card */}
      <Card>
        <form
          role="search"
          onSubmit={e => e.preventDefault()}
          style={{ display: "flex", alignItems: "center", gap: "13px" }}
        >
          <input
            type="search"
            value={term}
            autoFocus
            onChange={e => setTerm(e.target.value)}
            placeholder="Search liquors, cocktails, or mixers…"
            aria-label="Search liquors and cocktails"
            style={{
              flex: 1,
              minWidth: 0,
              background: "var(--card-bg)",
              border: "2.5px solid var(--kavia-accent)",
              color: "#fff",
              borderRadius: 6,
              fontSize: "1.09em",
              padding: "10px 14px",
              outline: "none",
              transition: "border 0.15s",
              fontWeight: 500
            }}
          />
          <button
            className="btn"
            style={{ background: "#E87A41", color: "#fff" }}
            type="button"
            tabIndex={-1}
            aria-label="Clear search"
            onClick={() => setTerm("")}
            disabled={term === ""}
          >
            ✖
          </button>
        </form>
        <div style={{ marginTop: 7, color: "#aaa", fontSize: "0.93em"}}>
          Try searching by liquor, base, or ingredient: <b>gin</b>, <b>lime</b>, <b>old fashioned</b>, <b>rum</b>, <b>margarita</b>...
        </div>
      </Card>

      {/* Results */}
      {hasSearch ? (
        foundAny ? (
          <div className="mm-card-grid">
            {matchedLiquors.map(liquor => (
              <LiquorResultCard liquor={liquor} key={"liq-" + liquor.id} />
            ))}
            {matchedCocktails.map(cocktail => (
              <CocktailResultCard cocktail={cocktail} key={"coct-" + cocktail.id} />
            ))}
          </div>
        ) : (
          <Card>
            <span style={{ color: "#bbb" }}>No liquors or cocktails matched your search.</span>
          </Card>
        )
      ) : (
        <Card>
          <span style={{ color: "#bbb" }}>
            Enter a search above to find cocktails or liquors.<br />
            You can search by name, ingredient, or style.
          </span>
        </Card>
      )}
    </>
  );
}

export default Search;
