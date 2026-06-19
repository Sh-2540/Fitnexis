import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Checkout({ cart }) {
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  // BASE PRICE (ALREADY 20% OFF PRICE)
  console.log(cart);
  const baseSubtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  // SHIPPING LOGIC
 const shipping = baseSubtotal > 2000 ? 0 : 79;
      

  // APPLY COUPON (ON BASE PRICE ONLY)
  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    console.log("Coupon:",code);
   
      console.log(cart);
      return;
    }
    {
  
    const coupons = {
      NEXIS10: 0.10,
      NEXIS15: 0.15,
      NEXIS20: 0.20,
    };
  
    if (!coupons[code]) {
      setDiscount(0);
      alert("Invalid coupon code");
      return;
    }
  
    setDiscount(baseSubtotal * coupons[code]);
  };

  const total = baseSubtotal - discount + shipping;

  // SAVE DATA BEFORE NAVIGATE
  const goToBilling = () => {
    localStorage.setItem(
      "checkout",
      JSON.stringify({
        cart,
        baseSubtotal,
        discount,
        shipping,
        total
      })
    );

    navigate("/billing");
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">

        {/* LEFT CART */}
        <div className="checkout-left">
          <h2>Cart Summary</h2>

          {cart.map((item, i) => (
            <div key={i} className="item">
              <img src={item.image} alt={item.name} />
              <div>
              <h4>{item.name}</h4>

{item.flavor && (
  <p>Flavor: {item.flavor}</p>
)}

{item.size && (
  <p>Size: {item.size}</p>
)}

<p>Qty: {item.qty}</p>
              </div>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
        </div>

        {/* RIGHT SUMMARY */}
        <div className="checkout-right">

          <h3>Order Summary</h3>

          {/* COUPON */}
          <div className="coupon-box">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
            />

            <button onClick={applyCoupon}>
              Apply
            </button>
          </div>

          {/* PRICES */}
          <div className="row">
            <span>Subtotal</span>
            <span>₹{baseSubtotal}</span>
          </div>

          {discount > 0 && (
            <div className="row green">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>
          )}

          <div className="row">
            <span>Shipping</span>
            <span>₹{shipping}</span>
          </div>

          <div className="row total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="checkout-btn" onClick={goToBilling}>
            Continue
          </button>

        </div>

      </div>
    </div>
  );
}

export default Checkout;