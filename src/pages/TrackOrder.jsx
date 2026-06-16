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
    <div style={{ padding: "100px", background: "white", color: "black" }}>
      <h1>TRACK ORDER TEST</h1>
    </div>
  );
}

export default TrackOrder;