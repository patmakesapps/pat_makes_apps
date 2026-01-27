import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type FormState = {
  name: string;
  email: string;
  businessName: string;
  template: string;
  colorScheme: string;
  brandColors: string;
  siteText: string;
  notes: string;
  files: FileList | null;
};

export default function Contact() {
  const templateOptions = useMemo(
    () => [
      { value: "barber-shop", label: "Barber Shop" },
      { value: "personal-trainer", label: "Personal Trainer" },
      { value: "business-operations", label: "Business Operations" },
      { value: "band-dj", label: "Band / DJ" },
      { value: "custom", label: "Custom (we’ll discuss)" }
    ],
    []
  );

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    businessName: "",
    template: "barber-shop",
    colorScheme: "light",
    brandColors: "",
    siteText: "",
    notes: "",
    files: null
  });

  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Placeholder behavior for now (until you wire email/backend/Stripe).
    // Later: send FormData to an API endpoint.
    setSubmitted(true);

    // optional: scroll to top so user sees confirmation
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="container section">
      <div className="section-head">
        <h1 className="section-title">Request a website</h1>
        <p className="section-subtitle">
          Pick a template, choose a vibe, upload your photos, and paste the text you want on the site.
          If you have questions, email{" "}
          <a className="link" href="mailto:patmakesapps@gmail.com">patmakesapps@gmail.com</a>.
        </p>
      </div>

      {submitted && (
        <div className="notice">
          <strong>Request received (placeholder).</strong>
          <div className="muted" style={{ marginTop: 6 }}>
            Next step: we’ll wire this to an email/API + Stripe checkout.
            For now, this confirms the UI flow works.
          </div>
        </div>
      )}

      <form className="form" onSubmit={onSubmit}>
        <div className="form-grid">
          <div className="field">
            <label className="label" htmlFor="name">Name</label>
            <input
              id="name"
              className="input"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Pat"
              required
            />
          </div>

          <div className="field">
            <label className="label" htmlFor="email">Email</label>
            <input
              id="email"
              className="input"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@company.com"
              required
            />
          </div>

          <div className="field">
            <label className="label" htmlFor="businessName">Business name</label>
            <input
              id="businessName"
              className="input"
              value={form.businessName}
              onChange={(e) => update("businessName", e.target.value)}
              placeholder="York Hoist / Pat Makes Apps / etc"
            />
          </div>

          <div className="field">
            <label className="label" htmlFor="template">Template</label>
            <select
              id="template"
              className="input"
              value={form.template}
              onChange={(e) => update("template", e.target.value)}
            >
              {templateOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <div className="help">
              Want to preview?{" "}
              <Link className="link" to="/templates">View template demos</Link>
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="colorScheme">Color scheme</label>
            <select
              id="colorScheme"
              className="input"
              value={form.colorScheme}
              onChange={(e) => update("colorScheme", e.target.value)}
            >
              <option value="light">Light / Clean</option>
              <option value="dark">Dark / Premium</option>
              <option value="brand">Brand Colors (you specify)</option>
            </select>
            <div className="help">If you choose “Brand Colors”, add them below.</div>
          </div>

          <div className="field">
            <label className="label" htmlFor="brandColors">Brand colors (optional)</label>
            <input
              id="brandColors"
              className="input"
              value={form.brandColors}
              onChange={(e) => update("brandColors", e.target.value)}
              placeholder="e.g. #111827 + #22c55e, or “navy + gold”"
            />
          </div>

          <div className="field field-full">
            <label className="label" htmlFor="siteText">Website text (paste what you want on the site)</label>
            <textarea
              id="siteText"
              className="input textarea"
              value={form.siteText}
              onChange={(e) => update("siteText", e.target.value)}
              placeholder="About / services / hours / contact info / FAQs / anything you want on the site..."
              rows={8}
              required
            />
          </div>

          <div className="field field-full">
            <label className="label" htmlFor="files">Upload photos (optional)</label>
            <input
              id="files"
              className="input"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => update("files", e.target.files)}
            />
            <div className="help">
              Add your logo, team photos, product shots, etc.
            </div>
          </div>

          <div className="field field-full">
            <label className="label" htmlFor="notes">Anything else? (optional)</label>
            <textarea
              id="notes"
              className="input textarea"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Deadlines, inspiration links, competitor sites you like, pages you want, etc..."
              rows={5}
            />
          </div>
        </div>

        <div className="form-footer">
          <div className="stripe-placeholder">
            <div className="stripe-badge">Stripe (coming soon)</div>
            <div className="muted">
              Payment integration is a placeholder for now. We’ll wire Stripe when you’re ready.
            </div>
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" type="submit">
              Submit request
            </button>
            <Link className="btn btn-ghost" to="/pricing">View pricing</Link>
          </div>
        </div>
      </form>
    </main>
  );
}
