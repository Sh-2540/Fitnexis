import React, { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";

function TrackOrder() {

  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // =============================
  // SEARCH ORDERS
  // =============================
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

      console.log("ERROR:", error);
      alert(error.message);

    } finally {
      setLoading(false);
    }
  };

  // =============================
  // CANCEL ORDER
  // =============================
  const cancelOrder = async (id, status) => {

    if (status === "Shipped" || status === "Delivered") {
      alert("Cannot cancel after shipping");
      return;
    }

    try {

      await updateDoc(doc(db, "orders", id), {
        status: "Cancelled"
      });

      setOrders(prev =>
        prev.map(order =>
          order.id === id
            ? { ...order, status: "Cancelled" }
            : order
        )
      );

    } catch (error) {
      console.log(error);
      alert("Cancel failed");
    }
  };

  // =============================
  // STATUS EMOJI
  // =============================
  const getStatus = (status) => {

    switch (status) {

      case "Processing":
        return "🟡 Processing";

      case "Packed":
        return "📦 Packed";

      case "Shipped":
        return "🚚 Shipped";

      case "Delivered":
        return "✅ Delivered";

      case "Cancelled":
        return "❌ Cancelled";

      default:
        return "⏳ Pending";
    }
  };

  return (

    <div style={{ padding: "100px", color: "white", background: "#000", minHeight: "100vh" }}>

      <h1>📦 Track Your Orders</h1>

      {/* INPUT */}
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter Phone Number"
        style={{ padding: "10px", marginRight: "10px" }}
      />

      {/* BUTTON */}
      <button onClick={handleSearch}>
        {loading ? "Searching..." : "Track"}
      </button>

      {/* ORDERS */}
      <div>

        {orders.map(order => (

          <div
            key={order.id}
            style={{
              border: "1px solid #444",
              padding: "15px",
              marginTop: "20px",
              borderRadius: "10px",
              background: "#111"
            }}
          >

            {/* STATUS */}
            <h3>{getStatus(order.status)}</h3>

            {/* CUSTOMER */}
            <p>👤 {order.customer?.name}</p>

            {/* PHONE */}
            <p>📞 {order.customer?.phone}</p>

            {/* TOTAL */}
            <p>💰 ₹{order.total}</p>

            {/* PAYMENT */}
            <p>💳 {order.paymentId}</p>

            {/* PRODUCTS */}
            <h4>🛍️ Products</h4>

            {order.products?.map((p, index) => (
              <p key={index}>
                🧾 {p.name} × {p.qty}
              </p>
            ))}

            {/* CANCEL BUTTON */}
            {order.status !== "Shipped" &&
              order.status !== "Delivered" &&
              order.status !== "Cancelled" && (

                <button
                  onClick={() => cancelOrder(order.id, order.status)}
                  style={{
                    marginTop: "10px",
                    background: "red",
                    color: "white",
                    padding: "8px",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  ❌ Cancel Order
                </button>

            )}

          </div>

        ))}

        {/* NO ORDERS */}
        {!loading && phone && orders.length === 0 && (
          <p>No orders found</p>
        )}

      </div>

    </div>
  );
}

export default TrackOrder;