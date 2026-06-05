import { Link } from "react-router-dom";

export default function Home() {

  return (

    <>

      {/* HERO SECTION */}
      <section className="hero">

  <div className="hero-slider">

    {/* SLIDE 1 */}
    <div
      className="hero-slide active"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600')"
      }}
    >
      <div className="hero-content">

        <p className="hero-tag">
          PREMIUM SPORTS NUTRITION
        </p>

        <h1>
          BUILD <span>STRENGTH</span>
        </h1>

        <p className="hero-description">
          Elite supplements for muscle growth,
          endurance and recovery.
        </p>

        <div className="hero-buttons">

          <Link to="/products">
            <button className="primary-btn">
              Shop Now
            </button>
          </Link>

        </div>

      </div>
    </div>

    {/* SLIDE 2 */}
    <div
      className="hero-slide"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.88)), url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1600')"
      }}
    >
      <div className="hero-content">

        <p className="hero-tag">
          AUTHENTIC SUPPLEMENTS
        </p>

        <h1>
          FUEL YOUR <span>PERFORMANCE</span>
        </h1>

        <p className="hero-description">
          Premium whey, creatine and recovery
          products trusted by athletes.
        </p>

      </div>
    </div>

    {/* SLIDE 3 */}
    <div
      className="hero-slide"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1600')"
      }}
    >
      <div className="hero-content">

        <p className="hero-tag">
          NEXT LEVEL FITNESS
        </p>

        <h1>
          TRAIN <span>HARDER</span>
        </h1>

        <p className="hero-description">
          Scientifically formulated supplements
          for serious fitness goals.
        </p>

      </div>
    </div>

  </div>

</section> 
      {/* BEST SELLERS */}

      <section className="best-sellers">

        <div className="best-header">

          <p className="best-subtitle">
            PREMIUM COLLECTION
          </p>

          <h2>
            OUR <span>BEST SELLERS</span>
          </h2>

          <p className="best-text">

            Trusted by athletes worldwide for
            performance, recovery and results.

          </p>

        </div>

        <div className="best-grid">

          {/* CARD 1 */}

          <div className="best-card">

            <div className="card-badge hot">
              HOT
            </div>

            <img
              src="/90.jpeg"
              alt="Ripped Whey"
            />

            <div className="card-overlay">

              <h3>RIPPED WHEY</h3>

              <p>
                Advanced whey isolate formula
                for lean muscle growth.
              </p>

              <Link to="/product/20">

                <button>
                  View Product
                </button>

              </Link>

            </div>

          </div>

          {/* CARD 2 */}

          <div className="best-card">

            <div className="card-badge bestseller">
              BEST SELLER
            </div>

            <img
              src="/94.jpeg"
              alt="Marine Collagen"
            />

            <div className="card-overlay">

              <h3>MARINE COLLAGEN</h3>

              <p>
                Premium collagen support
                for joints and recovery.
              </p>

              <Link to="/product/6">

                <button>
                  View Product
                </button>

              </Link>

            </div>

          </div>

          {/* CARD 3 */}

          <div className="best-card">

            <div className="card-badge new">
              NEW
            </div>

            <img
              src="/93.jpeg"
              alt="L-Carnitine"
            />

            <div className="card-overlay">

              <h3>L-CARNITINE</h3>

              <p>
                Powerful fat metabolism
                and endurance support.
              </p>

              <Link to="/product/19">

                <button>
                  View Product
                </button>

              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* WHY CHOOSE US */}

      <section className="why-section">

        <div className="why-header">

          <p className="best-subtitle">
            WHY FITNEXIS
          </p>

          <h2>
            BUILT FOR <span>CHAMPIONS</span>
          </h2>

        </div>

        <div className="why-grid">

          <div className="why-card">

            <h3>100% Authentic</h3>

            <p>
              Genuine products sourced
              from trusted brands only.
            </p>

          </div>

          <div className="why-card">

            <h3>Fast Delivery</h3>

            <p>
              Secure and lightning fast
              shipping across India.
            </p>

          </div>

          <div className="why-card">

            <h3>Premium Quality</h3>

            <p>
              Tested supplements crafted
              for maximum performance.
            </p>

          </div>

          <div className="why-card">

            <h3>24/7 Support</h3>

            <p>
              Dedicated customer support
              whenever you need help.
            </p>

          </div>

        </div>

      </section>

    </>

  );

}