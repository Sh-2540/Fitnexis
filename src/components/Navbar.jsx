import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";


export default function Navbar({ cartCount = 0 , openCart,}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="navbar">
      
      {/* LOGO */}
      <div className="logo">
  FIT<span>N</span>EXIS
</div>

      {/* DESKTOP MENU */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/track-order">Track Order</Link></li>
      </ul>

      {/* CART ICON */}
      <div className="nav-right">
      <button
  className="cart-icon"
  onClick={openCart}
>
  <FaShoppingCart />
  <span className="cart-count">{cartCount}</span>
</button>
        {/* HAMBURGER */}
        <div className="hamburger" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={menuOpen ? "mobile-menu active" : "mobile-menu"}>
        <Link onClick={toggleMenu} to="/">Home</Link>
        <Link onClick={toggleMenu} to="/shop">Shop</Link>
        <Link onClick={toggleMenu} to="/products">Products</Link>
        <Link onClick={toggleMenu} to="/about">About</Link>
        <Link onClick={toggleMenu} to="/contact">Contact</Link>
        <Link onClick={toggleMenu} to="/track-order">Track Order</Link>
      </div>

    </header>
  );
}