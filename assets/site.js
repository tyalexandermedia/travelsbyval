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
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

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
