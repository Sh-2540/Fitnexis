import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";




export default function Navbar({
  cartCount,
  openCart
}) {

  return (

    <nav className="navbar">

      <h1 className="logo">
        Fitnexis
      </h1>

      <ul className="nav-links">

        <li>

          <Link to="/">
            Home
          </Link>

        </li>

        <li>

          <Link to="/shop">
            Shop
          </Link>

        </li>

        <li>

          <Link to="/products">
            Products
          </Link>

        </li>

        <li>

          <Link to="/contact">
            Contact
          </Link>

        </li>
        
        <li>

          <Link to="/login">
            Login
          </Link>
        </li>  


      </ul>
      
      <button
        className="primary-btn"
        onClick={openCart}
      >

        Cart ({cartCount})

      </button>
      
    </nav>

  );

}