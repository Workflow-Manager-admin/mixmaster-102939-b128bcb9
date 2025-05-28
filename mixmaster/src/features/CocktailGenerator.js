import React from "react";
import Card from "../components/Card";

// PUBLIC_INTERFACE
/** 
 * CocktailGenerator – Cocktail recipe generator demo UI.
 */
function CocktailGenerator() {
  return (
    <Card title="Cocktail Generator">
      <div>
        <strong>Demo:</strong> Generate a cocktail recipe.<br />
        <ul style={{margin: "0.7em 0 0"}}>
          <li>Select a base liquor</li>
          <li>Choose flavor/style (Refreshing, Strong, etc.)</li>
          <li>Show ingredients and recipe steps</li>
        </ul>
      </div>
    </Card>
  );
}

export default CocktailGenerator;
