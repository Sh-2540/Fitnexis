import React, { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import products from "../data/products";

import "./ProductDetails.css";
import { useEffect } from "react";
import { collection, getDocs,addDoc } from "firebase/firestore";
import { db } from "../firebase";


function ProductDetails({ addToCart }) {
  const navigate = useNavigate();

  const { id } = useParams();

  const product = products.find(
    (p) => p.id === Number(id)
  );
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5); 

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadReviews = async () => {
      const snap = await getDocs(
        collection(db, "reviews")
      );
  
      const firebaseReviews = snap.docs
        .map(doc => doc.data())
        .filter(
          r => r.productId === String(product.id)
        );
  
      setReviews(firebaseReviews);
    };
  
    loadReviews();
  }, [product.id]);

  if (!product) {

    return (

      <div className="product-page">

        <h1>Product Not Found</h1>

      </div>

    );

  }
  const submitReview = async () => {

    if (!reviewName || !reviewText) {
      alert("Please fill all fields");
      return;
    }
  
    try {
  
      await addDoc(
        collection(db, "reviews"),
        {
          productId: String(product.id),
          name: reviewName,
          review: reviewText,
          rating: reviewRating,
          createdAt: Date.now()
        }
      );
  
      alert("Review submitted successfully");
  
      setReviewName("");
      setReviewText("");
      setReviewRating(5);
  
      window.location.reload();
  
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
  };

  /* IMAGES */

  const images = product.images
    ? Array.isArray(product.images)
      ? product.images
      : [product.images]
    : [];

  const [mainImage, setMainImage] =
    useState(images[0]);

  /* FLAVOR */

  const [selectedFlavor, setSelectedFlavor] =
    useState(
      product.flavors?.[0] || ""
    );

  /* SIZE */

  const [selectedVariant, setSelectedVariant] =
    useState(
      product.variants?.[0]
    );

  /* QUANTITY */

  const [quantity, setQuantity] =
    useState(1);

  /* TABS */

  const [activeTab, setActiveTab] =
    useState("overview");
    const originalPrice = selectedVariant?.price || 0;

    const discountedPrice = Math.round(
      originalPrice * 0.8
    );  

  return (

    <div className="product-page">

      <div className="product-container">

        {/* LEFT SIDE */}

        <div className="product-left">

          {/* MAIN IMAGE */}

          <div className="main-image-box">

            <img
              src={`/${mainImage}`}
              alt={product.name}
            />

          </div>

          {/* THUMBNAILS */}

          <div className="thumbnail-row">

            {images.map((img, index) => (

              <img
                key={index}

                src={`/${img}`}

                alt="thumbnail"

                className={
                  mainImage === img
                    ? "thumb active"
                    : "thumb"
                }

                onClick={() =>
                  setMainImage(img)
                }
              />

            ))}

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="product-right">

          <span className="brand-name">
            {product.brand}
          </span>

          <h1 className="product-title">
            {product.name}
          </h1>

          <h2 className="product-price">

  <span
    style={{
      textDecoration: "line-through",
      color: "#888",
      marginRight: "10px"
    }}
  >
    ₹{originalPrice}
  </span>

  <span
    style={{
      color: "#00ff88",
      fontWeight: "700"
    }}
  >
    ₹{discountedPrice}
  </span>

  <span
    style={{
      color: "#ff4d4d",
      marginLeft: "10px",
      fontSize: "14px"
    }}
  >
    20% OFF
  </span>

</h2>

          <p className="product-description">

            {product.overview ||

            "Premium quality supplement designed for strength, recovery, endurance and muscle growth."}

          </p>

          {/* FLAVORS */}

          {product.flavors && (

            <div className="section">

              <h3>Select Flavor</h3>

              <div className="options">

                {product.flavors.map(
                  (flavor, index) => (

                    <button
                      key={index}

                      className={
                        selectedFlavor === flavor
                          ? "option-btn active"
                          : "option-btn"
                      }

                      onClick={() =>
                        setSelectedFlavor(flavor)
                      }
                    >
                      {flavor}
                    </button>

                  )
                )}

              </div>

            </div>

          )}

          {/* SIZE */}

          {product.variants && (

            <div className="section">

              <h3>Select Size</h3>

              <div className="options">

                {product.variants.map(
                  (variant, index) => (

                    <button
                      key={index}

                      className={
                        selectedVariant === variant
                          ? "option-btn active"
                          : "option-btn"
                      }

                      onClick={() =>
                        setSelectedVariant(
                          variant
                        )
                      }
                    >
                      {variant.size}
                    </button>

                  )
                )}

              </div>

            </div>

          )}

          {/* QUANTITY */}

          <div className="section">

            <h3>Quantity</h3>

            <div className="quantity-box">

              <button
                className="qty-btn"

                onClick={() =>
                  quantity > 1 &&
                  setQuantity(quantity - 1)
                }
              >
                -
              </button>

              <span className="qty-number">
                {quantity}
              </span>

              <button
                className="qty-btn"

                onClick={() =>
                  setQuantity(quantity + 1)
                }
              >
                +
              </button>

            </div>

          </div>

          {/* BUTTONS */}
          <div className="action-buttons">

  <button
    className="add-cart-btn"
    onClick={() =>
      addToCart({
        id: product.id,
        name: product.name,
        price: discountedPrice,
        image: `/${images[0]}`,
        qty: quantity,
        flavor: selectedFlavor,
        size: selectedVariant?.size
      })
    }
  >
    Add To Cart
  </button>

  <button
    className="buy-btn"
    onClick={() => {
      addToCart({
        id: product.id,
        name: product.name,
        price: discountedPrice,
        image: `/${images[0]}`,
        qty: quantity,
        flavor: selectedFlavor,
        size: selectedVariant?.size
      });

      navigate("/checkout");
    }}
  >
    Buy Now
  </button>

</div>
          <div className="product-tabs">

  <button
    className={
      activeTab === "overview"
        ? "tab-btn active"
        : "tab-btn"
    }
    onClick={() =>
      setActiveTab("overview")
    }
  >
    Overview
  </button>
  

  <button
    className={
      activeTab === "specs"
        ? "tab-btn active"
        : "tab-btn"
    }
    onClick={() =>
      setActiveTab("specs")
    }
  >
    Specifications
  </button>

  <button
    className={
      activeTab === "usage"
        ? "tab-btn active"
        : "tab-btn"
    }
    onClick={() =>
      setActiveTab("usage")
    }
  >
    How To Use
  </button>

  <button
    className={
      activeTab === "reviews"
        ? "tab-btn active"
        : "tab-btn"
    }
    onClick={() =>
      setActiveTab("reviews")
    }
  >
    Reviews
  </button>

</div>


         
          <div className="tab-content">


  {/* OVERVIEW TAB */}
  {/* HOW TO USE */}

{activeTab === "usage" && (

<>

  {product.usage && (

    <div className="details-section">

      <h3>Recommended Usage</h3>

      <ul className="spec-list">

        {Object.entries(
          product.usage
        ).map(([key, value]) => (

          <li key={key}>

            <span>{key}</span>

            <strong>{value}</strong>

          </li>

        ))}

      </ul>

    </div>

  )}

</>

)}

  {activeTab === "overview" && (

    <>

      {product.overview && (

        <div className="details-section">

          <h3>Product Overview</h3>

          <p>{product.overview}</p>

        </div>

      )}

      {product.highlights && (

        <div className="details-section">

          <h3>Key Highlights</h3>

          <ul className="benefits-list">

            {product.highlights.map(
              (item, i) => (

                <li key={i}>
                  {item}
                </li>

              )
            )}

          </ul>

        </div>

      )}

      {product.lifestyle && (

        <div className="details-section">

          <h3>Lifestyle Support</h3>

          <ul className="benefits-list">

            {product.lifestyle.map(
              (item, i) => (

                <li key={i}>
                  {item}
                </li>

              )
            )}

          </ul>

        </div>

      )}

    </>

  )}

  {/* SPECIFICATIONS TAB */}

  {activeTab === "specs" && (

    <>

      {product.specifications && (

        <div className="details-section">

          <h3>Specifications</h3>

          <ul className="spec-list">

            {Object.entries(
              product.specifications
            ).map(([key, value]) => (

              <li key={key}>

                <span>{key}</span>

                <strong>{value}</strong>

              </li>

            ))}

          </ul>

        </div>

      )}



      

      
    </>

  )}

  {/* REVIEWS TAB */}
  

{activeTab === "reviews" && (
  <>

<div className="review-form">

<h3>Write a Review</h3>

<input
  type="text"
  placeholder="Your Name"
  value={reviewName}
  onChange={(e) =>
    setReviewName(e.target.value)
  }
/>

<select
  value={reviewRating}
  onChange={(e) =>
    setReviewRating(Number(e.target.value))
  }
>
  <option value="5">⭐⭐⭐⭐⭐</option>
  <option value="4">⭐⭐⭐⭐</option>
  <option value="3">⭐⭐⭐</option>
  <option value="2">⭐⭐</option>
  <option value="1">⭐</option>
</select>

<textarea
  placeholder="Write your review..."
  value={reviewText}
  onChange={(e) =>
    setReviewText(e.target.value)
  }
/>

<button
  className="primary-btn"
  onClick={submitReview}
>
  Submit Review
</button>

</div>

    {reviews.length > 0 ? (
      <div className="reviews">
        {reviews.map((review, i) => (
          <div
            className="review-card"
            key={i}
          >
            <h4>{review.name}</h4>

            <p>
              {"⭐".repeat(review.rating)}
            </p>

            <span>
              {review.review}
            </span>
          </div>
        ))}
      </div>
    ) : (
      <p>No reviews yet.</p>
    )}
  </>
)}


</div>
{/* EXTRA INFO CARDS */}

<div className="extra-info-grid">

  {product.warnings && (

    <div className="info-card warning">

      <h3>Warnings</h3>

      <ul>

        {product.warnings.map(
          (warning, i) => (

            <li key={i}>
              {warning}
            </li>

          )
        )}

      </ul>

    </div>

  )}

  {product.disclaimer && (

    <div className="info-card">

      <h3>Disclaimer</h3>

      <p>{product.disclaimer}</p>

    </div>

  )}

  {product.shipping && (

    <div className="info-card">

      <h3>Shipping</h3>

      <p>{product.shipping}</p>

    </div>

  )}

</div>

        </div>

      </div>

    </div>

  );

}

export default ProductDetails;