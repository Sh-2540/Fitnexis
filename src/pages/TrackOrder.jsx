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
  
      <button onClick={handleSearch}>
        Track
      </button>
  
      {Array.isArray(orders) && orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id}>
            <p>👤 {order.customer}</p>
            <p>💰 ₹{order.total}</p>
            <p>
              {order.status === "Shipped" && "🚚 Shipped"}
              {order.status === "Processing" && "🟡 Processing"}
              {order.status === "Packed" && "📦 Packed"}
              {order.status === "Delivered" && "✅ Delivered"}
            </p>
          </div>
        ))
      ) : (
        <p>No orders found</p>
      )}
  
    </div>
  );
}

export default TrackOrder;