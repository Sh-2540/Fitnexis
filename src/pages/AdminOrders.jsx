import React, { useEffect, useState } from "react";
import { db } from "../firebase";

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

  return (

    <div
      style={{
        padding: "100px 30px",
        color: "white",
        background: "#000",
        minHeight: "100vh"
      }}
    >

      <h1>
        Admin Orders
      </h1>

      <h2>
        Total Orders:
        {" "}
        {orders.length}
      </h2>

      <h2>
        Revenue:
        {" "}
        ₹{totalRevenue}
      </h2>

      <br />

      {orders.length === 0 ? (

        <p>
          No Orders Found
        </p>

      ) : (

        orders.map(order => (

          <div
            key={order.id}
            style={{
              background: "#111",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "12px",
              border:
                "1px solid #333"
            }}
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

            {order.products?.map(
              (product, index) => (

                <p key={index}>

                  {product.name}
                  {" × "}
                  {product.qty}

                </p>

              )
            )}

            <hr />

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