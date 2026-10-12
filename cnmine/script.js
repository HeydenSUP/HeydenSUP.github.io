/* ==================================================
   POSTCARD FLIP
================================================== */

const postcard = document.getElementById("postcard");

postcard.addEventListener("click", () => {
  postcard.classList.toggle("flipped");
});

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
    threshold: 0.12,
  },
);

reveals.forEach((item) => {
  observer.observe(item);
});
