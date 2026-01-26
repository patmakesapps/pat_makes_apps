import { NavLink, Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Templates from './pages/Templates';
import Pricing from './pages/Pricing';
import BarberShopDemo from './pages/BarberShopDemo';
import PersonalTrainerDemo from './pages/PersonalTrainerDemo';
import BusinessOperationsDemo from './pages/BusinessOperationsDemo';
import TemplateShell from './layouts/TemplateShell';

export default function App() {
  const { pathname } = useLocation();
  const isTemplateDemo =
    pathname.startsWith('/templates/') && pathname !== '/templates';

  return (
    <div className="app">
      {!isTemplateDemo && (
        <header className="topbar">
          <div className="topbar-inner container">
            <div className="brand">
              <a
                className="brand-mark"
                href="https://instagram.com/pat_makes_apps"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <img className="brand-mark-img" src="/instagram.png" alt="" />
              </a>

              <span className="brand-name">@pat_makes_apps</span>
            </div>

            <nav className="nav">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/templates"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Templates
              </NavLink>

              <NavLink
                to="/pricing"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Pricing
              </NavLink>
            </nav>
          </div>
        </header>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />

        {/* All template demos live under this shell */}
        <Route path="/templates" element={<TemplateShell />}>
          <Route path="barber-shop" element={<BarberShopDemo />} />
          <Route path="personal-trainer" element={<PersonalTrainerDemo />} />
          <Route path="business-operations" element={<BusinessOperationsDemo />} />
        </Route>

        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </div>
  );
}
