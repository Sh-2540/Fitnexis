import { Link } from "react-router-dom";
import { useState } from "react";

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
            <Link to="/contact">Contact</Link>
          </li>

          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className="nav-right">

          {/* Desktop Cart */}
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
      <div
        className={`mobile-overlay ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Mobile Drawer */}
      <div
        className={`mobile-drawer ${menuOpen ? "active" : ""}`}
      >

        <ul className="mobile-links">

          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
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
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>

          <li>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
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