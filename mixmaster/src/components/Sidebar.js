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
  ];

  return (
    <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
      <div className="sidebar-header">
        <span
          className="sidebar-logo"
          title="MixMaster"
          style={{
            color: "var(--brand-accent)",
            fontSize: "2.2rem",
            marginRight: 5,
            display: "flex",
            alignItems: "center"
          }}
        >🍸</span>
        <button
          className="sidebar-toggle"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          tabIndex={0}
          onClick={() => setCollapsed((val) => !val)}
          style={{
            fontWeight: "bold",
            color: "var(--brand-accent)",
            fontSize: "1.32rem",
            background: "none",
            border: "none",
            cursor: "pointer"
          }}
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
                style={{
                  padding: collapsed ? "10px 7px" : "11px 24px",
                  fontSize: "1.12rem",
                  gap: "12px",
                  color: "inherit"
                }}
              >
                <span
                  className="sidebar-icon"
                  style={{
                    fontSize: collapsed ? "1.3rem" : "1.6rem",
                    color: "var(--brand-accent)",
                    marginRight: collapsed ? 0 : 8,
                    minWidth: 28,
                    minHeight: 28,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "font-size 0.16s"
                  }}
                >
                  {item.icon}
                </span>
                {!collapsed && (
                  <span
                    className="sidebar-label"
                    style={{
                      fontWeight: 600,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {item.label}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
