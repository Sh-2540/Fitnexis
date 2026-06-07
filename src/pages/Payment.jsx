import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./payment.css";

function Payment() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  // GET DATA
  const checkout =
    JSON.parse(
      localStorage.getItem("checkout")
    ) || {};

  const billing =
    JSON.parse(
      localStorage.getItem("billing")
    ) || {};

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

  // LOAD RAZORPAY SDK
  useEffect(() => {

    const loadRazorpay = async () => {
  
      return new Promise((resolve) => {
  
        const script =
          document.createElement("script");
  
        script.src =
          "https://checkout.razorpay.com/v1/checkout.js";
  
        script.onload = () => {
          resolve(true);
        };
  
        script.onerror = () => {
          resolve(false);
        };
  
        document.body.appendChild(script);
      });
    };
  
    loadRazorpay();
  
  }, []);
  

  // HANDLE PAYMENT
  console.log(window.Razorpay);
  const handlePayment = async () => {

    try {

      setLoading(true);

      // CHECK SDK
      if (!window.Razorpay) {

        alert(
          "Razorpay SDK failed to load"
        );

        return;
      }

      // SAFE AMOUNT
      const amount =
        Math.round(
          Number(finalTotal || 0) * 100
        );

      console.log(
        "Final Total:",
        finalTotal
      );

      console.log(
        "Razorpay Amount:",
        amount
      );

      // VALIDATION
      if (!amount || amount <= 0) {

        alert("Invalid amount");

        return;
      }

      // OPTIONS
      const options = {

        key: "rzp_live_SyNyCgjxMxpZKz",

        amount: amount,

        currency: "INR",

        name: "Fitnexis",

        description:
          "Secure Order Payment",

        image: "/logo.png",

        handler: function (response) {

          console.log(
            "Payment Success:",
            response
          );

          // SAVE PAYMENT
          localStorage.setItem(
            "payment",
            JSON.stringify(response)
          );

          alert(
            "Payment Successful!"
          );

          navigate("/success");
        },

        prefill: {

          name:
            form.name || "",

          email:
            form.email || "",

          contact:
            form.phone || ""
        },

        notes: {

          address:
            form.address || ""
        },

        theme: {

          color: "#ff7a00"
        },

        modal: {

          ondismiss: function () {

            console.log(
              "Payment popup closed"
            );
          }
        }
      };

      // CREATE RAZORPAY
      const razorpay =
        new window.Razorpay(options);

      // PAYMENT FAILED
      razorpay.on(
        "payment.failed",

        function (response) {

          console.log(
            "Payment Failed:",
            response
          );

          alert(
            response.error.description
          );
        }
      );

      // OPEN PAYMENT
      razorpay.open();

    } catch (error) {

      console.error(error);

      alert(
        "Something went wrong while processing payment"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="payment-page">

      <div className="payment-container">

        {/* LEFT */}

        <div className="payment-left">

          <h2>
            Payment Method
          </h2>

          <div className="payment-card">

            <p>
              Razorpay Secure Payment
            </p>

          </div>

          {/* DELIVERY */}

          <div className="delivery-box">

            <h3>
              Delivery Details
            </h3>

            <p>
              {form.name}
            </p>

            <p>
              {form.address}
            </p>

            <p>

              {form.city}
              {" "}
              {form.state}
              {" "}
              {form.pincode}

            </p>

            <p>
              {form.phone}
            </p>

            <p>
              {delivery}
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="payment-right">

          <h2>
            Order Summary
          </h2>

          {cart.map((item, i) => (

            <div
              key={i}
              className="summary-item"
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

          <hr />

          <p>

            Subtotal:
            {" "}
            ₹{baseSubtotal}

          </p>

          <p>

            Discount:
            {" "}
            -₹{discount}

          </p>

          <p>

            Shipping:
            {" "}
            ₹{shipping}

          </p>

          <h3>

            Total:
            {" "}
            ₹{finalTotal}

          </h3>

          {/* PAY BUTTON */}

          <button
            className="pay-btn"
            onClick={handlePayment}
            disabled={loading}
          >

            {loading
              ? "Processing..."
              : `Pay ₹${finalTotal}`}

          </button>

        </div>

      </div>

    </div>
  );
}

export default Payment;