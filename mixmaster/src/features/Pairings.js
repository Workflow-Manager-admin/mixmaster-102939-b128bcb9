import React from "react";
import Card from "../components/Card";

// PUBLIC_INTERFACE
/** 
 * Pairings – Liquor & food pairing demo UI.
 */
function Pairings() {
  return (
    <Card title="Liquor Pairings">
      <div>
        <strong>Demo:</strong> Food pairings for your drinks.<br />
        <ul style={{margin: "0.7em 0 0"}}>
          <li>Select a drink to see pairing suggestions</li>
          <li>Example: Wine + Cheese, Whiskey + Steak</li>
        </ul>
      </div>
    </Card>
  );
}

export default Pairings;
