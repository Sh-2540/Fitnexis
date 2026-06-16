import React, { useState } from "react";

function TrackOrder() {

  const [phone, setPhone] = useState("");

  const handleSearch = async () => {
    try {
  
      console.log("DB:", db);
  
      const snapshot = await getDocs(collection(db, "orders"));
  
      console.log("TOTAL DOCS:", snapshot.docs.length);
  
      snapshot.docs.forEach(d => {
        console.log("DOC:", d.data());
      });
  
    } catch (error) {
      console.log("ERROR:", error);
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