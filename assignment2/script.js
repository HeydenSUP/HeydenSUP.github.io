const video = document.querySelector("#custom-video-player");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");
//video.removeAttribute("controls");
// playPauseBtn.addEventListener("click", togglePlayPause);
//video.addEventListener("timeupdate", updateProgressBar);
function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    video.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}
function updateProgressBar() {
  const value = (video.currentTime / video.duration) * 100;
  progressBar.style.width = value + "%";
}
// Add other functionalities here
document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("music-player");
  const playBtn = document.getElementById("play-btn");
  const pauseBtn = document.getElementById("pause-btn");
  const progressFill = document.getElementById("music-progress-fill");
  const progressBar = document.querySelector(".music-progress-bar");
  const currentTimeEl = document.getElementById("current-time");
  const totalDurationEl = document.getElementById("total-duration");
  const bannerImg = document.getElementById("banner-img");
  pauseBtn.style.display = "inline-block";
  playBtn.style.display = "none";
  playBtn.addEventListener("click", function () {
    audio.play();
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline-block";
    bannerImg.classList.add("shaking");
  });

  pauseBtn.addEventListener("click", function () {
    audio.pause();
    pauseBtn.style.display = "none";
    playBtn.style.display = "inline-block";
    bannerImg.classList.remove("shaking");
  });

  audio.addEventListener("timeupdate", function () {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = percent + "%";
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });
});
audio.addEventListener("loadedmetadata", function () {
  totalDurationEl.textContent = formatTime(audio.duration);
});
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}
const themeToggleBtn = document.getElementById("toggle-theme-btn");
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", function () {
    document.body.classList.toogle("dark-mode");
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains(dark - mode)) {
      themeToggleBtn.textContent = "Light Mode";
    } else {
      themeToggleBtn.textContent = "Night Mode";
    }
  });
}
