import React from "react";

/**
 * Card component – reusable card layout for MixMaster.
 * Styles: Branded with #1A1A2E, #16213E, #F67280 (dark backgrounds, accent border).
 * Handles children as content, supports optional title and actions.
 * Responsive, adapts grid/item width for mobile.
 */
// PUBLIC_INTERFACE
function Card({ title, children, actions, className = "", style = {} }) {
  return (
    <div
      className={`mm-card ${className}`}
      style={style}
      tabIndex={0}
      aria-label={title || "Card"}
    >
      {title && <div className="mm-card-title">{title}</div>}
      <div className="mm-card-content">{children}</div>
      {actions && <div className="mm-card-actions">{actions}</div>}
    </div>
  );
}

export default Card;
