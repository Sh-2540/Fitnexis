import React, { useState } from "react";

function TrackOrder() {

  const [phone, setPhone] = useState("");

  const handleSearch = async () => {
  try {
    console.log("STARTED FIREBASE CALL");

    const snapshot = await getDocs(collection(db, "orders"));

    console.log("TOTAL DOCS:", snapshot.docs.length);

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log("DATA:", data);

    alert("Orders fetched successfully");

  } catch (error) {
    console.log("FIREBASE ERROR:", error);
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