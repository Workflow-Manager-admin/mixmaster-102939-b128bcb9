import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

// PUBLIC_INTERFACE
function Sidebar() {
  /**
   * Sidebar navigation for MixMaster, using react-router-dom NavLink for routing.
   */
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { to: "/explorer", label: "Explorer", icon: "🌎" },
    { to: "/generator", label: "Generator", icon: "⚡" },
    { to: "/search", label: "Search", icon: "🔍" },
    { to: "/favorites", label: "Favorites", icon: "❤️" },
    { to: "/trending", label: "Trending", icon: "📈" },
    { to: "/pairings", label: "Pairings", icon: "🍽️" },
    { to: "/shopping-list", label: "Shopping List", icon: "🛒" },
    { to: "/ai-bartender", label: "AI Bartender", icon: "🤖" }
    // Ensure no duplicate sidebar entries (de-duplication handled by unique route/label).
  ];

  return (
    <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
      <div className="sidebar-header">
        <span className="sidebar-logo" title="MixMaster" style={{ color: "var(--brand-accent)" }}>🍸</span>
        <button
          className="sidebar-toggle"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          tabIndex={0}
          onClick={() => setCollapsed((val) => !val)}
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  "sidebar-link" +
                  (isActive ? " sidebar-link-active" : "")
                }
                aria-label={item.label}
                tabIndex={0}
                end={item.to === "/explorer"}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {!collapsed && <span className="sidebar-label">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
