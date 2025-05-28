import React from "react";
import Card from "../components/Card";

// PUBLIC_INTERFACE
/** 
 * Favorites – Favorites & Shopping List demo UI.
 */
function Favorites() {
  return (
    <Card title="Favorites & Shopping List">
      <div>
        <strong>Demo:</strong> Your favorite cocktails.<br />
        <ul style={{margin: "0.7em 0 0"}}>
          <li>List of favorites (cocktails)</li>
          <li>Add to/remove from favorites</li>
          <li>Create and manage shopping list</li>
        </ul>
      </div>
    </Card>
  );
}

export default Favorites;
