import React from "react";

function About() {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero">

        <div className="about-hero-overlay"></div>

        <div className="about-hero-content">

          <p className="about-mini">
            PERFORMANCE • DISCIPLINE • POWER
          </p>

          <h1>
            BUILT FOR THE
            <span> NEXT GENERATION </span>
            OF ATHLETES
          </h1>

          <p className="about-description">
            Fitnexis creates premium fitness experiences for people
            who demand strength, confidence, and performance in every
            part of life.
          </p>

          <div className="about-buttons">
            <button className="primary-btn">
              Explore Products
            </button>

            <button className="secondary-btn">
              Our Story
            </button>
          </div>

        </div>

      </section>

      {/* BRAND STORY */}
      <section className="about-story">

        <div className="about-story-left">

          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1400"
            alt="Fitness"
          />

        </div>

        <div className="about-story-right">

          <p className="section-tag">
            OUR MISSION
          </p>

          <h2>
            ELEVATING
            <span> HUMAN PERFORMANCE </span>
          </h2>

          <p>
            Fitnexis was created with one vision:
            helping people unlock their strongest version.
          </p>

          <p>
            We combine premium fitness products,
            modern design, and athlete-level quality
            to deliver a brand experience that inspires
            discipline and confidence every single day.
          </p>

          <div className="about-stats">

            <div className="stat-box">
              <h3>50K+</h3>
              <p>Customers</p>
            </div>

            <div className="stat-box">
              <h3>120+</h3>
              <p>Products</p>
            </div>

            <div className="stat-box">
              <h3>4.9★</h3>
              <p>Ratings</p>
            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="about-features">

        <div className="feature-card">

          <div className="feature-icon">⚡</div>

          <h3>Premium Quality</h3>

          <p>
            Every product is carefully selected
            for durability, performance, and style.
          </p>

        </div>

        <div className="feature-card">

          <div className="feature-icon">🚚</div>

          <h3>Fast Delivery</h3>

          <p>
            Secure and reliable shipping
            across India with smooth tracking.
          </p>

        </div>

        <div className="feature-card">

          <div className="feature-icon">🔥</div>

          <h3>Built For Athletes</h3>

          <p>
            Designed for gym lovers,
            athletes, and high performers.
          </p>

        </div>

      </section>

      {/* FINAL SECTION */}
      <section className="about-bottom">

        <div className="about-bottom-content">

          <h2>
            YOUR FITNESS
            <span> JOURNEY </span>
            STARTS HERE
          </h2>

          <p>
            Join thousands of athletes building strength,
            confidence, and discipline with Fitnexis.
          </p>

          <button className="primary-btn">
            Start Shopping
          </button>

        </div>

      </section>

    </div>
  );
}

export default About;