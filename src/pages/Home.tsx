import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero hero-creative" aria-label="Futuristic gallery of website templates">
        <div className="hero-creative__halo" aria-hidden="true" />
        <div className="hero-creative__halo hero-creative__halo--secondary" aria-hidden="true" />

        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="hero-eyebrow">Pat Makes Apps</p>
            <h1 className="hero-title">
              Modern websites that feel custom and launch fast.
            </h1>
            <p className="hero-lede">
              We pair curated templates with a human build process so your next site lands polished without a long production cycle.
            </p>

            <div className="hero-actions">
              <Link className="btn btn-primary" to="/templates">Explore templates</Link>
              <Link className="btn btn-ghost" to="/pricing">View pricing</Link>
            </div>

            <div className="hero-metrics">
              <div className="hero-metric">
                <span>120+</span>
                <small>portfolio-ready templates</small>
              </div>
              <div className="hero-metric">
                <span>2 days</span>
                <small>from request to review</small>
              </div>
              <div className="hero-metric">
                <span>99%</span>
                <small>client satisfaction rating</small>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual__wrap">
              <div className="hero-visual__image" />
              <div className="hero-visual__mask" />
              <div className="hero-visual__pulse" />
            </div>

            <span className="hero-visual__badge">Live builds reviewed manually</span>
            <span className="hero-visual__badge hero-visual__badge--secondary">
              Typography tuned for every device
            </span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section how-section" aria-label="How the workflow comes together">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">How it works</h2>
            <p className="section-subtitle">
              Pick a demo you like, submit your info, and we’ll build a custom website aligned with that look.
              Pricing details live on the Pricing page.
            </p>
          </div>

          <div className="how-grid">
            <div className="how-card">
              <div className="how-step">1</div>
              <h3 className="how-title">Live demos, no fluff</h3>
              <p className="how-text">
                Click through the live calls to feel the pacing, typographic tone, and spacing before you commit.
              </p>
              <Link className="btn btn-primary" to="/templates">Browse demos</Link>
            </div>

            <div className="how-card">
              <div className="how-step">2</div>
              <h3 className="how-title">Share materials</h3>
              <p className="how-text">
                Choose a template, pick a palette, upload photos, and paste your core messaging — we handle the rest.
              </p>
              <Link className="btn btn-ghost" to="/contact">Open the form</Link>
            </div>

            <div className="how-card">
              <div className="how-step">3</div>
              <h3 className="how-title">We build + deliver</h3>
              <p className="how-text">
                We tailor the layout to your brand, then wrap it with QA so you get a smooth launch-ready site. Payment wiring (Stripe) is rolling out soon.
              </p>
              <div className="how-links">
                <a className="link" href="mailto:patmakesapps@gmail.com">patmakesapps@gmail.com</a>
                <span className="muted">— questions welcome</span>
              </div>
            </div>
          </div>

          <div className="how-cta">
            <Link className="btn btn-primary" to="/contact">Start your request</Link>
            <Link className="btn btn-ghost" to="/pricing">See pricing</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
