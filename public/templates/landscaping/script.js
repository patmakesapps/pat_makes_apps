// Responsive nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const menuOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(menuOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target && event.target.tagName === "A") {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Smooth scroll polyfill for anchors
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");
    if (targetId && targetId.startsWith("#")) {
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// Highlight nav links based on viewport
const sectionIds = ["hero", "services", "gallery", "contact"];
const sectionEls = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const navAnchors = Array.from(document.querySelectorAll(".nav-links a"));

const activateNav = (hash) => {
  navAnchors.forEach((anchor) => {
    const matches = anchor.getAttribute("href") === hash;
    anchor.classList.toggle("active", matches);
  });
};

if (sectionEls.length && navAnchors.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) {
        activateNav(`#${visible.target.id}`);
      }
    },
    { threshold: [0.35, 0.5, 0.65] }
  );

  sectionEls.forEach((section) => observer.observe(section));
}

// Gallery builder
const galleryGrid = document.querySelector(".gallery-grid");
const galleryPhotoNames = ["pic1", "pic2", "pic3", "pic4", "pic5","pic6"]

const createGalleryItem = (name, index) => {
  const figure = document.createElement("figure");
  figure.className = "gallery-item";

  const img = document.createElement("img");
  img.src = `./photos/${name}.png`;

  img.alt = `Showcase landscape ${index + 1}`;
  img.loading = "lazy";
  img.dataset.photoName = name;
  figure.appendChild(img);

  return figure;
};

if (galleryGrid) {
  galleryPhotoNames.forEach((name, idx) => {
    galleryGrid.appendChild(createGalleryItem(name, idx));
  });
}

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox?.querySelector(".lightbox-img");
const lightboxClose = lightbox?.querySelector(".lightbox-close");

const closeLightbox = () => {
  if (!lightbox || !lightboxImg) return;
  lightbox.classList.remove("open");
  lightboxImg.src = "";
};

document.querySelectorAll(".gallery-item img").forEach((img) => {
  img.addEventListener("click", () => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = img.src;
    lightbox.classList.add("open");
  });
});

if (lightbox && lightboxClose && lightboxImg) {
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
}

// CTA subtle pulse
const ctaButton = document.getElementById("cta-book");
if (ctaButton) {
  setTimeout(() => ctaButton.classList.add("cta-pulse"), 650);
  setTimeout(() => ctaButton.classList.remove("cta-pulse"), 2400);
}

// Footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
