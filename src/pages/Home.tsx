import { Link } from "react-router-dom";

export default function Home() {
  return (
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
  );
}
