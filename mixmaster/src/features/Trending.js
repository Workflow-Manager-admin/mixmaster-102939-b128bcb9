import React from "react";
import Card from "../components/Card";
import Feed from "../components/Feed";

/**
 * Mock trending cocktails and feed data.
 */
const trendingCocktails = [
  {
    id: "tr-1",
    name: "Spicy Sunset",
    desc: "Tequila, mango, chili, lime – spicy & bright!",
    likes: 134,
    tags: ["Summer Vibes"],
  },
  {
    id: "tr-2",
    name: "Winter Old Fashioned",
    desc: "Bourbon, maple syrup, orange bitters.",
    likes: 109,
    tags: ["Winter Warmers"],
  },
  {
    id: "tr-3",
    name: "Cranberry Collins",
    desc: "Gin, cranberry, lemon, soda.",
    likes: 98,
    tags: ["Winter Warmers"],
  },
  {
    id: "tr-4",
    name: "Tropical Smash",
    desc: "Rum, pineapple, mint, passionfruit.",
    likes: 172,
    tags: ["Summer Vibes"],
  },
  {
    id: "tr-5",
    name: "Fig Negroni",
    desc: "Gin, fig liqueur, Campari, sweet vermouth.",
    likes: 85,
    tags: ["Fall"],
  },
];

const trendingSections = [
  { key: "summer", label: "Summer Vibes", emoji: "🌴", filter: (c) => c.tags.includes("Summer Vibes") },
  { key: "winter", label: "Winter Warmers", emoji: "🔥", filter: (c) => c.tags.includes("Winter Warmers") },
  { key: "other", label: "Other Trending", emoji: "🍸", filter: (c) => !c.tags.includes("Summer Vibes") && !c.tags.includes("Winter Warmers") },
];

/**
 * Mock feed of real-time events (recently liked, added, etc)
 */
const feedEvents = [
  {
    user: "Alex",
    action: "liked",
    cocktail: "Spicy Sunset",
    time: "2m",
    emoji: "🔥",
    type: "like",
  },
  {
    user: "Jamie",
    action: "added new cocktail",
    cocktail: "Pumpkin Pie Martini",
    time: "8m",
    emoji: "🍂",
    type: "add",
  },
  {
    user: "Taylor",
    action: "liked",
    cocktail: "Winter Old Fashioned",
    time: "14m",
    emoji: "❄️",
    type: "like",
  },
  {
    user: "Steph",
    action: "liked",
    cocktail: "Tropical Smash",
    time: "18m",
    emoji: "🌴",
    type: "like",
  },
];

/**
 * Trending & Real-Time Feed UI – Card-based, sections.
 * Populates trending cocktails and a real-time activity/feed panel.
 */
// PUBLIC_INTERFACE
function Trending() {
  return (
    <div>
      <div style={{ marginBottom: 36 }}>
        <h2 className="subtitle" style={{ color: "#F67280", margin: "-10px 0 14px 3px", fontWeight: 600 }}>Trending Cocktails</h2>
        {trendingSections.map((section) => {
          const matches = trendingCocktails.filter(section.filter);
          if (matches.length === 0) return null;
          return (
            <div key={section.key}>
              <h3 style={{ color: "#E87A41", margin: "16px 0 10px 2px", fontWeight: 500, fontSize: "1.05em" }}>
                <span style={{ fontSize: "1.12em", marginRight: 5 }}>{section.emoji}</span>
                {section.label}
              </h3>
              <div className="mm-card-grid">
                {matches.map(cocktail => (
                  <Card
                    key={cocktail.id}
                    title={cocktail.name}
                    actions={
                      <span style={{ color: "#F67280", fontWeight: 500, fontSize: "0.98em" }}>
                        <span role="img" aria-label="likes">❤️</span> {cocktail.likes} likes
                      </span>
                    }
                  >
                    <span style={{ color: "#bbb" }}>{cocktail.desc}</span>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 18 }}>
        <Feed events={feedEvents} />
      </div>
    </div>
  );
}

export default Trending;
