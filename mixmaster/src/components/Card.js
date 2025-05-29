import React from "react";

/**
 * Card component – reusable card layout for MixMaster.
 * Styles: Branded with #1A1A2E, #16213E, #F67280 (dark backgrounds, accent border).
 * Handles children as content, supports optional title and actions.
 * Responsive, adapts grid/item width for mobile.
 */
/**
 * PUBLIC_INTERFACE
 * Card component with modern visual options. By default, cards are elevated, rounded, and polished.
 * Props:
 * - title: Card title/header.
 * - actions: Aligned at bottom.
 * - variant: "elevated" (default), "flat", or "outline".
 * - className, style: As before.
 */
function Card({ title, children, actions, className = "", style = {}, variant = "elevated" }) {
  // Variant class for visual effects/shadow/outline
  const variantClass =
    variant === "flat"
      ? "mm-card-flat"
      : variant === "outline"
      ? "mm-card-outline"
      : "mm-card-elevated";
  return (
    <div
      className={`mm-card ${variantClass} ${className}`.trim()}
      style={{
        ...style,
        // Remove clutter: Card always has generous padding/radius, never overrides.
        borderRadius: "15px",
        boxShadow:
          variant === "flat"
            ? "none"
            : variant === "outline"
            ? "0 0 0 2.5px var(--card-border)"
            : "0 4px 18px 0 rgba(30,26,60,0.14), 0 1.5px 0.5px var(--card-title)",
        border: variant === "flat" ? "none" : "2.5px solid var(--card-border)",
        background:
          variant === "flat"
            ? "var(--card-bg)"
            : "linear-gradient(135deg, var(--card-bg) 86%, rgba(246, 114, 128, 0.07) 99%)"
      }}
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
