import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

// PUBLIC_INTERFACE
function Sidebar() {
  /**
   * Sidebar navigation for MixMaster, using react-router-dom NavLink for routing.
   * - Streamlined for accessibility, clarity, and real-time feedback.
   * - Larger touch targets, unique nav items, smooth interaction.
   */
  const [collapsed, setCollapsed] = useState(false);

  // No duplicates; each route unique and clear.
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

  // Handle touch feedback (for mobile, e.g., on pointer down/up)
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <aside className={`sidebar${collapsed ? " collapsed" : ""}`} aria-label="Primary navigation sidebar">
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
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>
      <nav className="sidebar-nav" aria-label="Main menu">
        <ul>
          {navItems.map((item, idx) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  "sidebar-link" +
                  (isActive ? " sidebar-link-active" : "") +
                  // Real-time tap/click feedback (styled in CSS)
                  (activeIndex === idx ? " sidebar-link-realactive" : "")
                }
                aria-label={item.label}
                tabIndex={0}
                end={item.to === "/explorer"}
                style={{
                  padding: collapsed ? "15px 6px" : "16px 20px",
                  fontSize: "1.17rem",
                  gap: "13px",
                  color: "inherit",
                  minHeight: "52px",
                  maxWidth: "100vw"
                }}
                onPointerDown={() => setActiveIndex(idx)}
                onPointerUp={() => setActiveIndex(null)}
                onPointerLeave={() => setActiveIndex(null)}
              >
                <span
                  className="sidebar-icon"
                  style={{
                    fontSize: collapsed ? "1.34rem" : "1.65rem",
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
                      fontWeight: 700,
                      letterSpacing: "0.012em",
                      fontSize: "1.02em"
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
