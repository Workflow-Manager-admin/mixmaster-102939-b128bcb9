import React from "react";
import Card from "../components/Card";

// PUBLIC_INTERFACE
/** 
 * Explorer – Liquor & Mixer Explorer mock/demo.
 */
function Explorer() {
  return (
    <Card title="Liquor & Mixer Explorer">
      <div>
        <strong>Demo:</strong> Browse liquors & mixers.<br />
        Show: Whiskey, Gin, Tequila, etc.<br />
        <ul style={{margin: "0.7em 0 0"}}>
          <li>Display liquor type cards</li>
          <li>Show description, recommended mixers, cocktails</li>
        </ul>
      </div>
    </Card>
  );
}

export default Explorer;
