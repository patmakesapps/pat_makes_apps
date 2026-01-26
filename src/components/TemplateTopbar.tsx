import { useNavigate } from 'react-router-dom';

type TemplateTopbarProps = {
  title?: string;
};

export default function TemplateTopbar({ title = 'Back to Templates' }: TemplateTopbarProps) {
  const navigate = useNavigate();

  return (
    <header className="template-topbar">
      <button
        type="button"
        className="template-back"
        onClick={() => navigate('/templates')}
        aria-label="Back to Templates"
        title="Back to Templates"
      >
        ←
      </button>

      <div className="template-topbar-title">{title}</div>
    </header>
  );
}
