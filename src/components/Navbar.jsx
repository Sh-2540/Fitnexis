import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";

export default function Navbar({
  cartCount,
  openCart
}) {

  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <>
    
      <nav className="navbar">

        <h1 className="logo">
          Fitnexis
        </h1>

        {/* HAMBURGER */}
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* NAV LINKS */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

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

          {/* MOBILE CART BUTTON */}
          <li className="mobile-cart-btn">
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

        {/* DESKTOP CART BUTTON */}
        <button
          className="primary-btn desktop-cart"
          onClick={openCart}
        >
          Cart ({cartCount})
        </button>

      </nav>

      {/* OVERLAY */}
      <div
        className={`nav-overlay ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>

    </>

  );

}