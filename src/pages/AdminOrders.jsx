import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs ,doc ,updateDoc } from "firebase/firestore";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  const updateStatus = async (id, newStatus) => {

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
  
      alert("Failed to update status");
    }
  };
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

          <h4>Products:</h4>

{order.products?.map((product, index) => (
  <p key={index}>
    {product.name} × {product.qty}
  </p>
))}

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

          <div>

  <p>Status:</p>

  <select
    value={
      order.status || "Processing"
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

      ))}

    </div>
  );
}

export default AdminOrders;