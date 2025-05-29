import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

// PUBLIC_INTERFACE
function Sidebar() {
  /**
   * Sidebar navigation for MixMaster, using react-router-dom NavLink for routing.
   * Mobile-first: collapsible, swipeable, overlay on small screens, large tap targets, and visual mobile gesture close.
   */
  const [collapsed, setCollapsed] = useState(false);

  // Show sidebar as overlay on mobile/small screens (when open)
  const [overlayOpen, setOverlayOpen] = useState(false);

  // For swipe-to-open/collapse on mobile:
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Collapse/expand sidebar on small viewports based on overlay or collapse state
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 700) setCollapsed(true);
      else setCollapsed(false);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Open overlay sidebar (for mobile)
  function openOverlaySidebar() {
    setOverlayOpen(true);
    setCollapsed(false);
    document.body.style.overflow = "hidden";
  }
  function closeOverlaySidebar() {
    setOverlayOpen(false);
    setCollapsed(true);
    document.body.style.overflow = "";
  }

  // Touch swipe for open/close (mobile-only: open on right swipe/close on left swipe)
  function handleTouchStart(e) {
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchEndX.current = null;
    }
  }
  function handleTouchMove(e) {
    if (e.touches.length === 1) {
      touchEndX.current = e.touches[0].clientX;
    }
  }
  function handleTouchEnd() {
    if (
      typeof touchStartX.current === "number" &&
      typeof touchEndX.current === "number"
    ) {
      const dx = touchEndX.current - touchStartX.current;
      // Swipe right: open overlay if closed; swipe left: close overlay if open
      if (dx > 70 && !overlayOpen && window.innerWidth <= 700) openOverlaySidebar();
      if (dx < -60 && overlayOpen && window.innerWidth <= 700) closeOverlaySidebar();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  }

  // Keyboard esc closes overlay sidebar on mobile
  useEffect(() => {
    function escListener(e) {
      if (overlayOpen && (e.key === "Escape" || e.keyCode === 27)) closeOverlaySidebar();
    }
    document.addEventListener("keydown", escListener);
    return () => document.removeEventListener("keydown", escListener);
  }, [overlayOpen]);

  // Open overlay with menu button on mobile
  useEffect(() => {
    if (window.innerWidth <= 700) setCollapsed(true);
    // effect on mount only
    // eslint-disable-next-line
  }, []);

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

  // Handle tap/click feedback
  const [activeIndex, setActiveIndex] = useState(null);

  // Hamburger menu trigger for overlay sidebar (mobile only)
  const HamburgerMenu = () => (
    <button
      className="sidebar-toggle"
      aria-label="Open menu"
      style={{
        fontSize: "2.1rem",
        color: "var(--brand-accent)",
        background: "none",
        border: "none",
        position: "fixed",
        top: 15,
        left: 15,
        zIndex: 1002,
        borderRadius: 11,
        padding: 4,
        boxShadow: "0 1.5px 10px 0 rgba(24, 25, 36, 0.11)"
      }}
      onClick={openOverlaySidebar}
      tabIndex={0}
    >
      <span aria-hidden="true">☰</span>
    </button>
  );

  // Sidebar content as a function (to reuse in overlay vs docked)
  function SidebarContent({ onNav }) {
    return (
      <>
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
            onClick={() => {
              if (window.innerWidth <= 700) {
                overlayOpen ? closeOverlaySidebar() : openOverlaySidebar();
              } else {
                setCollapsed((val) => !val);
              }
            }}
            style={{
              display: window.innerWidth <= 700 ? "block" : undefined,
              fontWeight: 700
            }}
          >
            {window.innerWidth <= 700
              ? (overlayOpen ? "✕" : "☰")
              : (collapsed ? "»" : "«")}
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
                    (activeIndex === idx ? " sidebar-link-realactive" : "")
                  }
                  aria-label={item.label}
                  tabIndex={0}
                  end={item.to === "/explorer"}
                  style={{
                    padding: collapsed ? "15px 6px" : "18px 22px",
                    fontSize: window.innerWidth <= 700 ? "1.22rem" : "1.17rem",
                    gap: "16px",
                    color: "inherit",
                    minHeight: "56px",
                    maxWidth: "100vw",
                    touchAction: "manipulation"
                  }}
                  onPointerDown={() => setActiveIndex(idx)}
                  onPointerUp={() => {
                    setActiveIndex(null);
                    if (window.innerWidth <= 700) closeOverlaySidebar();
                  }}
                  onPointerLeave={() => setActiveIndex(null)}
                  onClick={onNav}
                >
                  <span
                    className="sidebar-icon"
                    style={{
                      fontSize: collapsed
                        ? window.innerWidth <= 700 ? "1.47rem" : "1.34rem"
                        : window.innerWidth <= 700 ? "1.77rem" : "1.65rem",
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
                        fontSize: window.innerWidth <= 700 ? "1.07em" : "1.02em"
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
      </>
    );
  }

  // Use overlay version on small screens (that covers content, tap away to close)
  return (
    <>
      {/* Hamburger trigger on mobile only if overlay sidebar not open */}
      {window.innerWidth <= 700 && !overlayOpen && <HamburgerMenu />}

      {/* Sidebar overlay modal for small screens */}
      {window.innerWidth <= 700 && overlayOpen && (
        <>
          <div
            className="sidebar-overlay"
            style={{
              position: "fixed",
              top: 0, left: 0,
              right: 0, bottom: 0,
              zIndex: 1000,
              background: "rgba(24, 23, 38, 0.67)",
              touchAction: "manipulation"
            }}
            onClick={closeOverlaySidebar}
          />
          <aside
            className="sidebar sidebar-overlay-open"
            aria-label="Primary navigation sidebar"
            style={{
              left: 0,
              top: 0,
              position: "fixed",
              width: "77vw",
              maxWidth: 315,
              minWidth: 0,
              minHeight: "100dvh",
              height: "100dvh",
              zIndex: 1001,
              boxShadow: "2px 0 18px 0 rgba(0,0,0,0.22)",
              background: "var(--sidebar-bg)",
              transition: "width 0.18s"
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <SidebarContent onNav={closeOverlaySidebar} />
          </aside>
        </>
      )}
      {/* Normal sidebar for desktop and "pseudo-collapsed" for mobile if overlay is not open */}
      {(window.innerWidth > 700 || !overlayOpen) && (
        <aside
          className={`sidebar${collapsed ? " collapsed" : ""}`}
          aria-label="Primary navigation sidebar"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <SidebarContent />
        </aside>
      )}
    </>
  );
}

export default Sidebar;
