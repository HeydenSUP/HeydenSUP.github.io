/* ==========================================
   BASIC PAGE SYSTEM
========================================== */

const pages = document.querySelectorAll(".page");

const prevButton = document.getElementById("prevButton");

const nextButton = document.getElementById("nextButton");

const openGift = document.getElementById("openGift");

const restartButton = document.getElementById("restartButton");

const currentPageNumber = document.getElementById("currentPageNumber");

const dots = document.querySelectorAll(".dot");

let currentPage = 0;

let isAnimating = false;

/* ==========================================
   CHANGE PAGE
========================================== */

function goToPage(newPage) {
  if (
    newPage < 0 ||
    newPage >= pages.length ||
    newPage === currentPage ||
    isAnimating
  ) {
    return;
  }

  isAnimating = true;

  const oldPage = pages[currentPage];

  const nextPage = pages[newPage];

  const movingForward = newPage > currentPage;

  if (movingForward) {
    oldPage.classList.add("exit-left");

    nextPage.style.transform = "translateX(100px) scale(0.98)";
  } else {
    oldPage.style.transform = "translateX(100px) scale(0.98)";

    nextPage.classList.add("enter-left");
  }

  nextPage.classList.add("active");

  requestAnimationFrame(() => {
    nextPage.style.transform = "translateX(0) scale(1)";
  });

  setTimeout(() => {
    oldPage.classList.remove("active", "exit-left");

    oldPage.style.transform = "";

    nextPage.classList.remove("enter-left");

    nextPage.style.transform = "";

    currentPage = newPage;

    updateNavigation();

    isAnimating = false;
  }, 650);
}

/* ==========================================
   NAVIGATION
========================================== */

function updateNavigation() {
  currentPageNumber.textContent = String(currentPage + 1).padStart(2, "0");

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentPage);
  });

  if (currentPage === 0) {
    prevButton.classList.add("hidden");
  } else {
    prevButton.classList.remove("hidden");
  }

  if (currentPage === pages.length - 1) {
    nextButton.classList.add("hidden");
  } else {
    nextButton.classList.remove("hidden");
  }
}

/* ==========================================
   BUTTON EVENTS
========================================== */

nextButton.addEventListener("click", () => {
  goToPage(currentPage + 1);
});

prevButton.addEventListener("click", () => {
  goToPage(currentPage - 1);
});

openGift.addEventListener("click", () => {
  startMusic();

  goToPage(1);
});

restartButton.addEventListener("click", () => {
  goToPage(0);
});

/* ==========================================
   DOT NAVIGATION
========================================== */

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.index);

    goToPage(index);
  });
});

/* ==========================================
   MUSIC
========================================== */

const music = document.getElementById("bgMusic");

const musicButton = document.getElementById("musicButton");

let musicPlaying = false;

function startMusic() {
  if (musicPlaying) {
    return;
  }

  music
    .play()
    .then(() => {
      musicPlaying = true;

      musicButton.classList.add("playing");

      musicButton.textContent = "♫";
    })
    .catch(() => {
      console.log("等待用户手动播放音乐");
    });
}

musicButton.addEventListener("click", () => {
  if (musicPlaying) {
    music.pause();

    musicPlaying = false;

    musicButton.classList.remove("playing");

    musicButton.textContent = "♪";
  } else {
    music.play();

    musicPlaying = true;

    musicButton.classList.add("playing");

    musicButton.textContent = "♫";
  }
});

/* ==========================================
   CURSOR HEARTS
========================================== */

let lastHeart = 0;

document.addEventListener("mousemove", (event) => {
  const now = Date.now();

  if (now - lastHeart < 90) {
    return;
  }

  lastHeart = now;

  const heart = document.createElement("span");

  heart.className = "cursor-heart";

  heart.textContent = Math.random() > 0.5 ? "♡" : "♥";

  heart.style.left = `${event.clientX}px`;

  heart.style.top = `${event.clientY}px`;

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1000);
});

/* ==========================================
   KEYBOARD SUPPORT
========================================== */

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    goToPage(currentPage + 1);
  }

  if (event.key === "ArrowLeft") {
    goToPage(currentPage - 1);
  }
});

/* ==========================================
   INITIAL STATE
========================================== */

updateNavigation();

/* ==========================================
   ANIMATED BACKGROUND
========================================== */

const mouseGlow = document.getElementById("mouseGlow");

const particleContainer = document.getElementById("particleContainer");

/* ==========================================
   MOUSE GLOW
========================================== */

document.addEventListener("mousemove", (event) => {
  mouseGlow.style.left = `${event.clientX}px`;

  mouseGlow.style.top = `${event.clientY}px`;

  mouseGlow.style.opacity = "1";
});

document.addEventListener("mouseleave", () => {
  mouseGlow.style.opacity = "0";
});

/* ==========================================
   BACKGROUND PARTICLES
========================================== */

const particleSymbols = ["♡", "♡", "♡", "✦", "·"];

function createBackgroundParticle() {
  const particle = document.createElement("span");

  particle.className = "bg-particle";

  /* 随机图案 */

  particle.textContent =
    particleSymbols[Math.floor(Math.random() * particleSymbols.length)];

  /* 随机横向位置 */

  particle.style.left = `${Math.random() * 100}%`;

  /* 随机大小 */

  const size = 8 + Math.random() * 16;

  particle.style.fontSize = `${size}px`;

  /* 随机动画速度 */

  const duration = 10 + Math.random() * 10;

  particle.style.animationDuration = `${duration}s`;

  /* 随机透明度 */

  particle.style.opacity = 0.2 + Math.random() * 0.35;

  particleContainer.appendChild(particle);

  /* 动画结束删除 */

  setTimeout(
    () => {
      particle.remove();
    },

    duration * 1000,
  );
}

/* 每隔一段时间生成粒子 */

setInterval(createBackgroundParticle, 700);

/* 页面刚打开时先生成一些 */

for (let i = 0; i < 12; i++) {
  setTimeout(createBackgroundParticle, i * 250);
}
