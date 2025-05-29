import React from "react";

/**
 * PUBLIC_INTERFACE
 * Card component for modern elevated or flat UI. Always applies rounded corners, ample padding, subtle shadow by default.
 * Props:
 *   - title: Card title (string or node)
 *   - actions: content (right, at bottom)
 *   - variant: "elevated" (default), "flat", "outline"
 *   - className, style: composable additions
 */
function Card({ title, children, actions, className = "", style = {}, variant = "elevated" }) {
  // Modern card visual effect
  const variantClass =
    variant === "flat"
      ? "mm-card-flat"
      : variant === "outline"
      ? "mm-card-outline"
      : "mm-card-elevated";
  return (
    <div
      className={`mm-card ${variantClass}${className ? " " + className : ""}`}
      style={{
        ...style,
        borderRadius: "17px",
        background:
          variant === "flat"
            ? "var(--card-bg)"
            : "linear-gradient(135deg, var(--card-bg) 92%, rgba(246, 114, 128, 0.07) 100%)",
        border: variant === "flat" ? "none" : "2.5px solid var(--card-border)",
        boxShadow:
          variant === "flat"
            ? "0 1.5px 5px 0 rgba(30,26,60,0.05)"
            : variant === "outline"
            ? "0 0 0 2.5px var(--card-border)"
            : "0 8px 32px 0 rgba(30,26,60,0.11), 0 1.5px 0.5px var(--card-title)",
        padding: "24px 26px 21px 26px",
        margin: "0 0 0 0"
      }}
      tabIndex={0}
      aria-label={title || "Card"}
    >
      {title && <div className="mm-card-title" style={{
        marginBottom: 11,
        fontWeight: 700,
        fontSize: "1.18rem",
        letterSpacing: "0.008em"
      }}>{title}</div>}
      <div className="mm-card-content" style={{
        paddingBottom: actions ? 5 : 0,
        fontSize: "1.02rem"
      }}>{children}</div>
      {actions && <div className="mm-card-actions">{actions}</div>}
    </div>
  );
}

export default Card;
