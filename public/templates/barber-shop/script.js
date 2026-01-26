// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when clicking a link on mobile
  navLinks.addEventListener("click", (e) => {
    if (e.target && e.target.tagName === "A") {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Smooth scroll (for older browsers that ignore CSS smooth-behavior sometimes)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId && targetId.startsWith("#")) {
      const el = document.querySelector(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// Active nav link based on scroll position (premium polish)
const sections = ["hero", "about", "gallery", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const navAnchors = Array.from(document.querySelectorAll(".nav-links a"));

function setActiveNav(hash) {
  navAnchors.forEach((a) => {
    const isActive = a.getAttribute("href") === hash;
    a.classList.toggle("active", isActive);
  });
}

if (sections.length && navAnchors.length) {
  const obs = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible && visible.target && visible.target.id) {
        setActiveNav(`#${visible.target.id}`);
      }
    },
    { root: null, threshold: [0.35, 0.5, 0.65] }
  );

  sections.forEach((s) => obs.observe(s));
}

// Simple gallery lightbox (+ ESC to close)
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox?.querySelector(".lightbox-img");
const lightboxClose = lightbox?.querySelector(".lightbox-close");

function closeLightbox() {
  if (!lightbox || !lightboxImg) return;
  lightbox.classList.remove("open");
  lightboxImg.src = "";
}

document.querySelectorAll(".gallery-item img").forEach((img) => {
  img.addEventListener("click", () => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = img.src;
    lightbox.classList.add("open");
  });
});

if (lightbox && lightboxClose && lightboxImg) {
  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
}

// CTA micro interaction (subtle premium)
const cta = document.getElementById("cta-book");
if (cta) {
  // brief attention pulse on load
  setTimeout(() => cta.classList.add("cta-pulse"), 650);
  setTimeout(() => cta.classList.remove("cta-pulse"), 2200);
}

// Set current year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
