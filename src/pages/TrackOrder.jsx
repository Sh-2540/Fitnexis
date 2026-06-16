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
        <div key={order.id}>
          <h3>{order.status}</h3>
          <p>{order.customer?.name}</p>
          <p>{order.total}</p>
        </div>
      ))}

    </div>
  );
}

export default TrackOrder;