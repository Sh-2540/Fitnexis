export default function Shop(){

  return(

    <div className="shop-page">

      {/* HERO */}
      {/* TOP BANNER */}

<section className="shop-banner top-banner">

<div className="banner-content">

  <p>LIMITED EDITION</p>

  <h2>
    LEVEL UP YOUR
    FITNESS JOURNEY
  </h2>

  <button className="primary-btn">
    Explore Products
  </button>

</div>

</section>
      

      {/* CATEGORY SECTION */}

      <section className="category-section">

        <div className="section-heading">

          <p>EXPLORE COLLECTIONS</p>

          <h2>
            Shop By Goal
          </h2>

        </div>

        <div className="category-grid">

          <div className="category-card">
            <img src="/2.jpeg" alt="" />

            <div className="category-overlay">
              <h3>WHEY PROTEIN</h3>
            </div>
          </div>

          <div className="category-card">
            <img src="/92.jpeg" alt="" />

            <div className="category-overlay">
              <h3>MASS GAINERS</h3>
            </div>
          </div>

          <div className="category-card">
            <img src="/5.jpeg" alt="" />

            <div className="category-overlay">
              <h3>PRE WORKOUT</h3>
            </div>
          </div>

          <div className="category-card">
            <img src="/10.jpeg" alt="" />

            <div className="category-overlay">
              <h3>CREATINE</h3>
            </div>
          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="stats-section">

        <div className="stat-box">
          <h2>10K+</h2>
          <p>Happy Customers</p>
        </div>

        <div className="stat-box">
          <h2>100%</h2>
          <p>Authentic Products</p>
        </div>

        <div className="stat-box">
          <h2>24/7</h2>
          <p>Customer Support</p>
        </div>

        <div className="stat-box">
          <h2>50+</h2>
          <p>Premium Supplements</p>
        </div>

      </section>

    </div>

  );

}
