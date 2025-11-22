import { useState } from "react";
import Upload from "./Upload.jsx";

function App() {
  return (
    <div style={{ fontFamily: "system-ui", background: "#020617", color: "#e5e7eb", minHeight: "100vh", padding: "2rem", textAlign: "center" }}>
      <h1>Season Color Finder</h1>
      <Upload />
    </div>
  );
}

export default App;
