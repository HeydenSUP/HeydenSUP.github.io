// Function to handle season change
function enterSeason(season) {
  const body = document.body;

  // Change background color based on season
  if (season === "spring") {
    body.style.backgroundColor = "#a8e6cf"; // Light spring green
    playAudio("spring-bird-sounds.mp3");
  } else if (season === "summer") {
    body.style.backgroundColor = "#ffeb3b"; // Bright summer yellow
    playAudio("summer-waves.mp3");
  } else if (season === "autumn") {
    body.style.backgroundColor = "#ff7043"; // Autumn orange
    playAudio("autumn-leaves.mp3");
  } else if (season === "winter") {
    body.style.backgroundColor = "#b3e5fc"; // Winter light blue
    playAudio("winter-snow.mp3");
  }

  // Provide haptic feedback on mobile devices
  if (navigator.vibrate) {
    navigator.vibrate(100); // Vibrate for 100ms to simulate a light touch
  }

  // Scroll to the top for a better user experience
  window.scrollTo(0, 0);
}

// Function to play audio
function playAudio(audioFile) {
  const audio = new Audio(audioFile);
  audio.play();
}
