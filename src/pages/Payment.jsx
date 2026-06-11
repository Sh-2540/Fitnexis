import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection,addDoc,serverTimestamp  } from "firebase/firestore";


function Payment() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  // GET CHECKOUT DATA
  const checkout =
    JSON.parse(
      localStorage.getItem("checkout")
    ) || {};

  // GET BILLING DATA
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

    const loadRazorpay = () => {

      return new Promise((resolve) => {

        const script =
          document.createElement("script");

        script.src =
          "https://checkout.razorpay.com/v1/checkout.js";

        script.async = true;

        script.onload = () => {

          console.log(
            "Razorpay SDK Loaded"
          );

          resolve(true);
        };

        script.onerror = () => {

          console.log(
            "Razorpay SDK Failed"
          );

          resolve(false);
        };

        document.body.appendChild(script);
      });
    };

    loadRazorpay();

  }, []);

  // HANDLE PAYMENT
  const handlePayment = async () => {

    try {

      setLoading(true);

      // CHECK SDK
      if (!window.Razorpay) {

        alert(
          "Razorpay SDK not loaded"
        );

        return;
      }

      // SAFE AMOUNT
      const amount = 100;
        

      console.log(
        "window.Razorpay =",
        window.Razorpay
      );

      console.log(
        "finalTotal =",
        finalTotal
      );

      console.log(
        "amount =",
        amount
      );

      // VALIDATION
      if (!amount || amount <= 0) {

        alert("Invalid amount");

        return;
      }

      // RAZORPAY OPTIONS
      const options = {

        // REPLACE WITH YOUR LIVE KEY
        key: "rzp_live_SyNyCgjxMxpZKz",

        amount: 100,

        currency: "INR",

        name: "Fitnexis",

        description:
          "Secure Order Payment",

        image: "/logo.png",

        handler: async function (response) {

          try {
        
            await addDoc(
              collection(db, "orders"),
              {
                paymentId:
                  response.razorpay_payment_id,
        
                customer: form,
        
                products: cart,
        
                subtotal: baseSubtotal,
        
                discount: discount,
        
                shipping: shipping,
        
                total: finalTotal,
        
                delivery: delivery,
        
                status: "Processing",
        
                createdAt:
                  serverTimestamp()
              }
            );
        
            alert("Payment Successful!");
        
            navigate("/success");
        
          } catch (error) {
        
            console.error(
              "Firestore Error:",
              error
            );
        
            alert(
              "Order saved failed"
            );
          }
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

      // CREATE RAZORPAY INSTANCE
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

      // OPEN PAYMENT POPUP
      razorpay.open();

    } catch (error) {

      console.error(
        "FULL PAYMENT ERROR:",
        error
      );

      alert(
        error.message ||
        "Payment Error"
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

          {/* DELIVERY DETAILS */}

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