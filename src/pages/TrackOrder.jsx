import React, { useState } from "react";
import { db } from "../firebase";

import {
  collection,
  getDocs,
} from "firebase/firestore";

function TrackOrder() {

  const [phone, setPhone] =
    useState("");

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const searchOrders = async () => {

    try {

      setLoading(true);

      const querySnapshot =
        await getDocs(
          collection(db, "orders")
        );

      const data =
        querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          .filter(order =>
            String(
              order.customer?.phone
            ) === String(phone)
          );

      setOrders(data);

    } catch (error) {

      console.error(
        "Track Order Error:",
        error
      );

      alert(
        "Failed to fetch orders"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      style={{
        padding: "100px 20px",
        minHeight: "100vh",
        background: "#000",
        color: "#fff"
      }}
    >

      <h1>
        Track Your Orders
      </h1>

      <p>
        Enter your mobile number
      </p>

      <input
        type="text"
        placeholder="Mobile Number"
        value={phone}
        onChange={(e) =>
          setPhone(
            e.target.value
          )
        }
        style={{
          padding: "12px",
          width: "300px",
          maxWidth: "100%",
          borderRadius: "8px",
          border: "none",
          marginTop: "10px"
        }}
      />

      <br />
      <br />

      <button
        onClick={searchOrders}
        style={{
          padding:
            "12px 24px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >

        {loading
          ? "Searching..."
          : "Track Orders"}

      </button>

      <br />
      <br />

      {orders.length > 0 && (

        <h2>
          Found {orders.length}
          {" "}
          Orders
        </h2>

      )}

      {orders.map(order => (

        <div
          key={order.id}
          style={{
            background: "#111",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "12px",
            border:
              "1px solid #333"
          }}
        >

          <h3>
            Status:
            {" "}
            {order.status}
          </h3>

          <p>
            Payment ID:
            {" "}
            {order.paymentId}
          </p>

          <p>
            Total:
            {" "}
            ₹{order.total}
          </p>

          <p>
            Delivery:
            {" "}
            {order.delivery}
          </p>

          <p>
            Customer:
            {" "}
            {order.customer?.name}
          </p>

          <h4>
            Products
          </h4>

          {order.products?.map(
            (
              product,
              index
            ) => (

              <p
                key={index}
              >

                {product.name}
                {" × "}
                {product.qty}

              </p>

            )
          )}

        </div>

      ))}

      {!loading &&
        phone &&
        orders.length === 0 && (

          <p>
            No orders found
            for this phone number.
          </p>

      )}

    </div>

  );
}

export default TrackOrder;