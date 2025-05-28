import React from "react";
import Card from "../components/Card";

// Mock data for demo liquors and mixers
const LIQUOR_DATA = [
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

// PUBLIC_INTERFACE
/**
 * Explorer – Liquor & Mixer Explorer.
 * Browse various liquors, view descriptions, recommended mixers, cocktails.
 */
function Explorer() {
  return (
    <>
      {LIQUOR_DATA.map((liquor) => (
        <LiquorCard liquor={liquor} key={liquor.id} />
      ))}
    </>
  );
}

export default Explorer;
