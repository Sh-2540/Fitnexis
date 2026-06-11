import { useState } from "react";

import {
  Routes,
  Route
} from "react-router-dom";

import "./style.css";

/* COMPONENTS */
import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";

/* PAGES */
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Billing from "./pages/Billing";
import Payment from "./pages/Payment";
import Success from "./pages/Success";

export default function App() {

  /* =========================
     CART STATE
  ========================= */

  const [cart, setCart] = useState([]);

  const [cartOpen, setCartOpen] =
    useState(false);

  /* =========================
     ADD TO CART
  ========================= */

  const addToCart = (product) => {

    setCart((prev) => {

      const existing =
        prev.find(
          (item) =>
            item.id === product.id
        );

      if (existing) {

        return prev.map((item) =>

          item.id === product.id

            ? {
                ...item,
                qty: item.qty + 1
              }

            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          qty: 1
        }
      ];
    });

    setCartOpen(true);
  };

  /* =========================
     TOTAL
  ========================= */

  const total =
    cart.reduce(

      (acc, item) =>

        acc +
        item.price * item.qty,

      0
    );

  return (

    <>

      {/* =========================
          NAVBAR
      ========================= */}

      <Navbar

        cartCount={cart.length}

        openCart={() =>
          setCartOpen(true)
        }

      />

      {/* =========================
          CART SIDEBAR
      ========================= */}

      <CartSidebar

        cart={cart}

        setCart={setCart}

        cartOpen={cartOpen}

        setCartOpen={setCartOpen}

        total={total}

      />

      {/* =========================
          ROUTES
      ========================= */}

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/shop"
          element={<Shop />}
        />

        <Route
          path="/products"
          element={
            <Products
              addToCart={addToCart}
            />
          }
        />

        <Route

          path="/product/:id"

          element={

            <ProductDetails
              addToCart={addToCart}
            />

          }
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route

          path="/checkout"

          element={
            <Checkout
              cart={cart}
            />
          }
        />

        <Route
          path="/billing"
          element={<Billing />}
        />

        <Route
          path="/payment"
          element={<Payment />}
        />

<Route
  path="/success"
  element={<Success />}
/>




      </Routes>

    </>
  );
}