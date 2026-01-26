// Mobile nav toggle
(() => {
  const toggleBtn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#nav');

  if (!toggleBtn || !nav) return;

  const setOpen = open => {
    nav.classList.toggle('open', open);
    toggleBtn.setAttribute('aria-expanded', String(open));
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = nav.classList.contains('open');
    setOpen(!isOpen);
  });

  nav.addEventListener('click', event => {
    const target = event.target;
    if (target && target.tagName === 'A' && nav.classList.contains('open')) {
      setOpen(false);
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setOpen(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) setOpen(false);
  });
})();

// Footer year
(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
