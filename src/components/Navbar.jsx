import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar({
  cartCount,
  openCart
}) {

  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <nav className="navbar">

      <h1 className="logo">
        Fitnexis
      </h1>

      {/* HAMBURGER */}
      <div
  className={`hamburger ${menuOpen ? "open" : ""}`}
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

        <button
          className="primary-btn"
          onClick={openCart}
        >
          Cart ({cartCount})
        </button>

      </ul>

    </nav>

  );

}