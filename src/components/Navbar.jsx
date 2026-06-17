import { Link } from "react-router-dom";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar({ cartCount, openCart }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">

        {/* Logo */}
        <h1 className="logo">Fitnexis</h1>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/shop">Shop</Link>
          </li>

          <li>
            <Link to="/products">Products</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className="nav-right">

  {/* Mobile Cart Icon */}
  <button
    className="mobile-cart-btn"
    onClick={openCart}
  >
    <FaShoppingCart />
    {cartCount > 0 && (
      <span className="cart-badge">
        {cartCount}
      </span>
    )}
  </button>

  {/* Desktop Cart Button */}
  <button
    className="primary-btn cart-btn"
    onClick={openCart}
  >
    Cart ({cartCount})
  </button>

  {/* Hamburger */}
  <button
    className={`hamburger ${menuOpen ? "open" : ""}`}
    onClick={() => setMenuOpen(!menuOpen)}
  >
    <span></span>
    <span></span>
    <span></span>
  </button>

</div>
      </nav>

  {/* Dark Overlay */}
{menuOpen && (

<div
  className="mobile-overlay"
  onClick={() => setMenuOpen(false)}
></div>
)}
      {/* Mobile Drawer */}
      <div
        className={`mobile-drawer ${menuOpen ? "active" : ""}`}
      >

        <ul className="mobile-links">

          <li>
            <Link to="/home" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/shop" onClick={() => setMenuOpen(false)}>
              Shop
            </Link>
          </li>

          <li>
            <Link to="/products" onClick={() => setMenuOpen(false)}>
              Products
            </Link>
          </li>

          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>

          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>

          {/* Mobile Cart */}
          <li>
            <button
              className="primary-btn"
              onClick={() => {
                openCart();
                setMenuOpen(false);
              }}
            >
              Cart ({cartCount})
            </button>
          </li>

        </ul>

      </div>
    </>
  );
}