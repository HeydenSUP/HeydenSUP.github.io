// Video and Audio Element Setup
// Select the elements from the DOM
const video = document.querySelector("#custom-video-player");
console.log(video);
const audio = document.querySelector("#custom-audio-player");
console.log(audio);
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");
// Remove the native browser controls on the video to use custom controls
video.removeAttribute("controls");
// playPauseBtn.addEventListener("click", togglePlayPause);
// fuction: When the video time updates, update the custom progress bar
video.addEventListener("timeupdate", updateProgressBar);
// This function toggles playback for both video and audio together
function togglePlayPause() {
  // If video is paused or ended, play both video and audio
  if (video.paused || video.ended) {
    video.play();
    audio.play();
    // Change button image to pause icon
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    // Pause both video and audio
    video.pause();
    audio.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
  //I separated video and audio because I can not upload the video with sound,
  // github said this file is too big that I have to make this function.
}
function updateProgressBar() {
  const value = (video.currentTime / video.duration) * 100;
  progressBar.style.width = value + "%";
}
// Add other functionalities here
// Select the speed toggle button
const speedBtn = document.querySelector("#speed-toggle-btn");
console.log(speedBtn);
if (speedBtn) {
  let isFast = false; // Track whether current speed is fast
  //make clear it is fast or not
  speedBtn.addEventListener("click", function () {
    // Do nothing if video/audio not loaded
    if (!video || !audio) return;

    if (isFast) {
      // Reset to normal speed
      video.playbackRate = 1;
      audio.playbackRate = 1;
      speedBtn.textContent = "1x";
    } else {
      // Double playback speed
      video.playbackRate = 2;
      audio.playbackRate = 2;
      speedBtn.textContent = "2x";
    }
    isFast = !isFast;
  });
}
// Select the mute button and icon
const muteBtn = document.querySelector("#mute-toggle-btn");
console.log(muteBtn);
const muteIcon = document.querySelector("#mute-icon");
console.log(muteIcon);

if (muteBtn) {
  muteBtn.addEventListener("click", function () {
    // Toggle mute state based on current video status
    const newMutedState = !video.muted;
    // Apply the same mute state to both video and audio
    video.muted = newMutedState;
    audio.muted = newMutedState;
    // Update icon based on mute status
    if (newMutedState) {
      muteIcon.src = "https://img.icons8.com/ios-glyphs/30/mute.png";
      muteIcon.alt = "Muted";
    } else {
      muteIcon.src = "https://img.icons8.com/ios-glyphs/30/medium-volume.png";
      muteIcon.alt = "Unmuted";
    }
  });
}
// Select fullscreen button and its icon
const fullscreenBtn = document.getElementById("fullscreen-btn");
const fullScreenBtn = document.querySelector("#fullscreen-btn");
console.log(fullScreenBtn);
const fullscreenIcon = document.querySelector("#fullscreen-icon");
console.log(fullscreenIcon);
const playerContainer = document.querySelector(".media-player");
console.log(playerContainer);
//fuction
if (fullscreenBtn && fullscreenIcon && playerContainer) {
  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      // Request fullscreen on media container
      playerContainer
        .requestFullscreen()
        .then(() => {
          // Update icon to collapse version
          fullscreenIcon.src =
            "https://img.icons8.com/ios-glyphs/30/collapse.png";
          fullscreenIcon.alt = "Exit Fullscreen";
        })
        .catch((err) => {
          console.error(`Fullscreen error: ${err.message}`);
        });
    } else {
      // Exit fullscreen and revert icon
      document.exitFullscreen();
      fullscreenIcon.src =
        // Handle potential errors
        "https://img.icons8.com/ios-glyphs/30/full-screen--v1.png";
      fullscreenIcon.alt = "Enter Fullscreen";
    }
  });
}
// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const starsContainer = document.getElementById("stars-container");
  // Function to generate a star element with random properties
  function createStar() {
    const star = document.createElement("div");
    star.classList.add("star");
    // Randomize horizontal position
    star.style.left = Math.random() * 100 + "vw";
    // Randomize animation duration between 3s and 8s
    star.style.animationDuration = 3 + Math.random() * 5 + "s";
    // Random opacity for more natural look
    star.style.opacity = Math.random() * 0.5 + 0.3;
    // Random size between 6px to 16px
    star.style.fontSize = Math.random() * 10 + 6 + "px";
    // Add star to the container
    starsContainer.appendChild(star);
    // Remove star after 8 seconds to avoid memory overflow
    setTimeout(() => {
      star.remove();
    }, 8000);
  }
  // Create a new star every 300ms
  setInterval(createStar, 300);
});
