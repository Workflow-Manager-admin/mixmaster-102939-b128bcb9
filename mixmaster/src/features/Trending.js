import React from "react";
import Card from "../components/Card";

// PUBLIC_INTERFACE
/** 
 * Trending – Trending & Seasonal Mixes demo UI.
 */
function Trending() {
  return (
    <Card title="Trending & Seasonal Mixes">
      <div>
        <strong>Demo:</strong> Trending drinks & seasonal cocktails.<br />
        <ul style={{margin: "0.7em 0 0"}}>
          <li>Trending cocktails (real-time/likes)</li>
          <li>Sections: Summer Vibes, Winter Warmers</li>
        </ul>
      </div>
    </Card>
  );
}

export default Trending;
