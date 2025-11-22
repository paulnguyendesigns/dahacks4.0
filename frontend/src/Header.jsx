import React from "react";
import "./index.css";

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <span className="header-title">Home</span>
        <span className="header-title">About Us</span>
        <span className="header-title">Contact</span>
      </div>

      <img src="public/logo.png" alt="Season Color Finder" className="logo" />

      <div className="header-right" />
    </header>
  );
}
