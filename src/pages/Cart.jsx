import { Link } from "react-router-dom";

export default function Cart() {

  return (

    <div className="cart-page">

      <h1>
        Your Cart
      </h1>

      <p>
        Your selected products
        will appear here.
      </p>

      <Link to="/checkout">

        <button className="primary-btn">
          Checkout
        </button>

      </Link>

    </div>

  );
}