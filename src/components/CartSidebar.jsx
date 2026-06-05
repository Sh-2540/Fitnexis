import React from "react";
import { useNavigate } from "react-router-dom";

export default function CartSidebar({
  cart,
  setCart,
  cartOpen,
  setCartOpen,
  total,
}) {
  const navigate = useNavigate();

  return (
    <div className={cartOpen ? "cart-sidebar active" : "cart-sidebar"}>
      <div className="cart-top">
        <h2>Your Cart</h2>
        <button className="close-btn" onClick={() => setCartOpen(false)}>
          ✕
        </button>
      </div>

      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="empty-cart">Cart is empty</p>
        ) : (
          cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price} × {item.qty}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-bottom">
        <h3>Total: ₹{total}</h3>

        <button
          className="primary-btn"
          disabled={cart.length === 0}
          onClick={() => {
            setCartOpen(false);
            navigate("/checkout");
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}