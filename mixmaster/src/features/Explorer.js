import React from "react";
import Card from "../components/Card";
import { LIQUOR_BRANDS } from "./liquorBrands";

// Demo liquors/mixers (classic categories)
const LIQUOR_DATA = [
  // ... [unchanged, omitted for brevity] ...
  {
    id: "whiskey",
    name: "Whiskey",
    desc: "Rich, oaky, and smooth; great straight or in classic cocktails.",
    mixers: ["Ginger Ale", "Vermouth", "Bitters"],
    cocktails: ["Old Fashioned", "Whiskey Sour", "Manhattan"],
    emoji: "🥃",
  },
  {
    id: "gin",
    name: "Gin",
    desc: "Botanical and refreshing; ideal for martinis and citrus drinks.",
    mixers: ["Tonic", "Lime Juice", "Soda"],
    cocktails: ["Negroni", "Gin & Tonic", "Tom Collins"],
    emoji: "🍃",
  },
  {
    id: "vodka",
    name: "Vodka",
    desc: "Clean and versatile; perfect for endless mixing possibilities.",
    mixers: ["Orange Juice", "Cranberry Juice", "Soda"],
    cocktails: ["Cosmopolitan", "Moscow Mule", "Bloody Mary"],
    emoji: "🍸",
  },
  {
    id: "tequila",
    name: "Tequila",
    desc: "Agave-based spirit, bright and earthy, for a bold kick.",
    mixers: ["Lime", "Triple Sec", "Pineapple Juice"],
    cocktails: ["Margarita", "Paloma", "Tequila Sunrise"],
    emoji: "🌵",
  },
  {
    id: "rum",
    name: "Rum",
    desc: "Sweet and tropical, from white to dark, a taste of the islands.",
    mixers: ["Cola", "Mint", "Coconut Cream"],
    cocktails: ["Mojito", "Piña Colada", "Daiquiri"],
    emoji: "🏝️",
  },
  {
    id: "triple-sec",
    name: "Triple Sec",
    desc: "Zesty orange liqueur for sweet-and-citrusy cocktails.",
    mixers: ["Lime", "Cranberry Juice", "Tequila"],
    cocktails: ["Cosmopolitan", "Margarita"],
    emoji: "🍊",
  },
  {
    id: "vermouth",
    name: "Vermouth",
    desc: "Herbal, aromatic fortified wine—key for classic mixtures.",
    mixers: ["Gin", "Soda", "Olive"],
    cocktails: ["Negroni", "Manhattan", "Martini"],
    emoji: "🍷",
  },
  {
    id: "bitters",
    name: "Bitters",
    desc: "Concentrated seasoning for cocktails; enhances complexity.",
    mixers: ["Whiskey", "Rum"],
    cocktails: ["Old Fashioned", "Manhattan"],
    emoji: "🧪",
  },
];

// Card for showing a liquor/mixer category
function LiquorCard({ liquor }) {
  return (
    <Card
      key={liquor.id}
      title={
        <span>
          <span role="img" aria-label={liquor.name} style={{ marginRight: 8 }}>
            {liquor.emoji}
          </span>
          {liquor.name}
        </span>
      }
    >
      <div style={{ color: "#bbb", marginBottom: 9 }}>{liquor.desc}</div>
      <div>
        <span style={{ color: "#E87A41", fontWeight: 500 }}>Mixers:</span>{" "}
        <span style={{ color: "#fff" }}>
          {liquor.mixers.join(", ")}
        </span>
      </div>
      <div style={{ marginTop: 4 }}>
        <span style={{ color: "#F67280", fontWeight: 500 }}>Cocktails:</span>{" "}
        <span style={{ color: "#fff" }}>
          {liquor.cocktails.join(", ")}
        </span>
      </div>
    </Card>
  );
}

/**
 * Explorer – Liquor & Mixer Explorer.
 * Browse various liquors, view descriptions, recommended mixers, cocktails,
 * AND view popular brands with their details/cards in grid.
 */
function Explorer() {
  return (
    <>
      <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 0 }}>
          <Card
            title={
              <span>
                <span role="img" aria-label="explorer" style={{ marginRight: 7 }}>
                  🌎
                </span>
                Liquor Categories
              </span>
            }
            variant="elevated"
          >
            <div style={{ color: "#aaa", fontSize: "1em", marginBottom: 5 }}>
              Browse classic spirit types and find popular brands below.
            </div>
          </Card>
          <div className="mm-card-grid" style={{ marginTop: 0 }}>
            {LIQUOR_DATA.map((liquor) => (
              <LiquorCard liquor={liquor} key={liquor.id} />
            ))}
          </div>
          <div style={{ marginTop: 32, marginBottom: 0 }}>
            <Card
              title={
                <span>
                  <span role="img" aria-label="brands" style={{ marginRight: 7 }}>
                    🏷️
                  </span>
                  Popular Liquor Brands
                </span>
              }
              variant="elevated"
            >
              <div style={{ color: "#aaa", fontSize: "1em" }}>
                Leading whiskies, gins, vodkas, tequilas, and rums from around the world, with country and category.
              </div>
            </Card>
          </div>
          {/* Brands as card grid */}
          <div className="mm-card-grid" style={{ marginTop: 0 }}>
            {LIQUOR_BRANDS.map((brand) => (
              <Card
                key={brand.id}
                title={
                  <span>
                    <span
                      role="img"
                      aria-label={brand.name}
                      style={{ marginRight: 8 }}
                    >
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
                variant="flat"
              >
                <div style={{ color: "#bbb", marginBottom: 6 }}>
                  {brand.desc}
                </div>
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Explorer;
