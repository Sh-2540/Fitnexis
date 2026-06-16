import React, { useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function TrackOrder() {

  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {

    try {

      setLoading(true);

      const snapshot = await getDocs(collection(db, "orders"));

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const filtered = data.filter(order =>
        String(order.customer?.phone || "") === String(phone)
      );

      setOrders(filtered);

    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
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
        {loading ? "Searching..." : "Track"}
      </button>

      {orders.map(order => (
        <div key={order.id}>

          <h3>
            {order.status === "Processing" && "🟡 Processing"}
            {order.status === "Packed" && "📦 Packed"}
            {order.status === "Shipped" && "🚚 Shipped"}
            {order.status === "Delivered" && "✅ Delivered"}
          </h3>

          <p>👤 {order.customer?.name}</p>
          <p>📞 {order.customer?.phone}</p>
          <p>💰 ₹{order.total}</p>

        </div>
      ))}

      {orders.length === 0 && !loading && (
        <p>No orders found</p>
      )}

    </div>
  );
}

export default TrackOrder;