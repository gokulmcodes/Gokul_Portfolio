function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  if (!menu || !icon) return;

  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const logoScroll = document.getElementById("scrollTop");
const logoMobile = document.getElementById("logoMobile");
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

const currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "dark") {
  body.classList.add("dark-theme");
}

function initParticles() {
  if (typeof particlesJS !== "function") return;

  const darkMode = body.classList.contains("dark-theme");
  const particleColor = darkMode ? "#b388ff" : "#7c3aed";
  const lineColor = darkMode ? "#d8b4fe" : "#a855f7";

  particlesJS("particles-js", {
    particles: {
      number: {
        value: 42,
        density: {
          enable: true,
          value_area: 900,
        },
      },
      color: {
        value: particleColor,
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.18,
        random: true,
      },
      size: {
        value: 3,
        random: true,
      },
      line_linked: {
        enable: true,
        distance: 140,
        color: lineColor,
        opacity: 0.12,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        out_mode: "out",
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 120,
          line_linked: {
            opacity: 0.2,
          },
        },
      },
    },
    retina_detect: true,
  });
}

function updateParticlesColor() {
  if (window.pJSDom && window.pJSDom.length > 0) {
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window.pJSDom = [];
  }

  initParticles();
}

if (themeToggle) {
  themeToggle.setAttribute(
    "aria-label",
    body.classList.contains("dark-theme") ? "Switch to light theme" : "Switch to dark theme"
  );

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    localStorage.setItem(
      "theme",
      body.classList.contains("dark-theme") ? "dark" : "light"
    );
    themeToggle.setAttribute(
      "aria-label",
      body.classList.contains("dark-theme") ? "Switch to light theme" : "Switch to dark theme"
    );
    updateParticlesColor();
  });
}

if (cursorDot && cursorOutline) {
  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  const animateCursor = () => {
    outlineX += (mouseX - outlineX) * 0.12;
    outlineY += (mouseY - outlineY) * 0.12;
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
    requestAnimationFrame(animateCursor);
  };

  animateCursor();

  document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursorOutline.style.width = "62px";
      cursorOutline.style.height = "62px";
      cursorOutline.style.borderColor = "rgba(168, 85, 247, 0.55)";
      cursorOutline.style.boxShadow = "0 0 28px rgba(168, 85, 247, 0.22)";
    });

    element.addEventListener("mouseleave", () => {
      cursorOutline.style.width = "46px";
      cursorOutline.style.height = "46px";
      cursorOutline.style.borderColor = "rgba(124, 58, 237, 0.4)";
      cursorOutline.style.boxShadow = "0 0 24px rgba(124, 58, 237, 0.12)";
    });
  });
}

function smoothScrollTo(targetY, duration = 850) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime = null;

  function easeInOutCubic(progress) {
    return progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

function scrollToTop() {
  smoothScrollTo(0, 700);
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", scrollToTop);
}

if (logoScroll) {
  logoScroll.addEventListener("click", scrollToTop);
}

if (logoMobile) {
  logoMobile.addEventListener("click", scrollToTop);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  }
);

document.querySelectorAll(".animate-section").forEach((section) => {
  observer.observe(section);
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function handleAnchorClick(event) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    const offset = window.innerWidth <= 860 ? 92 : 108;

    smoothScrollTo(target.offsetTop - offset, 850);

    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    if (menu && icon && menu.classList.contains("open")) {
      menu.classList.remove("open");
      icon.classList.remove("open");
    }
  });
});

const certificationCards = document.querySelectorAll(".certification-card");

certificationCards.forEach((card) => {
  const toggle = card.querySelector(".certification-card__copy");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = card.classList.contains("is-flipped");

    certificationCards.forEach((item) => {
      item.classList.remove("is-flipped");
      item.querySelector(".certification-card__copy")?.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      card.classList.add("is-flipped");
      toggle.setAttribute("aria-expanded", "true");
    }
  });
});

document.addEventListener("click", (event) => {
  const clickedCard = event.target.closest(".certification-card");
  if (clickedCard) return;

  certificationCards.forEach((card) => {
    card.classList.remove("is-flipped");
    card.querySelector(".certification-card__copy")?.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  certificationCards.forEach((card) => {
    card.classList.remove("is-flipped");
    card.querySelector(".certification-card__copy")?.setAttribute("aria-expanded", "false");
  });
});

function updateActiveLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  let currentSection = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 180;
    const height = section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < top + height) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
  });
}

window.addEventListener("scroll", () => {
  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle("visible", window.scrollY > 360);
  }
  updateActiveLink();
});

window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen");
  initParticles();
  updateActiveLink();

  window.setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.classList.add("hidden");
    }
    document.getElementById("profile")?.classList.add("show");
  }, 500);
});

const skipLink = document.createElement("a");
skipLink.href = "#profile";
skipLink.className = "skip-link";
skipLink.textContent = "Skip to main content";
document.body.insertBefore(skipLink, document.body.firstChild);

document.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    document.body.classList.add("keyboard-nav");
  }
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-nav");
});
