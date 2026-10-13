/* ==================================================
   POSTCARD FLIP
================================================== */

const postcard = document.getElementById("postcard");

if (postcard) {
  postcard.addEventListener("click", () => {
    postcard.classList.toggle("flipped");
  });
}

/* ==================================================
   SCROLL REVEAL
================================================== */

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },

  {
    threshold: 0.1,
  },
);

reveals.forEach((item) => {
  observer.observe(item);
});

/* ==================================================
   NAV ACTIVE STATE
================================================== */

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const id = entry.target.getAttribute("id");

      navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    });
  },

  {
    threshold: 0.35,
  },
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});
