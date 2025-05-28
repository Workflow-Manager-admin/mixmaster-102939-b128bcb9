import React from "react";
import Card from "../components/Card";

// PUBLIC_INTERFACE
/** 
 * Search – Smart Search demo UI for liquor/cocktail lookup.
 */
function Search() {
  return (
    <Card title="Smart Search">
      <div>
        <strong>Demo:</strong> Search by liquor or cocktail name.<br />
        <ul style={{margin: "0.7em 0 0"}}>
          <li>Input for search term</li>
          <li>Show liquor/cocktail results</li>
          <li>Mix ideas & suggestions</li>
        </ul>
      </div>
    </Card>
  );
}

export default Search;
