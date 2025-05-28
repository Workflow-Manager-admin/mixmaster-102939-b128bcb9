import React from "react";
import Card from "./Card";

/**
 * Feed – Mock real-time feed of recently added drinks or likes.
 * Shows a simple vertical list of recent cocktail events (user actions, new drinks, etc).
 * Branded card style, static data for demo.
 */
function Feed({ events }) {
  return (
    <div>
      <h3 style={{
        color: "var(--brand-accent)",
        margin: "0 0 16px 3px",
        fontWeight: 600,
        fontSize: "1.14rem"
      }}>
        Real-Time Feed
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
        {events.length === 0 ? (
          <Card>
            <span style={{ color: "#bbb" }}>(No recent feed events)</span>
          </Card>
        ) : (
          events.map((event, idx) => (
            <Card
              key={idx}
              className="feed-card"
              style={{
                padding: "14px 18px",
                background: "var(--kavia-main-bg-dark)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span role="img" aria-label={event.type} style={{ fontSize: 20 }}>{event.emoji}</span>
                <span>
                  <b>{event.user}</b> {event.action} <b>{event.cocktail}</b>
                  {event.time && (
                    <span style={{ color: "var(--text-secondary)", marginLeft: 7, fontSize: ".94em" }}>
                      · {event.time} ago
                    </span>
                  )}
                </span>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default Feed;
