import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {

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

    };

    fetchOrders();

  }, []);

  return (

    <div style={{
      padding: "100px 30px",
      color: "white"
    }}>

      <h1>Admin Orders</h1>

      {orders.map(order => (

        <div
          key={order.id}
          style={{
            background: "#111",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px"
          }}
        >

          <h3>
            {order.customer?.name}
          </h3>

          <p>
            Phone:
            {order.customer?.phone}
          </p>

          <p>
            Payment:
            {order.paymentId}
          </p>

          <p>
            Total:
            ₹{order.total}
          </p>

          <p>
            Status:
            {order.status}
          </p>

        </div>

      ))}

    </div>
  );
}

export default AdminOrders;