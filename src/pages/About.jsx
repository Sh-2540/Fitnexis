import React from "react";


function About() {

  return (

    <div className="about-page">

      {/* HERO */}

      <section className="about-hero">

        <div className="about-overlay">

          <p className="about-tag">
            FITNEXIS STORY
          </p>

          <h1>

            BUILT FOR
            {" "}
            <span>ATHLETES</span>

          </h1>

          <p className="about-text">

            Fitnexis is more than a
            fitness brand.

            We are building a new
            generation of performance,
            discipline, and confidence.

          </p>

        </div>

      </section>

      {/* STORY */}

      <section className="about-section">

        <div className="about-content">

          <div className="about-left">

            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200"
              alt="Fitness"
            />

          </div>

          <div className="about-right">

            <p className="mini-title">
              OUR MISSION
            </p>

            <h2>

              ELEVATE YOUR
              {" "}
              <span>PERFORMANCE</span>

            </h2>

            <p>

              At Fitnexis, we believe
              fitness is not only about
              appearance.

              It is about becoming
              stronger mentally,
              physically, and emotionally.

            </p>

            <p>

              Every product we provide
              is designed to support
              your fitness journey with
              premium quality and
              modern performance.

            </p>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="about-features">

        <div className="feature-box">

          <h3>
            Premium Quality
          </h3>

          <p>

            Carefully selected products
            for serious athletes and
            fitness lovers.

          </p>

        </div>

        <div className="feature-box">

          <h3>
            Fast Delivery
          </h3>

          <p>

            Reliable shipping and
            secure packaging across
            India.

          </p>

        </div>

        <div className="feature-box">

          <h3>
            Trusted Brand
          </h3>

          <p>

            Built with passion,
            discipline, and long-term
            vision.

          </p>

        </div>

      </section>

    </div>
  );
}

export default About;