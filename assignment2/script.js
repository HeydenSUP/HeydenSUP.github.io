const video = document.querySelector("#custom-video-player");
console.log(video);
const audio = document.querySelector("#custom-audio-player");
console.log(audio);
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");
video.removeAttribute("controls");
// playPauseBtn.addEventListener("click", togglePlayPause);
video.addEventListener("timeupdate", updateProgressBar);
function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    audio.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    video.pause();
    audio.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}
function updateProgressBar() {
  const value = (video.currentTime / video.duration) * 100;
  progressBar.style.width = value + "%";
}
// Add other functionalities here
const speedBtn = document.querySelector("#speed-toggle-btn");
console.log(speedBtn);
if (speedBtn) {
  let isFast = false;
  //make clear it is fast or not
  speedBtn.addEventListener("click", function () {
    if (!video || !audio) return;

    if (isFast) {
      video.playbackRate = 1;
      audio.playbackRate = 1;
      speedBtn.textContent = "1x";
    } else {
      video.playbackRate = 2;
      audio.playbackRate = 2;
      speedBtn.textContent = "2x";
    }
    isFast = !isFast;
  });
}

const muteBtn = document.querySelector("#mute-toggle-btn");
console.log(muteBtn);
const muteIcon = document.querySelector("#mute-icon");
console.log(muteIcon);

if (muteBtn) {
  muteBtn.addEventListener("click", function () {
    const newMutedState = !video.muted;

    video.muted = newMutedState;
    audio.muted = newMutedState;

    if (newMutedState) {
      muteIcon.src = "https://img.icons8.com/ios-glyphs/30/mute.png";
      muteIcon.alt = "Muted";
    } else {
      muteIcon.src = "https://img.icons8.com/ios-glyphs/30/medium-volume.png";
      muteIcon.alt = "Unmuted";
    }
  });
}
const fullscreenBtn = document.getElementById("fullscreen-btn");
const fullScreenBtn = document.querySelector("#fullscreen-btn");
console.log(fullScreenBtn);
const fullscreenIcon = document.querySelector("#fullscreen-icon");
console.log(fullscreenIcon);
const playerContainer = document.querySelector(".media-player");
console.log(playerContainer);

if (fullscreenBtn && fullscreenIcon && playerContainer) {
  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      playerContainer
        .requestFullscreen()
        .then(() => {
          fullscreenIcon.src =
            "https://img.icons8.com/ios-glyphs/30/collapse.png";
          fullscreenIcon.alt = "Exit Fullscreen";
        })
        .catch((err) => {
          console.error(`Fullscreen error: ${err.message}`);
        });
    } else {
      document.exitFullscreen();
      fullscreenIcon.src =
        "https://img.icons8.com/ios-glyphs/30/full-screen--v1.png";
      fullscreenIcon.alt = "Enter Fullscreen";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const starsContainer = document.getElementById("stars-container");

  function createStar() {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = Math.random() * 100 + "vw";
    star.style.animationDuration = 3 + Math.random() * 5 + "s";
    star.style.opacity = Math.random() * 0.5 + 0.3;
    star.style.fontSize = Math.random() * 10 + 6 + "px";
    starsContainer.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 8000);
  }

  setInterval(createStar, 300);
});
