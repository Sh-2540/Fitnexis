import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Billing() {

  const navigate = useNavigate();

  // GET CHECKOUT DATA
  const data =
    JSON.parse(localStorage.getItem("checkout")) || {};

  const {
    cart = [],
    baseSubtotal = 0,
    discount = 0
  } = data;

  // FORM
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  // SHIPPING STATES
  const localStates = ["Maharashtra"];

  // SHIPPING + DELIVERY
  const [shipping, setShipping] = useState(0);
  const [delivery, setDelivery] = useState("");

  // TOTAL WEIGHT
  const totalWeight = cart.reduce(
    (total, item) =>
      total + item.weight * item.qty,
    0
  );

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // SHIPPING CALCULATOR
  useEffect(() => {

    if (!form.state) return;

    const isLocal =
      localStates.includes(form.state);

    let shippingPrice = 0;

    // LOCAL SHIPPING
    if (isLocal) {

      if (totalWeight <= 0.05) {
        shippingPrice = 19;
      }

      else if (totalWeight <= 1) {
        shippingPrice = 47;
      }

      else {
        shippingPrice = 80;
      }

      setDelivery("2-3 Business Days");
    }

    // OTHER STATES
    else {

      if (totalWeight <= 1) {
        shippingPrice = 145;
      }

      else {
        shippingPrice = 220;
      }

      setDelivery("5-7 Business Days");
    }

    // GST 18%
    shippingPrice =
      shippingPrice +
      shippingPrice * 0.18;

    setShipping(
      Math.round(shippingPrice)
    );

  }, [form.state, totalWeight]);

  // FINAL TOTAL
  const finalTotal =
    baseSubtotal -
    discount +
    shipping;

  // CONTINUE
  const continueToPayment = () => {

    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {

      alert("Please fill all fields");

      return;
    }

    localStorage.setItem(
      "billing",
      JSON.stringify({
        form,
        shipping,
        delivery,
        finalTotal
      })
    );

    navigate("/payment");
  };

  return (

    <div className="billing-page">

      <div className="billing-container">

        {/* LEFT */}

        <div className="billing-left">

          <h2>Billing Details</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Full Address"
            value={form.address}
            onChange={handleChange}
          />

          <div className="row">

            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
            />

          </div>

          {/* STATE DROPDOWN */}

          <select
            name="state"
            value={form.state}
            onChange={handleChange}
          >

            <option value="">
              Select State
            </option>

            <option value="Maharashtra">
              Maharashtra
            </option>

            <option value="Delhi">
              Delhi
            </option>

            <option value="Karnataka">
              Karnataka
            </option>

            <option value="Tamil Nadu">
              Tamil Nadu
            </option>

            <option value="Gujarat">
              Gujarat
            </option>

            <option value="Uttar Pradesh">
              Uttar Pradesh
            </option>

             <option value="Rajasthan">
              Rajasthan
            </option>

            <option value="Madhya Pradesh">
              Madhya Pradesh
            </option>


          </select>

        </div>

        {/* RIGHT */}

        <div className="billing-right">

          <h2>Order Summary</h2>

          {cart.map((item, i) => (

            <div
              key={i}
              className="summary-item"
            >

              <span>
                {item.name} × {item.qty}
              </span>

              <span>
                ₹{item.price * item.qty}
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

          <div className="summary-line">

            <span>Delivery</span>

            <span>
              {delivery}
            </span>

          </div>

          <div className="summary-line total">

            <span>Total</span>

            <span>
              ₹{finalTotal}
            </span>

          </div>

          <button
            className="billing-btn"
            onClick={continueToPayment}
          >

            Continue to Payment

          </button>

        </div>

      </div>

    </div>

  );
}

export default Billing;