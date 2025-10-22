import "./Navbar.css"
import React from "react";
import { Link } from "react-router-dom"; 
function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Practice</h2>
      <ul className="nav-links">
        <li><Link to="/homepage">Home</Link></li>
        <li><Link to="/listings">Listings</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
