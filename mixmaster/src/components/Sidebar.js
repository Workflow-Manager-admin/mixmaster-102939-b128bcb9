import React, { useState } from "react";
import "./Sidebar.css";

// PUBLIC_INTERFACE
function Sidebar({ onNavigate = () => {} }) {
  /**
   * Sidebar navigation for MixMaster.
   * Collapsible on mobile, styled with brand colors.
   */
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { key: "explorer", label: "Explorer", icon: "🌎" },
    { key: "generator", label: "Generator", icon: "⚡" },
    { key: "search", label: "Search", icon: "🔍" },
    { key: "favorites", label: "Favorites", icon: "❤️" },
    { key: "trending", label: "Trending", icon: "📈" },
    { key: "pairings", label: "Pairings", icon: "🍽️" },
    { key: "ai-bartender", label: "AI Bartender", icon: "🤖" },
  ];

  return (
    <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
      <div className="sidebar-header">
        <span className="sidebar-logo" title="MixMaster">🍸</span>
        <button
          className="sidebar-toggle"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed((val) => !val)}
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                className="sidebar-link"
                onClick={() => onNavigate(item.key)}
                aria-label={item.label}
                tabIndex={0}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {!collapsed && <span className="sidebar-label">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
