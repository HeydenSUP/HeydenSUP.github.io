const cursorLight = document.querySelector(".cursor-light");

window.addEventListener("mousemove", (event) => {
  if (!cursorLight) return;

  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
});

const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];

  const particleCount = Math.floor(window.innerWidth / 18);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8 + 0.4,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: Math.random() * 0.35 + 0.08,
      opacity: Math.random() * 0.45 + 0.15,
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(216, 198, 120, ${particle.opacity})`;
    ctx.fill();

    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if (particle.y > canvas.height) {
      particle.y = -10;
      particle.x = Math.random() * canvas.width;
    }

    if (particle.x < 0 || particle.x > canvas.width) {
      particle.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawParticles);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

resizeCanvas();
createParticles();
drawParticles();

/* Scroll reveal */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});
