import "../App.css";
import logo from "../assets/trustscan.png";

function Home() {

  return (

    <div className="home-page">

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo">
          <img
            src={logo}
            alt="TrustScan Logo"
            className="logo-img"
           /> TrustScan
        </div>

        <div className="nav-links">

          <a href="/">Home</a>

          <a href="#features">Features</a>

          <a href="#about">About</a>

          <a href="#contact">Contact</a>

          <button
            className="nav-btn"
            onClick={() =>
              window.location.href = "/login"
            }
          >
            Login
          </button>

        </div>

      </nav>

      {/* HERO SECTION */}

      <section className="hero">

        <div className="hero-content">
          <p className="mini-title">
            Safer browsing starts here.
          </p>
          <h1>
            Built for trust in a digital world.
          </h1>

          <p className="hero-subtitle">
              Detect phishing links, fake giveaways,
              suspicious messages, malicious websites,
              scam emails, impersonation attacks instantly with intelligent real-time protection
              built for modern internet users.
          </p>

          <div className="hero-buttons">

            <button
                onClick={() =>
                window.location.href =
                "/signup"
                }
            >
                Get Started
            </button>

            <button
                className="secondary-btn"
                onClick={() =>
                window.location.href =
                "/login"
                }
            >
                Open Dashboard
            </button>
          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section
        className="features"
        id="features"
      >

        <h2>
          Why TrustScan?
        </h2>

        <div className="feature-grid">

          <div className="feature-card">

            <h3>🚨 Scam Detection</h3>

            <p>
              Analyze suspicious messages
              instantly using AI.
            </p>

          </div>

          <div className="feature-card">

            <h3>🔗 URL Scanner</h3>

            <p>
              Detect dangerous phishing
              websites before opening them.
            </p>

          </div>

          <div className="feature-card">

            <h3>🤖 Browser Extension</h3>

            <p>
              Real-time protection directly
              inside your browser.
            </p>

          </div>

          <div className="feature-card">

            <h3>⚡ Fast AI Analysis</h3>

            <p>
              Machine learning powered scam
              classification system.
            </p>

          </div>

        </div>

      </section>

      {/* ABOUT */}

      <section
        className="about-section"
        id="about"
      >

        <div className="about-card">

          <h2>
            About TrustScan
          </h2>

          <p>

            TrustScan is an AI cybersecurity
            platform focused on helping users
            identify scams, phishing attacks,
            fraudulent messages and fake websites.

          </p>

        </div>

      </section>

      {/* CONTACT */}

      <section
        className="contact-section"
        id="contact"
      >

        <h2>Contact</h2>

        <p>
          Email: trustscan@email.com
        </p>

      </section>

    </div>

  );

}

export default Home;