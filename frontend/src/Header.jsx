import React from "react";
import "./index.css";          // index.css in src/
import logo from "./assets/LOGO.PNG"; // logo in src/assets/

export default function Header() {
  return (
    <header className="app-header">
      <img src={logo} alt="Season Color Finder" className="logo" />
    </header>
  );
}
