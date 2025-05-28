import React from "react";
import Card from "../components/Card";

// PUBLIC_INTERFACE
/** 
 * ShoppingList – Personal shopping list demo UI.
 */
function ShoppingList() {
  return (
    <Card title="Shopping List">
      <div>
        <strong>Demo:</strong> See/make your shopping list for cocktails.<br />
        <ul style={{margin: "0.7em 0 0"}}>
          <li>Display ingredients needed</li>
          <li>Add/remove items</li>
          <li>Mark as purchased</li>
        </ul>
      </div>
    </Card>
  );
}

export default ShoppingList;
