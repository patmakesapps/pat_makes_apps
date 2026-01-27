import { Link } from "react-router-dom";

export default function Pricing() {
  return (
    <main className="container section">
      <div className="section-head">
        <h1 className="section-title">Pricing</h1>
        <p className="section-subtitle">
          Simple, transparent pricing. Pick a template-based site or go enterprise with payments + database.
        </p>
      </div>

      <div className="price-grid">
        <div className="price-card">
          <div className="price-top">
            <h2 className="price-title">Basic Site</h2>
            <div className="price-amount">$750</div>
          </div>
          <ul className="price-list">
            <li>Template-based custom website</li>
            <li>No backend / no database</li>
            <li>No payment integration</li>
            <li>Perfect for local businesses & portfolios</li>
          </ul>
          <div className="price-actions">
            <Link className="btn btn-primary" to="/contact">Start a request</Link>
            <Link className="btn btn-ghost" to="/templates">View demos</Link>
          </div>
        </div>

        <div className="price-card featured">
          <div className="price-top">
            <h2 className="price-title">Enterprise Site</h2>
            <div className="price-amount">$2500+</div>
          </div>
          <ul className="price-list">
            <li>Payment integration (Stripe, etc.)</li>
            <li>Database + backend features</li>
            <li>Custom workflows, dashboards, forms</li>
            <li>Best for platforms & serious ops</li>
          </ul>
          <div className="price-actions">
            <Link className="btn btn-primary" to="/contact">Talk requirements</Link>
            <Link className="btn btn-ghost" to="/templates">Start from a template</Link>
          </div>
        </div>

        <div className="price-card">
          <div className="price-top">
            <h2 className="price-title">Hosting</h2>
            <div className="price-amount">$50 / year</div>
          </div>
          <ul className="price-list">
            <li>Hosting for basic sites</li>
            <li>DNS setup assistance</li>
            <li>Basic SEO setup</li>
            <li>You purchase the domain</li>
          </ul>
          <div className="price-actions">
            <Link className="btn btn-primary" to="/contact">Request hosting</Link>
            <a className="btn btn-ghost" href="mailto:patmakesapps@gmail.com">Email Pat</a>
          </div>
        </div>
      </div>

      <div className="notice" style={{ marginTop: 16 }}>
        Want the fastest path? <Link className="link" to="/templates">Pick a demo</Link> →{" "}
        <Link className="link" to="/contact">submit the form</Link> and we’ll take it from there.
      </div>
    </main>
  );
}
