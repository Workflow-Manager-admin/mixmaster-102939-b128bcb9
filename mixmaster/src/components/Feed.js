import React from "react";
import Card from "./Card";

/**
 * Feed – Mock real-time feed of recently added drinks or likes.
 * Shows a simple vertical list of recent cocktail events (user actions, new drinks, etc).
 * Branded card style, static data for demo.
 */
// PUBLIC_INTERFACE
function Feed({ events }) {
  return (
    <div>
      <h3 style={{ color: "#F67280", margin: "0 0 16px 3px", fontWeight: 500, fontSize: "1.13rem" }}>Real-Time Feed</h3>
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
              style={{ padding: "14px 18px", background: "#1A1A2E" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span role="img" aria-label={event.type} style={{ fontSize: 20 }}>{event.emoji}</span>
                <span>
                  <b>{event.user}</b> {event.action} <b>{event.cocktail}</b>
                  {event.time && (
                    <span style={{ color: "#aaa", marginLeft: 7, fontSize: ".94em" }}>
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
