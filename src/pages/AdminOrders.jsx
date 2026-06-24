import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Navigate } from "react-router-dom";

import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  // TOTAL REVENUE
  const totalRevenue =
    orders.reduce(
      (sum, order) =>
        sum + Number(order.total || 0),
      0
    );

  // UPDATE STATUS
  const updateStatus = async (
    id,
    newStatus
  ) => {

    try {

      await updateDoc(
        doc(db, "orders", id),
        {
          status: newStatus
        }
      );

      setOrders(prev =>
        prev.map(order =>
          order.id === id
            ? {
                ...order,
                status: newStatus
              }
            : order
        )
      );

    } catch (error) {

      console.error(
        "Status Update Error:",
        error
      );

      alert(
        "Failed to update status"
      );
    }
  };
  const approveCancel = async (id) => {

    try {
  
      await updateDoc(
        doc(db, "orders", id),
        {
          status: "Cancelled",
          cancelStatus: "Approved"
        }
      );
  
      setOrders(prev =>
        prev.map(order =>
          order.id === id
            ? {
                ...order,
                status: "Cancelled",
                cancelStatus: "Approved"
              }
            : order
        )
      );
  
    } catch (error) {
  
      console.error(error);
  
    }
  };
  
  const rejectCancel = async (id) => {
  
    try {
  
      await updateDoc(
        doc(db, "orders", id),
        {
          cancelRequest: false,
          cancelStatus: "Rejected"
        }
      );
  
      setOrders(prev =>
        prev.map(order =>
          order.id === id
            ? {
                ...order,
                cancelRequest: false,
                cancelStatus: "Rejected"
              }
            : order
        )
      );
  
    } catch (error) {
  
      console.error(error);
  
    }
  };
  
  const approveReturn = async (id) => {
  
    try {
  
      await updateDoc(
        doc(db, "orders", id),
        {
          returnStatus: "Approved"
        }
      );
  
      setOrders(prev =>
        prev.map(order =>
          order.id === id
            ? {
                ...order,
                returnStatus: "Approved"
              }
            : order
        )
      );
  
    } catch (error) {
  
      console.error(error);
  
    }
  };
  
  const rejectReturn = async (id) => {
  
    try {
  
      await updateDoc(
        doc(db, "orders", id),
        {
          returnRequest: false,
          returnStatus: "Rejected"
        }
      );
  
      setOrders(prev =>
        prev.map(order =>
          order.id === id
            ? {
                ...order,
                returnRequest: false,
                returnStatus: "Rejected"
              }
            : order
        )
      );
  
    } catch (error) {
  
      console.error(error);
  
    }
  };

  // FETCH ORDERS
  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const querySnapshot =
          await getDocs(
            collection(db, "orders")
          );

        const data =
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

        console.log(data);

        setOrders(data);

      } catch (error) {

        console.error(
          "Fetch Orders Error:",
          error
        );
      }
    };

    fetchOrders();

  }, []);

  if (
    localStorage.getItem(
      "adminLoggedIn"
    ) !== "true"
  ) {
  
    return (
      <Navigate
        to="/admin-login"
      />
    );
  }

  return (

    <div
      className="admin-orders-page"
    >

      <h1>
        Admin Orders
      </h1>

      <h2>
        Total Orders:
        {" "}
        {
  orders.filter(
    order => order.status !== "Delivered"
  ).length
}
      </h2>

      <h2>
        Revenue:
        {" "}
        ₹{totalRevenue}
      </h2>

      <br />
      {orders.filter(
  order => order.status !== "Delivered"
).length === 0 ? (

  <p>No Orders Found</p>

) : (

  orders
    .filter(
      order => order.status !== "Delivered"
    )
    .map(order => (

      <div
        key={order.id}
        className="admin-order-card"
      >

            <h3>
              {order.customer?.name}
            </h3>

            <p>
              Phone:
              {" "}
              {order.customer?.phone}
            </p>

            <p>
              Address:
              {" "}
              {order.customer?.address}
            </p>

            <p>
              City:
              {" "}
              {order.customer?.city}
            </p>

            <p>
              State:
              {" "}
              {order.customer?.state}
            </p>

            <p>
              Pincode:
              {" "}
              {order.customer?.pincode}
            </p>

            <hr />

            <h4>
              Products
            </h4>

            {order.products?.map((p, index) => (
  <p key={index}>
    🧾 {p.name}
    {" | "}
    {p.size}
    {" | "}
    {p.flavor}
    {" × "}
    {p.qty}
  </p>
))}
            

            <hr />

            <p>
              Payment ID:
              {" "}
              {order.paymentId}
            </p>
            {order.cancelRequest && (

<div
  style={{
    background: "#2a2a2a",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "10px"
  }}
>

  <h4>
    ⚠ Cancellation Request
  </h4>

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

  <button
    onClick={() =>
      approveCancel(order.id)
    }
  >
    ✅ Approve
  </button>

  <button
    onClick={() =>
      rejectCancel(order.id)
    }
    style={{
      marginLeft: "10px"
    }}
  >
    ❌ Reject
  </button>

</div>

)}
{order.returnRequest && (

<div
  style={{
    background: "#2a2a2a",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "10px"
  }}
>

  <h4>
    🔄 Return Request
  </h4>

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

  <button
    onClick={() =>
      approveReturn(order.id)
    }
  >
    ✅ Approve
  </button>

  <button
    onClick={() =>
      rejectReturn(order.id)
    }
    style={{
      marginLeft: "10px"
    }}
  >
    ❌ Reject
  </button>

</div>

)}

            <p>
              Total:
              {" "}
              ₹{order.total}
            </p>

            <div>

              <p>
                Status:
              </p>

              <select
                value={
                  order.status ||
                  "Processing"
                }
                onChange={(e) =>
                  updateStatus(
                    order.id,
                    e.target.value
                  )
                }
              >

                <option value="Processing">
                  Processing
                </option>

                <option value="Packed">
                  Packed
                </option>

                <option value="Shipped">
                  Shipped
                </option>

                <option value="Delivered">
                  Delivered
                </option>

              </select>

            </div>

          </div>

        ))
      )}

    </div>
  );
}

export default AdminOrders;