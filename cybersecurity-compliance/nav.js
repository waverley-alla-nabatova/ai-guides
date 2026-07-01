// Ordered list of slides. Add new slides here as the deck grows.
const SLIDES = [
  "index.html",
  "about.html",
  "meet-app.html",
  "business-model.html",
  "product.html",
  "feature-health.html",
  "feature-location.html",
  "feature-financial.html",
  "feature-ai.html",
  "feature-employer.html",
  "feature-marketplace.html",
  "us-laws.html",
  "eu-laws.html",
  "venn.html",
  "matrix.html",
  "summary.html",
];

(function () {
  let current = location.pathname.split("/").pop() || "index.html";
  if (current === "") current = "index.html";

  let i = SLIDES.indexOf(current);
  if (i === -1) i = 0;

  const prev = i > 0 ? SLIDES[i - 1] : null;
  const next = i < SLIDES.length - 1 ? SLIDES[i + 1] : null;

  const nav = document.createElement("div");
  nav.className = "slide-nav";
  nav.innerHTML =
    '<a class="nav-btn' + (prev ? "" : " disabled") + '" ' +
      (prev ? 'href="' + prev + '"' : "") + ' aria-label="Previous">‹</a>' +
    '<span class="nav-count">' + (i + 1) + " / " + SLIDES.length + "</span>" +
    '<a class="nav-btn' + (next ? "" : " disabled") + '" ' +
      (next ? 'href="' + next + '"' : "") + ' aria-label="Next">›</a>';
  document.body.appendChild(nav);

  // Deck footer (skip the title slide, which has its own)
  if (!document.body.classList.contains("title-body")) {
    const footer = document.createElement("div");
    footer.className = "deck-footer";
    footer.textContent = "Waverley Software";
    document.body.appendChild(footer);
  }

  // Image lightbox (click a screenshot to expand)
  const zoomables = document.querySelectorAll(".app-showcase img, .shot img");
  if (zoomables.length) {
    const box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML = '<span class="lb-close">×</span><img alt="" />';
    document.body.appendChild(box);
    const bigImg = box.querySelector("img");

    function openLb(src, alt) {
      bigImg.src = src;
      bigImg.alt = alt || "";
      box.classList.add("open");
    }
    function closeLb() { box.classList.remove("open"); }

    zoomables.forEach(function (im) {
      im.addEventListener("click", function () { openLb(im.src, im.alt); });
    });
    box.addEventListener("click", closeLb);
  }

  // Arrow-key navigation
  document.addEventListener("keydown", function (e) {
    const lb = document.querySelector(".lightbox.open");
    if (e.key === "Escape" && lb) { lb.classList.remove("open"); return; }
    if (lb) return; // don't navigate while zoomed
    if (e.key === "ArrowRight" && next) location.href = next;
    if (e.key === "ArrowLeft" && prev) location.href = prev;
  });
})();
