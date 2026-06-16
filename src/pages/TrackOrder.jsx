import React, { useState } from "react";
import { db } from "../firebase";

import {
  collection,
  getDocs
} from "firebase/firestore";

function TrackOrder() {

  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);

  const handleSearch = async () => {

    try {

      console.log("Searching...");

      const snapshot = await getDocs(
        collection(db, "orders")
      );

      const data = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(order =>
          String(order.customer?.phone || "") === String(phone)
        );

      setOrders(data);

      console.log("FOUND:", data);

    } catch (error) {
      console.log("ERROR:", error);
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: "100px", color: "white" }}>

      <h1>Track Order</h1>

      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter phone number"
      />

      <button onClick={handleSearch}>
        Track
      </button>

      {orders.map((order) => (
  <div
    key={order.id}
    style={{
      background: "#111",
      color: "#fff",
      padding: "20px",
      marginBottom: "20px",
      borderRadius: "12px",
      border: "1px solid #333"
    }}
  >

    {/* STATUS */}
    <h3>
      {order.status === "Processing" && "🟡 Processing"}
      {order.status === "Packed" && "📦 Packed"}
      {order.status === "Shipped" && "🚚 Shipped"}
      {order.status === "Delivered" && "✅ Delivered"}
      {!order.status && "⏳ Pending"}
    </h3>

    {/* CUSTOMER */}
    <p>👤 Customer: {order.customer}</p>

    {/* AMOUNT */}
    <p>💰 Amount: ₹{order.total}</p>

    {/* PAYMENT */}
    <p>💳 Payment ID: {order.paymentId}</p>

    {/* PRODUCTS */}
    <h4>🛍️ Products:</h4>

    {order.products?.map((product, index) => (
      <p key={index}>
        🧾 {product.name} × {product.qty}
      </p>
    ))}

  </div>
))}

      

    </div>
  );
}

export default TrackOrder;