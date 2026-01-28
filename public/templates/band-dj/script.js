// script.js (FULL FILE)
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

menuBtn?.addEventListener('click', () => {
  const isOpen = mobileNav?.classList.toggle('isOpen');
  menuBtn?.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('isOpen');
    menuBtn?.setAttribute('aria-expanded', 'false');
  });
});

// Highlight current nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a').forEach((link) => {
  const href = link.getAttribute('href');
  if (!href) return;
  const normalized = href.replace('./', '');
  if (normalized === currentPage || (currentPage === '' && normalized === 'index.html')) {
    link.classList.add('active');
  }
});

// Smooth anchors + force "Back to top" to always work
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;

    // Always handle #top explicitly (works even if layout/scroll container changes)
    if (href === '#top') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // update hash without a jump
      history.replaceState(null, '', '#top');
      return;
    }

    const el = document.querySelector(href);
    if (!el) return;

    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Gallery auto-loader (no button, no "no more photos")
const galleryGrid = document.getElementById('galleryGrid');

const BATCH_SIZE = 12; // load a fuller gallery upfront
let nextPicIndex = 1;
let missesInARow = 0;
const MAX_MISSES = 3;

function createPhotoCard(src, label) {
  const wrap = document.createElement('div');
  wrap.className = 'photoCard';

  const img = document.createElement('img');
  img.src = src;
  img.alt = label;
  img.loading = 'lazy';

   wrap.append(img);
  return { wrap, img };

}

async function loadGalleryBatch() {
  if (!galleryGrid) return;

  let added = 0;

  while (added < BATCH_SIZE && missesInARow < MAX_MISSES) {
    const label = `pic${nextPicIndex}.jpg`;
    const src = `./photos/${label}`;
    const { wrap, img } = createPhotoCard(src, label);
    galleryGrid.appendChild(wrap);

    const ok = await new Promise((resolve) => {
      img.addEventListener('load', () => resolve(true), { once: true });
      img.addEventListener('error', () => resolve(false), { once: true });
    });

    if (ok) {
      added += 1;
      missesInARow = 0;
      nextPicIndex += 1;
    } else {
      wrap.remove();
      missesInARow += 1;
      nextPicIndex += 1;
    }
  }
}

loadGalleryBatch();

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
