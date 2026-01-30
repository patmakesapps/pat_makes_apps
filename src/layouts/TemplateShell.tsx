import { Outlet, useLocation } from 'react-router-dom';
import TemplateTopbar from '../components/TemplateTopbar';

const TEMPLATE_TITLE_OVERRIDES: Record<string, string> = {
  food: 'Restaurant Template',
};

function prettifyTemplateName(pathname: string) {
  const slug = pathname.split('/').filter(Boolean)[1] || '';
  if (!slug) return '';
  if (TEMPLATE_TITLE_OVERRIDES[slug]) {
    return TEMPLATE_TITLE_OVERRIDES[slug];
  }

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
