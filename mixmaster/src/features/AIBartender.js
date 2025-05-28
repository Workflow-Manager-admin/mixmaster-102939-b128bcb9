import React from "react";
import Card from "../components/Card";

// PUBLIC_INTERFACE
/** 
 * AIBartender – AI-powered cocktail suggestion/chat demo UI.
 */
function AIBartender() {
  return (
    <Card title="AI Bartender">
      <div>
        <strong>Demo:</strong> Ask AI for cocktail ideas.<br />
        <ul style={{margin: "0.7em 0 0"}}>
          <li>Input: “What can I make with gin + lime?”</li>
          <li>AI response: Suggests cocktails, recipes</li>
        </ul>
      </div>
    </Card>
  );
}

export default AIBartender;
