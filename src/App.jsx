import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Payment from "./pages/Payment";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import "./style.css";
import CartSidebar from "./components/CartSidebar";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Billing from "./pages/Billing";
export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
 

  // 🔥 AUTH LISTENER
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // ⏳ LOADING SCREEN
  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;
  }

  // 🛒 ADD TO CART
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });

    setCartOpen(true);
  };

  // 💰 TOTAL PRICE
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <>
      {/* NAVBAR */}
      <Navbar
        cartCount={cart.length}
        openCart={() => setCartOpen(true)}
        user={user}
      />

      {/* CART SIDEBAR */}
      <div className={cartOpen ? "cart-sidebar active" : "cart-sidebar"}>
        
        <CartSidebar
  cart={cart}
  setCart={setCart}
  cartOpen={cartOpen}
  setCartOpen={setCartOpen}
  total={total}
/>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Cart is empty</p>
          ) : (
            cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.name} />

                <div>
                  <h4>{item.name}</h4>
                  <p>
                    ₹{item.price} × {item.qty}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-bottom">
          <h3>Total: ₹{total}</h3>
          <button className="primary-btn">Checkout</button>
        </div>
      </div>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/Payment" element={<Payment/>} />
        <Route path="/about" element={<About />} />

        <Route path="/products" element={<Products addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
        <Route path="/contact" element={<Contact />} />
        <Route
  path="/checkout"
  element={<Checkout cart={cart} />}
/>
        
      </Routes>
    </>
  );
}