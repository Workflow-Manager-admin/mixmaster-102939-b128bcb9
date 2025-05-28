import React, { useState } from "react";
import Card from "../components/Card";

// Mock data for liquor-to-food pairings.
const PAIRINGS = [
  {
    liquor: "Red Wine",
    food: ["Steak", "Cheddar Cheese", "Lamb Chops"],
    emoji: "🍷",
    desc: "Bold wines call for hearty, savory fare.",
  },
  {
    liquor: "White Wine",
    food: ["Grilled Chicken", "Seafood", "Goat Cheese"],
    emoji: "🥂",
    desc: "Crisp wines brighten delicate flavors.",
  },
  {
    liquor: "Whiskey",
    food: ["Grilled Steak", "Dark Chocolate", "Blue Cheese"],
    emoji: "🥃",
    desc: "Robust whiskey complements rich, smoky foods.",
  },
  {
    liquor: "Gin",
    food: ["Smoked Salmon", "Fresh Oysters", "Cucumber Salad"],
    emoji: "🍃",
    desc: "Herbal gin pairs well with fresh, briny bites.",
  },
  {
    liquor: "Tequila",
    food: ["Tacos", "Guacamole", "Ceviche"],
    emoji: "🌵",
    desc: "Vibrant flavors for bold agave spirits.",
  },
  {
    liquor: "Rum",
    food: ["Coconut Shrimp", "Pulled Pork", "Tropical Fruit"],
    emoji: "🏝️",
    desc: "Sweet and spicy dishes work beautifully.",
  },
  {
    liquor: "Vodka",
    food: ["Smoked Fish", "Potato Latkes", "Pickled Veg"],
    emoji: "🍸",
    desc: "Clean vodka is great with snacks and bites.",
  },
  {
    liquor: "Champagne",
    food: ["Caviar", "Sushi", "Brie Cheese"],
    emoji: "🍾",
    desc: "Bubbly for gourmet, salty, or creamy nibbles.",
  },
];

// PUBLIC_INTERFACE
/**
 * Pairings – liquor-to-food pairing suggestions as card demo.
 */
function Pairings() {
  const [selected, setSelected] = useState("");

  const pairingCards = (
    PAIRINGS.map(p => (
      <Card
        key={p.liquor}
        title={
          <span>
            <span role="img" aria-label={p.liquor} style={{ marginRight: 8 }}>
              {p.emoji}
            </span>
            {p.liquor}
          </span>
        }
        actions={
          <span style={{ color: "#F67280", fontSize: ".99em" }}>Food Pairings</span>
        }
      >
        <div style={{ color: "#bbb", marginBottom: 7 }}>{p.desc}</div>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {p.food.map(item => (
            <li key={item} style={{ color: "#fff" }}>{item}</li>
          ))}
        </ul>
      </Card>
    ))
  );

  return (
    <>
      <Card
        title={
          <span>
            <span role="img" aria-label="pairings" style={{ marginRight: 8 }}>
              🍽️
            </span>
            Liquor & Food Pairings
          </span>
        }
      >
        <div style={{ color: "#aaa", fontSize: ".98em" }}>
          Select your favorite drink type below to see great food suggestions.<br />
        </div>
      </Card>
      {pairingCards}
    </>
  );
}

export default Pairings;
