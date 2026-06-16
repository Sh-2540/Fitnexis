import React, { useState } from "react";
import { db } from "../firebase";

import {
collection,
getDocs
} from "firebase/firestore";

function TrackOrder() {

const [phone, setPhone] =
useState("");

const [orders, setOrders] =
useState([]);

const [loading, setLoading] =
useState(false);

const [searched, setSearched] =
useState(false);

const searchOrders = async () => {

if (!phone.trim()) {

  alert(
    "Enter phone number"
  );

  return;
}

try {

  setLoading(true);
  setSearched(true);

  const snapshot =
    await getDocs(
      collection(db, "orders")
    );

  const data =
    snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(order =>
        String(
          order.customer?.phone || ""
        ) === String(phone)
      )
      .reverse();

  setOrders(data);

} catch (error) {

  console.error(error);

  alert(
    "Unable to fetch orders"
  );

} finally {

  setLoading(false);
}

};

const getStatusEmoji = (
status
) => {

switch (status) {

  case "Processing":
    return "🟡";

  case "Packed":
    return "📦";

  case "Shipped":
    return "🚚";

  case "Delivered":
    return "✅";

  default:
    return "⏳";
}

};

return (

<div className="track-page">

  <h1 className="track-title">
    Track Your Order
  </h1>

  <input
    className="track-input"
    type="text"
    placeholder="Enter Mobile Number"
    value={phone}
    onChange={(e) =>
      setPhone(
        e.target.value
      )
    }
  />

  <button
    className="track-btn"
    onClick={searchOrders}
  >

    {loading
      ? "Searching..."
      : "Track Order"}

  </button>

  {orders.length > 0 && (

    <h2
      style={{
        textAlign: "center"
      }}
    >
      Orders Found:
      {" "}
      {orders.length}
    </h2>

  )}

  {orders.map(order => (

    <div
      key={order.id}
      className="order-card"
    >

      <span
        className={`order-status status-${order.status?.toLowerCase()}`}
      >

        {getStatusEmoji(
          order.status
        )}

        {" "}

        {order.status}

      </span>

      <p>
        <strong>
          Customer:
        </strong>
        {" "}
        {order.customer?.name}
      </p>

      <p>
        <strong>
          Phone:
        </strong>
        {" "}
        {order.customer?.phone}
      </p>

      <p>
        <strong>
          Payment ID:
        </strong>
        {" "}
        {order.paymentId}
      </p>

      <p>
        <strong>
          Total:
        </strong>
        {" "}
        ₹{order.total}
      </p>

      <p>
        <strong>
          Delivery:
        </strong>
        {" "}
        {order.delivery}
      </p>

      <h4>
        Products
      </h4>

      {order.products?.map(
        (
          product,
          index
        ) => (

          <div
            key={index}
            className="order-product"
          >

            {product.name}
            {" × "}
            {product.qty}

          </div>

        )
      )}

    </div>

  ))}

  {searched &&
    !loading &&
    orders.length === 0 && (

      <p
        style={{
          textAlign: "center",
          marginTop: "30px"
        }}
      >
        No orders found
        for this number.
      </p>

  )}

</div>

);
}

export default TrackOrder;