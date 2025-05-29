import React, { useState, useRef, useEffect } from "react";
import Card from "../components/Card";

// PUBLIC_INTERFACE
/** 
 * AIBartender – Interactive chat demo UI for cocktail suggestions.
 * Lets users "ask" cocktail questions to the AI, returning a mock response.
 */
function AIBartender() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! 🍸 I'm your AI Bartender. Ask what you can make or get a cocktail idea!" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef(null);

  // Autoscroll to latest message.
  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(e) {
    e.preventDefault();
    const question = inputValue.trim();
    if (!question) return;
    setMessages((msgs) => [
      ...msgs,
      { sender: "user", text: question }
    ]);
    setInputValue("");

    // Demo AI reply, could randomize or return more creative text!
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          sender: "ai",
          text: getDemoBartenderReply(question)
        }
      ]);
    }, 600);
  }

  function getDemoBartenderReply(q) {
    const lower = q.toLowerCase();
    // Simple keyword demo logic:
    if (lower.includes("gin") && lower.includes("lime"))
      return "Try a Gin Gimlet or a Southside! 🍸 Recipe: Gin, Lime Juice, simple syrup, and a mint garnish.";
    if (lower.includes("tequila"))
      return "Why not a Margarita or Paloma? Both use Tequila and are super refreshing.";
    if (lower.includes("whiskey"))
      return "How about an Old Fashioned or Whiskey Sour?";
    if (lower.includes("rum"))
      return "You can make a Mojito or Daiquiri! Tips: Pair with mint and lime for summer vibes.";
    if (lower.includes("vodka"))
      return "A classic Cosmopolitan or Moscow Mule is always a hit with vodka!";
    if (lower.includes("sweet"))
      return "Try a Cosmopolitan or a Daiquiri for those with a sweet tooth!";
    if (lower.includes("refresh"))
      return "Mojito, Margarita, or Southside are all super refreshing options.";
    if (lower.match(/what.*make|ideas|cocktail.*with|suggest/))
      return "Tell me an ingredient you have! Or choose a base spirit: gin, rum, tequila, whiskey, or vodka.";
    // Default
    return "Here's a fun recipe: Gin, Lemon, a splash of honey, and tonic water. Enjoy!";
  }

  return (
    <Card title={
      <span>
        <span role="img" aria-label="robot" style={{ marginRight: 8 }}>🤖</span>
        AI Bartender
      </span>
    }>
      <div style={{
        display: "flex", flexDirection: "column",
        height: "min(370px, 42vw)", minHeight: 190, maxHeight: 390,
        overflow: "auto", marginBottom: 13, borderRadius: 7, background: "var(--card-bg)"
      }}>
        <div style={{ flex: 1, padding: "6px 2px 7px 0", overflowY: "auto", scrollbarWidth: "thin" }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                marginBottom: 3,
              }}>
              <div
                style={{
                  maxWidth: "94%",
                  background: msg.sender === "ai" ? "#222541" : "var(--brand-accent)",
                  color: msg.sender === "ai" ? "#fff" : "#fff",
                  borderRadius: msg.sender === "ai" ? "12px 16px 16px 9px" : "14px 12px 9px 16px",
                  boxShadow: "0 1px 4px 0 rgba(30,26,60,.10)",
                  fontSize: ".98em",
                  padding: "11px 14px",
                  marginBottom: "1.5px",
                  minWidth: 32,
                  marginLeft: msg.sender === "ai" ? 0 : "auto",
                  marginRight: msg.sender === "ai" ? "auto" : 0,
                  alignSelf: msg.sender === "ai" ? "flex-start" : "flex-end",
                  whiteSpace: "pre-line"
                }}
                aria-label={msg.sender === "ai" ? "Bartender" : "You"}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>
      <form onSubmit={handleSend} style={{ display: "flex", gap: ".7em" }}>
        <input
          type="text"
          placeholder="Type your cocktail question…"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          style={{
            flex: 1,
            background: "var(--card-bg)",
            color: "#fff",
            border: "2px solid var(--kavia-accent)",
            borderRadius: "6px",
            padding: "10px 14px",
            fontSize: "1em",
            outline: "none"
          }}
          aria-label="Chat with bartender"
        />
        <button
          className="btn"
          type="submit"
          aria-label="Send"
          style={{ minWidth: 72 }}
          disabled={!inputValue.trim()}
        >Send</button>
      </form>
      <div style={{
        marginTop: 7, color: "#aaa", fontSize: ".96em", minHeight: 5
      }}>
        This is a demo—AI answers are sample suggestions. Try typing: <b>What can I make with whiskey?</b>
      </div>
    </Card>
  );
}

export default AIBartender;
