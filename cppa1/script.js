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
// ===== 图片列表（自己改路径）=====
const galleryImages = [
  "image/v2.png",
  "image/v3.png",
  "image/v4.png",
  "image/v5.png",
];

// ===== 状态变量 =====
let currentIndex = 0;
let autoPlayInterval = null;

// ===== DOM =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// ===== 打开 =====
function openGallery(index) {
  // 防止叠加多个定时器
  clearInterval(autoPlayInterval);

  currentIndex = index;
  lightbox.style.display = "flex";
  lightboxImg.src = galleryImages[currentIndex];

  startAutoPlay();
}

// ===== 关闭 =====
function closeGallery() {
  lightbox.style.display = "none";
  stopAutoPlay();
}

// ===== 自动播放 =====
function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    nextImage();
  }, 2500); // 2.5秒切换（比你之前更高级一点，不那么急躁）
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// ===== 切换图片 =====
function nextImage() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex];
}

function prevImage() {
  currentIndex =
    (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex];
}

// ===== 事件绑定 =====

// 关闭按钮
if (closeBtn) {
  closeBtn.addEventListener("click", closeGallery);
}

// 左右按钮（顺便阻止冒泡，不然会点到背景关闭）
if (prevBtn) {
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    prevImage();
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    nextImage();
  });
}

// 点击背景关闭
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeGallery();
    }
  });
}

// ===== 鼠标悬停暂停（核心）=====
if (lightboxImg) {
  lightboxImg.addEventListener("mouseenter", () => {
    stopAutoPlay();
  });

  lightboxImg.addEventListener("mouseleave", () => {
    startAutoPlay();
  });
}

// ===== Particle Background =====
const particleCanvas = document.getElementById("particle-canvas");
const pctx = particleCanvas ? particleCanvas.getContext("2d") : null;

let particles = [];
let mouse = {
  x: null,
  y: null,
  radius: 140,
};

function resizeParticleCanvas() {
  if (!particleCanvas) return;
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
  initParticles();
}

class Particle {
  constructor(x, y, size, baseX, baseY, density) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.baseX = baseX;
    this.baseY = baseY;
    this.density = density;
    this.vx = 0;
    this.vy = 0;
  }

  draw() {
    if (!pctx) return;

    pctx.beginPath();
    pctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    pctx.fillStyle = "rgba(214, 181, 141, 0.75)";
    pctx.shadowColor = "rgba(214, 181, 141, 0.35)";
    pctx.shadowBlur = 8;
    pctx.fill();
    pctx.closePath();
  }

  update() {
    // 鼠标排斥
    if (mouse.x !== null && mouse.y !== null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;

        let directionX = forceDirectionX * force * this.density * 2.2;
        let directionY = forceDirectionY * force * this.density * 2.2;

        this.vx -= directionX;
        this.vy -= directionY;
      }
    }

    // 回弹到原位
    let restoreX = (this.baseX - this.x) * 0.025;
    let restoreY = (this.baseY - this.y) * 0.025;

    this.vx += restoreX;
    this.vy += restoreY;

    // 阻尼，避免乱飞
    this.vx *= 0.92;
    this.vy *= 0.92;

    // 轻微漂浮
    this.x += this.vx + Math.sin(Date.now() * 0.001 + this.baseY) * 0.02;
    this.y += this.vy + Math.cos(Date.now() * 0.001 + this.baseX) * 0.02;
  }
}

function initParticles() {
  if (!particleCanvas) return;
  particles = [];

  const numberOfParticles = Math.floor(
    (particleCanvas.width * particleCanvas.height) / 18000,
  );

  for (let i = 0; i < numberOfParticles; i++) {
    let x = Math.random() * particleCanvas.width;
    let y = Math.random() * particleCanvas.height;
    let size = Math.random() * 1.8 + 0.6;
    let density = Math.random() * 8 + 2;

    particles.push(new Particle(x, y, size, x, y, density));
  }
}

function animateParticles() {
  if (!particleCanvas || !pctx) return;

  pctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }

  requestAnimationFrame(animateParticles);
}

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("mouseout", () => {
  mouse.x = null;
  mouse.y = null;
});

window.addEventListener("resize", resizeParticleCanvas);

resizeParticleCanvas();
animateParticles();

// ===== Showreel Slider =====
const showreelTrack = document.getElementById("showreel-track");
const showreelPrev = document.getElementById("showreel-prev");
const showreelNext = document.getElementById("showreel-next");
const showreelDots = document.querySelectorAll("#showreel-dots .dot");

let currentShowreelIndex = 0;
const totalShowreelSlides = 3;
let showreelAutoSlide = null;

function updateShowreelSlider() {
  if (!showreelTrack) return;

  showreelTrack.style.transform = `translateX(-${currentShowreelIndex * 100}%)`;

  showreelDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentShowreelIndex);
  });
}

function nextShowreelSlide() {
  currentShowreelIndex = (currentShowreelIndex + 1) % totalShowreelSlides;
  updateShowreelSlider();
}

function prevShowreelSlide() {
  currentShowreelIndex =
    (currentShowreelIndex - 1 + totalShowreelSlides) % totalShowreelSlides;
  updateShowreelSlider();
}

function startShowreelAutoSlide() {
  clearInterval(showreelAutoSlide);
  showreelAutoSlide = setInterval(() => {
    nextShowreelSlide();
  }, 3500);
}

function stopShowreelAutoSlide() {
  clearInterval(showreelAutoSlide);
}

if (showreelNext) {
  showreelNext.addEventListener("click", () => {
    nextShowreelSlide();
    startShowreelAutoSlide();
  });
}

if (showreelPrev) {
  showreelPrev.addEventListener("click", () => {
    prevShowreelSlide();
    startShowreelAutoSlide();
  });
}

showreelDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentShowreelIndex = index;
    updateShowreelSlider();
    startShowreelAutoSlide();
  });
});

const showreelWindow = document.querySelector(".showreel-window");
if (showreelWindow) {
  showreelWindow.addEventListener("mouseenter", stopShowreelAutoSlide);
  showreelWindow.addEventListener("mouseleave", startShowreelAutoSlide);
}

updateShowreelSlider();
startShowreelAutoSlide();
