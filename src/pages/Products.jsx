import { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products";

export default function Products({ addToCart }) {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const getDiscountedPrice = (price) => {
    return Math.round(price * 0.8);
  };

  /* FILTER PRODUCTS */

  const filteredProducts = products.filter((product) => {

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All"
      ? true
      : product.name
          .toLowerCase()
          .includes(category.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (

    <div className="products">



<div className="products-header">

  <div className="products-title">

    <span className="mini-tag">
      PREMIUM COLLECTION
    </span>

    <h1>
      Explore Our
      <span> Supplements</span>
    </h1>

    <p>
      High-performance nutrition designed
      for strength, recovery and muscle growth.
    </p>

  </div>

  {/* SEARCH + FILTER */}

  <div className="premium-filter-bar">

    <div className="search-box">

      <input
        type="text"
        placeholder="Search supplements..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

    </div>

    <div className="select-box">

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >

        <option>All</option>
        <option>WHEY</option>
        <option>GAINER</option>
        <option>CREATINE</option>
        <option>PRE-WORKOUT</option>

      </select>

    </div>

  </div>

</div>
      {/* GRID */}

      <div className="products-grid">

        {filteredProducts.map((product) => {

          const price =
            product.variants[0].price;

          const discounted =
            getDiscountedPrice(price);

          return (

            <div
              className="product-card"
              key={product.id}
            >

              {/* CLICKABLE AREA */}

              <div
                onClick={() =>
                  navigate(`/product/${product.id}`)
                }

                style={{ cursor: "pointer" }}
              >

                <img
                  src={product.images[0]}
                  alt={product.name}
                />

                <div className="product-info">

                  <h3>{product.name}</h3>

                  <div className="price-box">

                    <span className="old-price">
                      ₹{price}
                    </span>

                    <span className="new-price">
                      ₹{discounted}
                    </span>

                    <span className="discount-tag">
                      20% OFF
                    </span>

                  </div>

                </div>

              </div>

              {/* BUTTON */}

              <button
                className="primary-btn"

                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: discounted,
                    image: product.images[0]
                  })
                }
              >

                Add To Cart

              </button>

            </div>

          );

        })}

      </div>

    </div>

  );
}