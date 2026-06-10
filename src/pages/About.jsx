import React from "react";

function About() {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <section
        className="about-hero"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.88)), url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1400')",
        }}
      >
        <div className="about-hero-content">

          <p className="about-mini-tag">
            FITNEXIS PERFORMANCE
          </p>

          <h1>
            BUILT FOR THE
            <span> MODERN ATHLETE</span>
          </h1>

          <p className="about-hero-text">
            Fitnexis was created for people who believe fitness is not
            temporary motivation — it is a lifestyle built through
            consistency, discipline, and self-respect.
          </p>

          <p className="about-hero-text">
            Every athlete has a different journey, but the mindset remains
            the same: improve every single day. Our vision is to create a
            premium fitness experience that inspires confidence, ambition,
            and performance.
          </p>

        </div>
      </section>

      {/* STORY SECTION */}
      <section className="about-section">

        <div className="about-grid">

          {/* LEFT IMAGE */}
          <div className="about-image-box">

            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1400"
              alt="Gym Training"
            />

          </div>

          {/* RIGHT CONTENT */}
          <div className="about-content">

            <p className="section-tag">
              OUR STORY
            </p>

            <h2>
              MORE THAN A
              <span> FITNESS BRAND</span>
            </h2>

            <p>
              Fitnexis was built with a simple vision — to combine premium
              fitness culture with modern lifestyle aesthetics.
            </p>

            <p>
              In today’s world, fitness is not only about lifting weights
              or completing workouts. It is about building mental strength,
              confidence, focus, and long-term discipline.
            </p>

            <p>
              We believe athletes deserve products and experiences that
              match their dedication. From beginners entering the gym for
              the first time to experienced athletes pushing their limits,
              Fitnexis is designed to support every stage of the journey.
            </p>

            <p>
              Our mission is to create a community that values consistency,
              growth, and self-improvement over shortcuts and temporary
              motivation.
            </p>

          </div>

        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="philosophy-section">

        <div className="philosophy-container">

          <div className="philosophy-text">

            <p className="section-tag">
              OUR PHILOSOPHY
            </p>

            <h2>
              DISCIPLINE CREATES
              <span> RESULTS</span>
            </h2>

            <p>
              Real transformation is not built overnight. It is built
              through thousands of small decisions repeated every day.
            </p>

            <p>
              The early mornings, the difficult workouts, the sacrifice,
              the consistency — these moments shape not only the body,
              but the mindset behind it.
            </p>

            <p>
              Fitnexis represents people who choose progress over excuses,
              effort over comfort, and long-term growth over temporary
              satisfaction.
            </p>

          </div>

          <div className="philosophy-image">

            <img
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1400"
              alt="Athlete Training"
            />

          </div>

        </div>

      </section>

      {/* VALUES */}
      <section className="about-values">

        <div className="value-card">

          <h3>
            Premium Standards
          </h3>

          <p>
            Every detail matters. We focus on quality, design,
            durability, and performance-driven experiences.
          </p>

        </div>

        <div className="value-card">

          <h3>
            Athlete Mindset
          </h3>

          <p>
            We support individuals who want to improve physically,
            mentally, and emotionally through discipline.
          </p>

        </div>

        <div className="value-card">

          <h3>
            Modern Performance
          </h3>

          <p>
            Fitnexis combines fitness culture with modern aesthetics
            to create a clean and premium identity.
          </p>

        </div>

      </section>

    </div>
  );
}

export default About;