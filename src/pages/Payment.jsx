import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Payment() {

  const navigate = useNavigate();

  // GET DATA
  const checkout =
    JSON.parse(localStorage.getItem("checkout")) || {};

  const billing =
    JSON.parse(localStorage.getItem("billing")) || {};

  const {
    cart = [],
    baseSubtotal = 0,
    discount = 0
  } = checkout;

  const {
    form = {},
    shipping = 0,
    delivery = "",
    finalTotal = 0
  } = billing;

  // LOAD RAZORPAY SCRIPT
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // PAYMENT HANDLER
  const handlePayment = () => {

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const amount = Math.round(Number(finalTotal || 0) * 100);

    if (amount <= 0) {
      alert("Invalid amount");
      return;
    }

    const options = {

      key: "rzp_live_SyNyCgjxMxpZKz",

      amount: amount,
      currency: "INR",

      name: "Fitnexis",
      description: "Secure Order Payment",

      image: "/logo.png",

      handler: function (response) {

        console.log("Payment Success:", response);

        localStorage.setItem(
          "payment",
          JSON.stringify(response)
        );

        alert("Payment Successful!");

        navigate("/success");
      },

      prefill: {
        name: form.name || "",
        email: form.email || "",
        contact: form.phone || ""
      },

      notes: {
        address: form.address || ""
      },

      theme: {
        color: "#ff7a00"
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="payment-page">

      <div className="payment-container">

        {/* LEFT SIDE */}
        <div className="payment-left">

          <h2>Payment Method</h2>

          <div className="payment-card">
            <p>Razorpay Secure Payment</p>
          </div>

          <div className="delivery-box">

            <h3>Delivery Details</h3>

            <p>{form.name}</p>
            <p>{form.address}</p>
            <p>{form.city} {form.state} {form.pincode}</p>
            <p>{form.phone}</p>
            <p>{delivery}</p>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="payment-right">

          <h2>Order Summary</h2>

          {cart.map((item, i) => (
            <div key={i} className="summary-item">
              <span>{item.name} × {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <hr />

          <p>Subtotal: ₹{baseSubtotal}</p>
          <p>Discount: -₹{discount}</p>
          <p>Shipping: ₹{shipping}</p>

          <h3>Total: ₹{finalTotal}</h3>

          <button className="pay-btn" onClick={handlePayment}>
            Pay ₹{finalTotal}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Payment;       