(function () {
  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Topbar elevate on scroll
  const topbar = document.querySelector("[data-elevate]");
  const setElevate = () => {
    if (!topbar) return;
    const elevated = window.scrollY > 8;
    topbar.classList.toggle("is-elevated", elevated);
  };
  setElevate();
  window.addEventListener("scroll", setElevate, { passive: true });

  // Mobile nav toggle
  const toggleBtn = document.querySelector(".nav-toggle");
  const nav = document.getElementById("nav");
  const setNavOpen = (open) => {
    if (!toggleBtn || !nav) return;
    toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("is-open", open);
  };

  if (toggleBtn && nav) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
      setNavOpen(!isOpen);
    });

    // Close menu when clicking a link
    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      setNavOpen(false);
    });

    // Close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setNavOpen(false);
    });
  }

  // Simple form validation + toast
  const form = document.getElementById("reservationForm");
  const toast = form ? form.querySelector(".toast") : null;

  const setError = (fieldEl, msg) => {
    const err = fieldEl.closest(".field")?.querySelector(".field__error");
    if (err) err.textContent = msg || "";
  };

  const isEmpty = (v) => !v || String(v).trim().length === 0;

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(form);
      const name = fd.get("name");
      const phone = fd.get("phone");
      const date = fd.get("date");
      const time = fd.get("time");
      const party = fd.get("party");

      // Reset errors
      ["name", "phone", "date", "time", "party"].forEach((n) => {
        const el = form.querySelector(`[name="${n}"]`);
        if (el) setError(el, "");
      });

      let ok = true;

      const nameEl = form.querySelector(`[name="name"]`);
      if (nameEl && isEmpty(name)) {
        setError(nameEl, "Please enter your name.");
        ok = false;
      }

      const phoneEl = form.querySelector(`[name="phone"]`);
      if (phoneEl && isEmpty(phone)) {
        setError(phoneEl, "Please enter your phone.");
        ok = false;
      }

      const dateEl = form.querySelector(`[name="date"]`);
      if (dateEl && isEmpty(date)) {
        setError(dateEl, "Please pick a date.");
        ok = false;
      }

      const timeEl = form.querySelector(`[name="time"]`);
      if (timeEl && isEmpty(time)) {
        setError(timeEl, "Please pick a time.");
        ok = false;
      }

      const partyEl = form.querySelector(`[name="party"]`);
      if (partyEl && isEmpty(party)) {
        setError(partyEl, "Please select party size.");
        ok = false;
      }

      if (!ok) return;

      // Demo "success"
      if (toast) {
        toast.hidden = false;
        toast.scrollIntoView({ behavior: "smooth", block: "nearest" });
        setTimeout(() => {
          toast.hidden = true;
        }, 3500);
      }

      form.reset();
    });
  }

  // Lightbox gallery
  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImg = lightbox ? lightbox.querySelector(".lightbox__img") : null;

  const tiles = Array.from(document.querySelectorAll("[data-gallery] .gallery-tile"));
  const imgs = tiles.map((t) => t.getAttribute("data-img")).filter(Boolean);

  let index = 0;

  const openLightbox = (i) => {
    if (!lightbox || !lightboxImg) return;
    index = Math.max(0, Math.min(i, imgs.length - 1));
    lightboxImg.src = imgs[index];
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
  };

  const step = (dir) => {
    if (!imgs.length) return;
    index = (index + dir + imgs.length) % imgs.length;
    if (lightboxImg) lightboxImg.src = imgs[index];
  };

  tiles.forEach((tile, i) => {
    tile.addEventListener("click", () => openLightbox(i));
  });

  const openAllBtn = document.querySelector("[data-open-lightbox]");
  if (openAllBtn) openAllBtn.addEventListener("click", () => openLightbox(0));

  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!t) return;

    if (t.matches("[data-close-lightbox]")) closeLightbox();
    if (t.matches("[data-prev]")) step(-1);
    if (t.matches("[data-next]")) step(1);
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
})();
