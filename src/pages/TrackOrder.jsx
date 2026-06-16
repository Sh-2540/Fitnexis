import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore"

function TrackOrder() {

  const [phone, setPhone] = useState("");
const handleSearch = async () => {
  try {
    console.log("🔥 Firebase call started");

    const snapshot = await getDocs(collection(db, "orders"));

    console.log("📦 Total orders:", snapshot.docs.length);

    snapshot.docs.forEach(doc => {
      console.log("ORDER:", doc.data());
    });

    alert("Firebase working");

  } catch (error) {
    console.log("❌ ERROR:", error);
    alert(error.message);
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