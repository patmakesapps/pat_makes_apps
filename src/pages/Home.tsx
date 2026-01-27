import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section
        className="hero hero-with-bg hero-bleed"
        style={{ backgroundImage: "url(/hero_image.png)" }}
        aria-label="Futuristic gallery of website templates"
      >
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-card">
            <h1 className="hero-title center nowrap">
              Modern websites for your business.
            </h1>

            <p className="hero-subtitle nowrap center">
              Browse templates, click around live previews, and ship client-ready sites faster.
            </p>

            <div className="hero-actions center">
              <Link className="btn btn-primary" to="/templates">View Templates</Link>
              <Link className="btn btn-ghost" to="/pricing">Pricing</Link>
            </div>
          </div>
        </div>
        <div className="hero-fade" />
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">How it works</h2>
            <p className="section-subtitle">
              Pick a demo you like, then submit your info and assets. We’ll build a custom website based on that template.
              Pricing details live on the Pricing page.
            </p>
          </div>

          <div className="how-grid">
            <div className="how-card">
              <div className="how-step">1</div>
              <h3 className="how-title">View template demos</h3>
              <p className="how-text">
                Click around the live previews to see what your site can look like.
              </p>
              <Link className="btn btn-primary" to="/templates">Browse demos</Link>
            </div>

            <div className="how-card">
              <div className="how-step">2</div>
              <h3 className="how-title">Submit the request form</h3>
              <p className="how-text">
                Choose a template, pick a color scheme, upload photos, and paste your text (about, services, etc).
              </p>
              <Link className="btn btn-ghost" to="/contact">Open the form</Link>
            </div>

            <div className="how-card">
              <div className="how-step">3</div>
              <h3 className="how-title">We build + deliver</h3>
              <p className="how-text">
                We customize the template to match your brand. Payment integration (Stripe) is coming soon—placeholder for now.
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
    </>
  );
}
