import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Track Order", path: "/track-order" }
  ];

  return (
    <nav className="navbar">

      {/* LOGO */}
      <h2 className="logo">FITNEXIS</h2>

      {/* DESKTOP MENU */}
      <ul className="desktop-menu">
        {menuItems.map((item, i) => (
          <li key={i}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>

      {/* HAMBURGER ICON */}
      <button className="menu-btn" onClick={() => setMenuOpen(true)}>
        <FaBars />
      </button>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>

        {/* CLOSE ICON */}
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          <FaTimes />
        </button>

        <ul>
          {menuItems.map((item, i) => (
            <li key={i} onClick={() => setMenuOpen(false)}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>

      </div>

    </nav>
  );
}