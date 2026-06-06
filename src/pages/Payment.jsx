import React from "react";
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

  // PAYMENT
  const handlePayment = async () => {

    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load");
      return;
    }
    const amount = Math.round(Number(finalTotal) * 100);

    console.log("FINAL TOTAL:", finalTotal);
    
    console.log("RAZORPAY AMOUNT:", amount);
    
    if (!amount || amount <= 0) {
      alert("Invalid amount");
      return;
    }
    const handlePayment = () => {

      const options = {
    
        key: "rzp_test_SyICPPjLwUrkbL",
    
        amount: 50000,
    
        currency: "INR",
    
        name: "Fitnexis",
    
        description: "Test Payment",
    
        handler: function (response) {
    
          alert("Payment Successful");
    
          console.log(response);
        }
      };
    
      const razorpay = new window.Razorpay(options);
    
      razorpay.open();
    };
  }
  
  return (

    <div className="payment-page">

      <div className="payment-container">

        {/* LEFT */}

        <div className="payment-left">

          <h2>Payment Method</h2>

          <div className="payment-card active">

            <div className="payment-top">

              <span>
                Razorpay Secure Payment
              </span>

              <span className="secure">
                Secure
              </span>

            </div>

            <p>
              Pay using UPI, Cards,
              Net Banking, Wallets
              and more.
            </p>

          </div>

          {/* DELIVERY */}

          <div className="delivery-box">

            <h3>Delivery Details</h3>

            <p>
              {form.name}
            </p>

            <p>
              {form.address}
            </p>

            <p>
              {form.city},
              {" "}
              {form.state}
              {" - "}
              {form.pincode}
            </p>

            <p>
              Phone:
              {" "}
              {form.phone}
            </p>

            <div className="delivery-time">

              Estimated Delivery:
              {" "}
              {delivery}

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="payment-right">

          <h2>Order Summary</h2>

          {cart.map((item, i) => (

            <div
              className="summary-item"
              key={i}
            >

              <span>
                {item.name}
                {" × "}
                {item.qty}
              </span>

              <span>
                ₹
                {item.price * item.qty}
              </span>

            </div>

          ))}

          <div className="summary-line">

            <span>Subtotal</span>

            <span>
              ₹{baseSubtotal}
            </span>

          </div>

          <div className="summary-line green">

            <span>Discount</span>

            <span>
              -₹{discount}
            </span>

          </div>

          <div className="summary-line">

            <span>Shipping</span>

            <span>
              ₹{shipping}
            </span>

          </div>

          <div className="summary-line total">

            <span>Total</span>

            <span>
              ₹{finalTotal}
            </span>

          </div>

          {/* PAY BUTTON */}

          <button
            className="pay-btn"
            onClick={handlePayment}
          >

            Pay ₹{finalTotal}

          </button>

        </div>

      </div>

    </div>

  );
}


export default Payment;