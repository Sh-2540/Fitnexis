import React, { useState } from "react";
import { db } from "../firebase";

import {
collection,
getDocs
} from "firebase/firestore";

function TrackOrder() {

const [phone, setPhone] = useState("");
const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(false);
const [searched, setSearched] = useState(false);

const searchOrders = async () => {

if (!phone.trim()) {
  alert("Enter phone number");
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

<div>

  <h1>
    Track Order
  </h1>

  <input
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
    onClick={searchOrders}
  >

    {loading
      ? "Searching..."
      : "Track"}

  </button>

  {orders.length > 0 && (

    <h2>
      Orders Found:
      {" "}
      {orders.length}
    </h2>

  )}

  {orders.map(order => (

    <div key={order.id}>

      <h3>

        {getStatusEmoji(
          order.status
        )}

        {" "}

        {order.status}

      </h3>

      <p>
        Customer:
        {" "}
        {order.customer?.name}
      </p>

      <p>
        Phone:
        {" "}
        {order.customer?.phone}
      </p>

      <p>
        Payment ID:
        {" "}
        {order.paymentId}
      </p>

      <p>
        Total:
        ₹{order.total}
      </p>

      <p>
        Delivery:
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
          >

            {product.name}
            {" × "}
            {product.qty}

          </div>

        )
      )}

      <hr />

    </div>

  ))}

  {searched &&
    !loading &&
    orders.length === 0 && (

      <p>
        No orders found
        for this number.
      </p>

  )}

</div>

);
}

export default TrackOrder;