const revealElements = document.querySelectorAll(".reveal");
const lightLeft = document.querySelector(".light-left");
const lightRight = document.querySelector(".light-right");
const heroLight = document.querySelector(".hero-light");

const hoverTargets = document.querySelectorAll(
  ".project-card, .story-card, .about-panel, .skills-panel, .contact-panel, .showreel-frame, .sticky-box",
);

/* reveal: 上下滑都能触发 */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  {
    threshold: 0.08,
  },
);

revealElements.forEach((el) => observer.observe(el));

/* 鼠标高光跟随 */
hoverTargets.forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    el.style.setProperty("--x", `${x}%`);
    el.style.setProperty("--y", `${y}%`);
  });
});

/* 滚动驱动光线变化 */
function updateLighting() {
  const scrollY = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? scrollY / docHeight : 0;

  const leftRotate = -12 + progress * 8;
  const rightRotate = 12 - progress * 8;

  const leftMoveY = scrollY * 0.08;
  const rightMoveY = scrollY * 0.06;

  const leftOpacity = 0.22 + progress * 0.12;
  const rightOpacity = 0.22 + progress * 0.12;

  if (lightLeft) {
    lightLeft.style.transform = `rotate(${leftRotate}deg) translateY(${leftMoveY}px)`;
    lightLeft.style.opacity = leftOpacity.toFixed(2);
  }

  if (lightRight) {
    lightRight.style.transform = `rotate(${rightRotate}deg) translateY(${rightMoveY}px)`;
    lightRight.style.opacity = rightOpacity.toFixed(2);
  }

  if (heroLight) {
    heroLight.style.transform = `translateX(-50%) translateY(${scrollY * 0.12}px)`;
    heroLight.style.opacity = (0.25 - Math.min(progress * 0.08, 0.12)).toFixed(
      2,
    );
  }
}

window.addEventListener("scroll", updateLighting);
window.addEventListener("load", updateLighting);
