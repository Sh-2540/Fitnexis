import React, { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

function TrackOrder() {

  const [paymentId, setPaymentId] =
    useState("");

  const [order, setOrder] =
    useState(null);

  const searchOrder = async () => {

    const q = query(
      collection(db, "orders"),
      where(
        "paymentId",
        "==",
        paymentId
      )
    );

    const snapshot =
      await getDocs(q);

    if (!snapshot.empty) {

      setOrder(
        snapshot.docs[0].data()
      );

    } else {

      alert(
        "Order not found"
      );
    }
  };

  return (

    <div>

      <h1>
        Track Order
      </h1>

      <input
        value={paymentId}
        onChange={(e)=>
          setPaymentId(
            e.target.value
          )
        }
        placeholder="Payment ID"
      />

      <button
        onClick={searchOrder}
      >
        Track
      </button>

      {order && (

        <div>

          <h2>
            Status:
            {order.status}
          </h2>

          <p>
            Total:
            ₹{order.total}
          </p>

        </div>

      )}

    </div>
  );
}

export default TrackOrder;