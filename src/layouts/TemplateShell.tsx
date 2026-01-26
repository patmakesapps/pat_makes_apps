import { Outlet, useLocation } from 'react-router-dom';
import TemplateTopbar from '../components/TemplateTopbar';

function prettifyTemplateName(pathname: string) {
  // "/templates/barber-shop" -> "Barber Shop"
  const slug = pathname.split('/').filter(Boolean)[1] || '';
  return slug
    .split('-')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function TemplateShell() {
  const { pathname } = useLocation();
  const title = prettifyTemplateName(pathname);

  return (
    <div className="template-shell">
      <TemplateTopbar title={title || 'Template'} />
      <Outlet />
    </div>
  );
}
