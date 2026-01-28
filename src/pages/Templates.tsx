import { Link } from 'react-router-dom';

export default function Templates() {
  return (
    <main className="container">
      <h1>Templates</h1>
      <p>Click a template to view the live demo.</p>

      <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        <Link className="btn btn-primary" to="/templates/barber-shop">
          Barber Shop Demo
        </Link>

        <Link className="btn btn-primary" to="/templates/personal-trainer">
          Personal Trainer Demo
        </Link>

        <Link className="btn btn-primary" to="/templates/business-operations">
          Business Operations Demo
        </Link>

        <Link className="btn btn-primary" to="/templates/band-dj">
          Band / DJ Demo
        </Link>

        <Link className="btn btn-primary" to="/templates/landscaping">
          Landscaping Demo
        </Link>

      </div>
    </main>
  );
}
