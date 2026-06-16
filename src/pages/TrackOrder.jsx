import React, { useState } from "react";

function TrackOrder() {

  const [phone, setPhone] = useState("");

  const handleSearch = async () => {
    try {
      console.log("Searching for:", phone);
  
      const snapshot = await getDocs(collection(db, "orders"));
  
      const data = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(order =>
          String(order.customer?.phone || "") === String(phone)
        );
  
      console.log("Matched Orders:", data);
  
      alert(`Found ${data.length} orders`);
  
    } catch (error) {
      console.log(error);
      alert("Error fetching orders");
    }
  };

  return (
    <div style={{ paddingTop: "150px", color: "white" }}>

      <h1>Track Order</h1>

      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
      />

      <button onClick={handleSearch}>
        Search
      </button>

    </div>
  );
}

export default TrackOrder;