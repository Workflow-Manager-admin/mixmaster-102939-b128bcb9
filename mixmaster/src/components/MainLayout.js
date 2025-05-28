import React from "react";
import Sidebar from "./Sidebar";
import "../App.css";

/**
 * MainLayout component wraps content in sidebar + navbar + responsive card grid.
 * Use as the root wrapper for all MixMaster feature sections.
 *
 * Props:
 * - title: title text for the current feature page
 * - children: contents (expect Card components)
 * - actions: render right-aligned actions (optional)
 * - navbarContent: custom content in navbar (optional)
 * - onNavigate: sidebar nav handler
 */
// PUBLIC_INTERFACE
function MainLayout({
  title,
  children,
  actions,
  navbarContent,
  onNavigate,
}) {
  return (
    <div className="app app-has-sidebar">
      <Sidebar onNavigate={onNavigate} />
      <div className="main-content">
        <nav className="navbar">
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <div className="logo">
                <span className="logo-symbol">*</span> KAVIA AI
              </div>
              {navbarContent ? (
                <div>{navbarContent}</div>
              ) : (
                <div style={{ display: "flex", gap: "10px" }}>
                  <FavoritesTopBarShortcuts />
                </div>
              )}
            </div>
          </div>
        </nav>
        <main>
          {title && (
            <div className="container" style={{ paddingTop: 32 }}>
              <div className="subtitle">{title}</div>
            </div>
          )}
          {/* Card-based responsive grid */}
          <div className="container mm-card-grid">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
