import React from "react";

function Success() {

  const orderNumber =
    localStorage.getItem(
      "orderNumber"
    );

  return (

    <div
      style={{
        textAlign: "center",
        padding: "100px 20px"
      }}
    >

      <h1>
        🎉 Order Confirmed
      </h1>

      <h2>
        {orderNumber}
      </h2>

      <p>
        Status:
        Processing
      </p>

      <button
  onClick={() =>
    window.location.href =
      "/track-order"
  }
>
  Track Order
</button>

      <p>
        Thank you for shopping
        with Fitnexis.
      </p>

    </div>

  );
}

export default Success;