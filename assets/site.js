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
