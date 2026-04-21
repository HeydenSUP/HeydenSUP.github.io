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
