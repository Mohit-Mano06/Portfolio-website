document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  const terminalOutput = document.getElementById("terminal-output");
  const heroName = document.getElementById("hero-name");
  const sections = document.querySelectorAll("[data-nav-section]");
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const runIntro = () => {
    hero.classList.add("is-typed", "hero-ready");
    if (heroName && prefersReducedMotion) {
      heroName.style.opacity = "1";
      heroName.style.transform = "translateY(0)";
    }
  };

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", isActive);
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");
          setActiveLink(sectionId);
          entry.target.querySelectorAll(".reveal").forEach((el) => {
            el.classList.add("in-view");
          });
        }
      });
    },
    {
      root: null,
      threshold: 0.2,
      rootMargin: "-10% 0px -20% 0px",
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) {
        return;
      }
      event.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      setActiveLink(target.id);
    });
  });

  const heroReveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
        }
      });
    },
    { threshold: 0.18 }
  );

  heroReveal.observe(hero);

  // Light parallax on the hero background. This stays subtle so it never feels busy.
  let rafId = null;
  const onPointerMove = (event) => {
    if (prefersReducedMotion || !hero) {
      return;
    }

    const x = (event.clientX / window.innerWidth - 0.5) * 28;
    const y = (event.clientY / window.innerHeight - 0.5) * 28;

    if (rafId) {
      cancelAnimationFrame(rafId);
    }

    rafId = requestAnimationFrame(() => {
      hero.style.setProperty("--mouse-x", `${x}px`);
      hero.style.setProperty("--mouse-y", `${y}px`);
    });
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });

  runIntro();
});

// Global function for the interactive email card
window.copyEmailToClipboard = async function (event) {
  event.stopPropagation();
  
  const emailText = document.getElementById("email-text")?.innerText || "mohit7052015@gmail.com";
  const card = document.getElementById("email-contact-card");
  const toast = document.getElementById("copy-toast");
  
  if (!card || !toast) return;

  try {
    await navigator.clipboard.writeText(emailText);
    
    // UI feedback
    card.classList.add("copied");
    toast.classList.add("show");
    
    // Subtle scale feedback inline
    card.style.transform = "translateY(0) scale(0.96)";
    setTimeout(() => {
      card.style.transform = ""; // let css hover take over again
    }, 150);

    // Reset success state after a delay
    setTimeout(() => {
      card.classList.remove("copied");
      toast.classList.remove("show");
    }, 2500);
    
  } catch (err) {
    console.error("Failed to copy email to clipboard", err);
  }
};
