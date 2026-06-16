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

// ============================
// SEARCH ORDERS
// ============================
const handleSearch = async () => {

try {

  setLoading(true);

  const snapshot =
    await getDocs(
      collection(db, "orders")
    );

  const data =
    snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

  const filtered =
    data.filter(order =>
      String(
        order.customer?.phone || ""
      ) === String(phone)
    );

  setOrders(filtered);

} catch (error) {

  console.log(error);
  alert(error.message);

} finally {

  setLoading(false);

}

};

// ============================
// CANCEL REQUEST
// ============================
const cancelOrder = async (
id,
status
) => {

if (
  status === "Shipped" ||
  status === "Delivered" ||
  status === "Cancelled"
) {

  alert(
    "This order cannot be cancelled."
  );

  return;
}

const reason = prompt(
  "Please enter cancellation reason:"
);

if (!reason) return;

try {

  await updateDoc(
    doc(db, "orders", id),
    {
      cancelRequest: true,
      cancelReason: reason,
      cancelStatus: "Pending"
    }
  );

  setOrders(prev =>
    prev.map(order =>
      order.id === id
        ? {
            ...order,
            cancelRequest: true,
            cancelReason: reason,
            cancelStatus: "Pending"
          }
        : order
    )
  );

  alert(
    "Cancellation request submitted."
  );

} catch (error) {

  console.log(error);

  alert(
    "Failed to submit request."
  );
}

};

// ============================
// RETURN REQUEST
// ============================
const requestReturn = async (
id
) => {

const reason = prompt(
  "Reason for return?"
);

if (!reason) return;

try {

  await updateDoc(
    doc(db, "orders", id),
    {
      returnRequest: true,
      returnReason: reason,
      returnStatus: "Pending"
    }
  );

  setOrders(prev =>
    prev.map(order =>
      order.id === id
        ? {
            ...order,
            returnRequest: true,
            returnReason: reason,
            returnStatus: "Pending"
          }
        : order
    )
  );

  alert(
    "Return request submitted."
  );

} catch (error) {

  console.log(error);

  alert(
    "Return request failed."
  );
}

};

// ============================
// STATUS EMOJIS
// ============================
const getStatus = status => {

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

<div
  style={{
    padding: "100px 20px",
    background: "#000",
    color: "#fff",
    minHeight: "100vh"
  }}
>

  <h1>
    📦 Track Your Orders
  </h1>

  <input
    value={phone}
    onChange={(e) =>
      setPhone(
        e.target.value
      )
    }
    placeholder="Enter Phone Number"
    style={{
      padding: "10px",
      marginRight: "10px"
    }}
  />

  <button
    onClick={handleSearch}
  >
    {loading
      ? "Searching..."
      : "Track"}
  </button>

  <div>

    {orders.map(order => (

      <div
        key={order.id}
        style={{
          border:
            "1px solid #444",
          padding: "15px",
          marginTop: "20px",
          borderRadius: "10px",
          background: "#111"
        }}
      >

        <h3>
          {getStatus(
            order.status
          )}
        </h3>

        <p>
          👤 {order.customer?.name}
        </p>

        <p>
          📞 {order.customer?.phone}
        </p>

        <p>
          💰 ₹{order.total}
        </p>

        <p>
          💳 {order.paymentId}
        </p>

        {order.cancelRequest && (

          <div>

            <p>
              ⚠ Cancellation Requested
            </p>

            <p>
              Reason:
              {" "}
              {order.cancelReason}
            </p>

            <p>
              Status:
              {" "}
              {order.cancelStatus}
            </p>

          </div>

        )}

        {order.returnRequest && (

          <div>

            <p>
              🔄 Return Requested
            </p>

            <p>
              Reason:
              {" "}
              {order.returnReason}
            </p>

            <p>
              Status:
              {" "}
              {order.returnStatus}
            </p>

          </div>

        )}

        <h4>
          🛍️ Products
        </h4>

        {order.products?.map(
          (p, index) => (

            <p key={index}>
              🧾 {p.name}
              {" × "}
              {p.qty}
            </p>

          )
        )}

        {!order.cancelRequest &&
          order.status !==
            "Shipped" &&
          order.status !==
            "Delivered" &&
          order.status !==
            "Cancelled" && (

          <button
            onClick={() =>
              cancelOrder(
                order.id,
                order.status
              )
            }
            style={{
              marginTop: "10px",
              background: "red",
              color: "white",
              padding: "8px",
              border: "none",
              cursor: "pointer"
            }}
          >
            ❌ Request Cancellation
          </button>

        )}

        {order.status ===
          "Delivered" &&
          !order.returnRequest && (

          <button
            onClick={() =>
              requestReturn(
                order.id
              )
            }
            style={{
              marginTop: "10px",
              marginLeft: "10px",
              background: "orange",
              color: "white",
              padding: "8px",
              border: "none",
              cursor: "pointer"
            }}
          >
            🔄 Request Return
          </button>

        )}

      </div>

    ))}

    {!loading &&
      phone &&
      orders.length === 0 && (

      <p>
        No orders found
      </p>

    )}

  </div>

</div>

);
}

export default TrackOrder;