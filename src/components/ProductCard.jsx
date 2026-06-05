import { motion } from "framer-motion";

export default function ProductCard({ item, addToCart }) {

  // 🔥 discount logic
  const discountedPrice = Math.round(item.price * 0.8); // 20% off

  return (
    <motion.div
      className="card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img src={item.img} alt={item.name} />

      <div className="card-body">
        <h2>{item.name}</h2>

        {/* 💰 PRICE SECTION */}
        <div className="price-box">
          <span className="old-price">MRP ₹{item.price}</span>

          <span className="new-price">₹{discountedPrice}</span>

          <span className="discount-tag">20% OFF</span>
        </div>

        {/* 🛒 BUTTON */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => addToCart(item)}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}
