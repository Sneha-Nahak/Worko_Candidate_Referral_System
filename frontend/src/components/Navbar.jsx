// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-gold">Worko</span>
          <span className="brand-sub">Referrals</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/refer" className="nav-link">Refer Candidate</Link>
        </div>
      </div>
    </nav>
  );
}
