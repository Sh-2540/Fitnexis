import React, { useState } from "react";

function TrackOrder() {

  const [phone, setPhone] = useState("");

  const handleSearch = () => {
    console.log("Phone entered:", phone);
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