(function () {
  "use strict";

  // Glass nav on scroll
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  function setMenu(open) {
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (header) header.classList.toggle("nav-open", open);
    document.documentElement.classList.toggle("menu-open", open);
  }
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      setMenu(!links.classList.contains("open"));
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("open")) setMenu(false);
    });
  }

  // FAQ accordion — smooth height animation on top of native <details>.
  // Falls back to the instant native toggle when animations are unavailable.
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var summary = item.querySelector("summary");
    var body = item.querySelector(".faq-body");
    if (!summary || !body || typeof body.animate !== "function" || reduceMotion) return;
    var animating = false;
    summary.addEventListener("click", function (e) {
      e.preventDefault();
      if (animating) return;
      animating = true;
      var cs = getComputedStyle(body);
      var openFrame = { height: null, paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom, opacity: 1 };
      var shutFrame = { height: "0px", paddingTop: "0px", paddingBottom: "0px", opacity: 0 };
      if (item.open) {
        openFrame.height = body.getBoundingClientRect().height + "px";
        var closing = body.animate([openFrame, shutFrame], { duration: 260, easing: "ease" });
        closing.onfinish = function () { item.open = false; animating = false; };
      } else {
        item.open = true;
        openFrame.height = body.getBoundingClientRect().height + "px";
        var opening = body.animate([shutFrame, openFrame], { duration: 320, easing: "ease" });
        opening.onfinish = function () { animating = false; };
      }
    });
  });

  // Reading progress bar + back-to-top (injected so every page gets them)
  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.appendChild(bar);
  var toTop = document.createElement("button");
  toTop.className = "to-top";
  toTop.setAttribute("aria-label", "Back to top");
  toTop.innerHTML = "&uarr;";
  document.body.appendChild(toTop);
  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  var ticking = false;
  function paintScroll() {
    ticking = false;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ")";
    toTop.classList.toggle("show", window.scrollY > 900);
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(paintScroll); }
  }, { passive: true });
  paintScroll();

  // Swipe dots under the mobile destination carousel
  document.querySelectorAll(".grid-3, .grid-4").forEach(function (car) {
    if (!car.querySelector(".dest-tile")) return;
    var tiles = car.querySelectorAll(".dest-tile");
    if (tiles.length < 2) return;
    var dots = document.createElement("div");
    dots.className = "carousel-dots";
    dots.setAttribute("aria-hidden", "true");
    tiles.forEach(function () { dots.appendChild(document.createElement("span")); });
    car.parentNode.insertBefore(dots, car.nextSibling);
    function paintDots() {
      if (car.scrollWidth <= car.clientWidth) return;
      var idx = Math.round(car.scrollLeft / (car.scrollWidth - car.clientWidth) * (tiles.length - 1));
      dots.querySelectorAll("span").forEach(function (d, i) { d.classList.toggle("on", i === idx); });
    }
    car.addEventListener("scroll", paintDots, { passive: true });
    paintDots();
  });

  // ---- CTA A/B test -------------------------------------------------
  // Variant A keeps the consultation framing, B uses the booking framing.
  // Assignment is sticky per visitor so the copy never changes underfoot.
  var CTA_COPY = {
    a: { primary: "Start My Free Consultation", sticky: "Book My Free Consultation" },
    b: { primary: "Book My Trip Here", sticky: "Book My Trip Here" }
  };
  var variant;
  try {
    variant = localStorage.getItem("tbv_cta");
    if (variant !== "a" && variant !== "b") {
      variant = Math.random() < 0.5 ? "a" : "b";
      localStorage.setItem("tbv_cta", variant);
    }
  } catch (e) { variant = "a"; }
  document.documentElement.setAttribute("data-cta-variant", variant);

  function track(name, extra) {
    var payload = { variant: variant };
    for (var k in extra) { if (extra.hasOwnProperty(k)) payload[k] = extra[k]; }
    if (typeof window.va === "function") window.va("event", { name: name, data: payload });
    if (typeof window.gtag === "function") window.gtag("event", name, payload);
  }
  track("cta_view", {});

  document.querySelectorAll('[data-cta="primary"]').forEach(function (el) {
    el.textContent = CTA_COPY[variant].primary;
  });
  document.querySelectorAll("[data-cta-place]").forEach(function (el) {
    el.addEventListener("click", function () {
      track("cta_click", { place: el.getAttribute("data-cta-place") });
    });
  });
  var inquiryForm = document.querySelector("#inquiry form");
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", function () { track("inquiry_submit", {}); });
  }

  // ---- Review slider -------------------------------------------------
  document.querySelectorAll("[data-slider]").forEach(function (slider) {
    var track_ = slider.querySelector("[data-track]");
    var dots = slider.querySelector("[data-dots]");
    var slides = track_ ? track_.children : [];
    if (!track_ || slides.length < 2) return;

    function step() { return slides[0].getBoundingClientRect().width + 24; }
    function index() { return Math.round(track_.scrollLeft / step()); }
    function go(i) {
      var max = slides.length - 1;
      track_.scrollTo({ left: Math.max(0, Math.min(i, max)) * step(), behavior: "smooth" });
    }

    slider.querySelectorAll("[data-slide]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        go(index() + (btn.getAttribute("data-slide") === "next" ? 1 : -1));
      });
    });

    if (dots) {
      Array.prototype.forEach.call(slides, function (_, i) {
        var d = document.createElement("button");
        d.type = "button";
        d.setAttribute("aria-label", "Go to review " + (i + 1));
        d.addEventListener("click", function () { go(i); });
        dots.appendChild(d);
      });
    }
    function paintDots() {
      if (!dots) return;
      var cur = index();
      Array.prototype.forEach.call(dots.children, function (d, i) {
        d.classList.toggle("on", i === cur);
      });
    }
    track_.addEventListener("scroll", paintDots, { passive: true });
    track_.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(index() + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(index() - 1); }
    });
    paintDots();
  });

  // Scroll reveal
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  // Inquiry form → opens a pre-filled email (no backend required).
  // Swap CONTACT_EMAIL for Val's real address before launch.
  var CONTACT_EMAIL = "valeriadelgado995@gmail.com";
  var form = document.getElementById("inquiry-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = new FormData(form);
      var subject = "Trip inquiry — " + (f.get("destination") || "New trip") + " (" + (f.get("name") || "") + ")";
      var body = [
        "Name: " + (f.get("name") || ""),
        "Email: " + (f.get("email") || ""),
        "Phone: " + (f.get("phone") || ""),
        "Destination / trip type: " + (f.get("destination") || ""),
        "Travel dates: " + (f.get("dates") || ""),
        "Travelers: " + (f.get("travelers") || ""),
        "Approximate budget: " + (f.get("budget") || ""),
        "",
        "About this trip:",
        (f.get("message") || "")
      ].join("\n");
      window.location.href =
        "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      var ok = document.getElementById("form-ok");
      if (ok) ok.hidden = false;
    });
  }
})();
