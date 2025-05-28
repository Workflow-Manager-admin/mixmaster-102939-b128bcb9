import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import './components/Sidebar.css';

function App() {
  // For demonstration: switch hero content by sidebar navigation
  const [activeSection, setActiveSection] = useState("explorer");

  // Dummy content for each section (replace with real containers later)
  const sections = {
    explorer: {
      title: "Liquor & Mixer Explorer",
      desc: "Browse various liquor types (Whiskey, Gin, Tequila...), view descriptions, recommended mixers, and cocktail suggestions."
    },
    generator: {
      title: "Cocktail Generator",
      desc: "Generate cocktail recipes based on selected liquor and preferences. Get ingredients and recipe steps instantly!"
    },
    search: {
      title: "Smart Search",
      desc: "Search for liquors and cocktails by name. Discover drink details, mix ideas, and suggestions."
    },
    favorites: {
      title: "Favorites & Shopping List",
      desc: "Save favorite cocktails and add missing ingredients to your personal shopping list for easy planning."
    },
    trending: {
      title: "Trending & Seasonal Mixes",
      desc: "See what's hot: trending cocktails and themed suggestions for every season and vibe."
    },
    pairings: {
      title: "Liquor Pairings",
      desc: "Find the perfect food pairings for your favorite drinks, enhancing every sip and snack."
    },
    "ai-bartender": {
      title: "AI Bartender",
      desc: "Ask our AI what cocktails you can make – personalized drink ideas and interactive help at your service."
    },
  };

  return (
    <div className="app app-has-sidebar">
      <Sidebar onNavigate={setActiveSection} />

      <div className="main-content">
        <nav className="navbar">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div className="logo">
                <span className="logo-symbol">*</span> KAVIA AI
              </div>
              <button className="btn">Template Button</button>
            </div>
          </div>
        </nav>

        <main>
          <div className="container">
            <div className="hero">
              <div className="subtitle">{sections[activeSection].title}</div>
              
              <h1 className="title">mixmaster</h1>
              
              <div className="description">
                {sections[activeSection].desc}
              </div>
              
              <button className="btn btn-large">Button</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;