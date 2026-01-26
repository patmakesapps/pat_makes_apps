// ===== Mobile nav =====
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn?.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("isOpen");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

mobileNav?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    mobileNav.classList.remove("isOpen");
    menuBtn?.setAttribute("aria-expanded", "false");
  });
});

// ===== Footer year =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// ===== Gallery loader =====
// Looks for: /photos/pic1.png, pic2.png, pic3.png, ...
const galleryGrid = document.getElementById("galleryGrid");
const loadMoreBtn = document.getElementById("loadMoreBtn");

// Change these if you want more/less at once
const BATCH_SIZE = 6;
let nextPicIndex = 1;

// If an image doesn't exist, we stop after a couple misses to avoid infinite attempts.
let missesInARow = 0;
const MAX_MISSES = 3;

function createPhotoCard(src, label) {
  const wrap = document.createElement("div");
  wrap.className = "photoCard";

  const img = document.createElement("img");
  img.src = src;
  img.alt = label;
  img.loading = "lazy";

  const cap = document.createElement("div");
  cap.className = "caption";
  cap.textContent = label;

  wrap.appendChild(img);
  wrap.appendChild(cap);

  return { wrap, img };
}

async function loadGalleryBatch() {
  if (!galleryGrid) return;

  loadMoreBtn?.setAttribute("disabled", "true");
  loadMoreBtn && (loadMoreBtn.textContent = "Loading...");

  let added = 0;

  while (added < BATCH_SIZE && missesInARow < MAX_MISSES) {
    const label = `pic${nextPicIndex}.png`;
    const src = `./photos/${label}`;

    const { wrap, img } = createPhotoCard(src, label);
    galleryGrid.appendChild(wrap);

    // If the file doesn't exist, the image will error.
    const ok = await new Promise((resolve) => {
      img.addEventListener("load", () => resolve(true), { once: true });
      img.addEventListener("error", () => resolve(false), { once: true });
    });

    if (ok) {
      added += 1;
      missesInARow = 0;
      nextPicIndex += 1;
    } else {
      // Remove placeholder card if missing
      wrap.remove();
      missesInARow += 1;
      nextPicIndex += 1;
    }
  }

  // Button state
  if (missesInARow >= MAX_MISSES) {
    loadMoreBtn && (loadMoreBtn.textContent = "No more photos");
    loadMoreBtn?.setAttribute("disabled", "true");
  } else {
    loadMoreBtn && (loadMoreBtn.textContent = "Load more");
    loadMoreBtn?.removeAttribute("disabled");
  }
}

loadMoreBtn?.addEventListener("click", loadGalleryBatch);

// Load initial images
loadGalleryBatch();

// ===== Contact form (demo-only) =====
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  // This is a template: you can wire it to Formspree, Netlify forms, your API, etc.
  if (formStatus) {
    formStatus.textContent = "Sent (demo). Wire this up to your backend when ready.";
    setTimeout(() => (formStatus.textContent = ""), 3500);
  }
  form.reset();
});
