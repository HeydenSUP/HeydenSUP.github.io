/*
  Cute Submarine Journey — Final Animation Enhanced Version
  ----------------------------------------------------------
  Scene 1 → Scene 2 (Monster encounter)
  Scene 2 Choices:
    1. Stay Still → Submarine shatters into fragments (Game Over)
    2. Break Through → Sub shakes vertically and bursts upward (Victory)
    3. Escape Away → Turn around, then flee until power loss (Sink)
  All endings include a Restart button.
*/

/* Global references */
let sub, monster, title, desc, transition, choices, sceneDiv;

/* Initialization */
window.onload = function () {
  try {
    sub = document.getElementById("submarine");
    monster = document.getElementById("monster");
    title = document.getElementById("sceneTitle");
    desc = document.getElementById("sceneDesc");
    transition = document.getElementById("transition");
    choices = document.getElementById("choices");
    sceneDiv = document.getElementById("scene");
    console.log("Scene 1 ready: Calm Waters");
  } catch (err) {
    console.error("Initialization Error:", err.message);
  }
};

/* Smooth fade transition */
function sceneTransition(callback) {
  transition.style.opacity = "1";
  setTimeout(() => {
    callback();
    transition.style.opacity = "0";
  }, 1200);
}

/* ========== Scene 1 → Scene 2 ========== */
function scene2() {
  sceneTransition(() => {
    document.body.className = "scene2";
    document.body.style.background = "linear-gradient(#0c4a6e, #001a33)";
    title.innerText = "Scene 2: Deeper Waters";
    desc.innerText =
      "The submarine descends into the darkness. Something stirs below…";
    sub.className = "diveAnim";
    sub.querySelector(".light").style.opacity = "1";
    monster.style.opacity = "1";
    spawnBubbles(30);
    choices.innerHTML = `
      <button onclick="stayStill()">Stay Still</button>
      <button onclick="breakThrough()">Break Through</button>
      <button onclick="escapeAway()">Escape Away</button>
    `;
  });
}

/* ========== Bubble creation ========== */
function spawnBubbles(count) {
  for (let i = 0; i < count; i++) {
    const b = document.createElement("div");
    b.className = "bubble";
    const size = Math.random() * 10 + 5;
    b.style.width = b.style.height = size + "px";
    b.style.left = Math.random() * 100 + "vw";
    b.style.animationDuration = 4 + Math.random() * 3 + "s";
    b.style.animationDelay = Math.random() * 5 + "s";
    sceneDiv.appendChild(b);
    setTimeout(() => b.remove(), 8000);
  }
}

/* ========== CHOICES ========== */

/* 1️⃣ Stay Still → Submarine shatters into fragments */
function stayStill() {
  sceneTransition(() => {
    document.body.style.background = "linear-gradient(#000000,#0f172a)";
    monster.style.opacity = "0.9";
    title.innerText = "Ending : Crushed by the Deep";
    desc.innerText =
      "You freeze. The monster wraps around the hull. A final creak—then silence.";

    // Hide original submarine
    sub.style.opacity = "0";

    // Create 8 fragments
    for (let i = 0; i < 8; i++) {
      const frag = document.createElement("div");
      frag.className = "subFragment";
      frag.style.left = "50%";
      frag.style.top = "50%";
      frag.style.background = "#ffd84b";
      frag.style.width = Math.random() * 20 + 10 + "px";
      frag.style.height = Math.random() * 10 + 5 + "px";
      frag.style.position = "absolute";
      frag.style.borderRadius = "3px";
      frag.style.transform = "translate(-50%, -50%)";
      sceneDiv.appendChild(frag);

      // Animate fragments scattering downward
      frag.animate(
        [
          { transform: "translate(-50%, -50%) rotate(0deg)" },
          {
            transform:
              "translate(" +
              (Math.random() * 200 - 100) +
              "px," +
              (Math.random() * 300 + 100) +
              "px) rotate(" +
              Math.random() * 360 +
              "deg)",
          },
        ],
        {
          duration: 2000 + Math.random() * 1000,
          fill: "forwards",
          easing: "ease-in",
        }
      );

      setTimeout(() => frag.remove(), 4000);
    }

    choices.innerHTML = `<button onclick="restartJourney()">Restart Journey</button>`;
  });
}

/* 2️⃣ Break Through → Vertical shake and victory */
function breakThrough() {
  sceneTransition(() => {
    monster.style.opacity = "0";
    document.body.style.background = "linear-gradient(#fcd34d,#2563eb)";
    title.innerText = "Ending : Toward the Dawn";
    desc.innerText =
      "You surge forward, shaking violently, bursting through the barrier into light!";
    // Shake vertically
    sub.animate(
      [
        { transform: "translate(-50%, -50%)" },
        { transform: "translate(-50%, -55%)" },
        { transform: "translate(-50%, -50%)" },
      ],
      { duration: 300, iterations: 10, easing: "ease-in-out" }
    );
    spawnBubbles(40);
    choices.innerHTML = `<button onclick="restartJourney()">Restart Journey</button>`;
  });
}

/* 3️⃣ Escape Away → Flip, delay, then flee */
function escapeAway() {
  sceneTransition(() => {
    monster.style.opacity = "0.3";
    document.body.style.background = "linear-gradient(#001b2e,#000)";
    title.innerText = "Scene 3: Turning Away";
    desc.innerText = "You turn the submarine around, fleeing into the dark.";

    // Step 1: Flip direction
    sub.style.transition = "transform 1s ease";
    sub.style.transform = "translate(-50%,-50%) scaleX(-1)";

    // Step 2: After 1.2s, flee forward
    setTimeout(() => {
      sub.animate(
        [
          { transform: "translate(-50%, -50%) scaleX(-1)" },
          { transform: "translate(-150%, -40%) scaleX(-1)" },
        ],
        { duration: 3000, fill: "forwards", easing: "ease-in" }
      );
      title.innerText = "Ending : The Silent Sea";
      desc.innerText =
        "Engines strain… then fade. The submarine drifts downward into endless quiet.";
      setTimeout(() => {
        document.body.style.background = "linear-gradient(#000814,#000)";
      }, 2000);
      choices.innerHTML = `<button onclick="restartJourney()">Restart Journey</button>`;
    }, 1200);
  });
}

/* ========== Restart Journey ========== */
function restartJourney() {
  sceneTransition(() => {
    // Reset visuals
    document.body.className = "";
    document.body.style.background = "linear-gradient(#7dd3fc,#1e3a8a)";
    monster.style.opacity = "0";
    sub.style.opacity = "1";
    sub.style.transform = "translate(-50%,-50%)";
    sub.querySelector(".body").style.background = "#ffd84b";
    sub.querySelector(".light").style.opacity = "0";
    title.innerText = "Scene 1: Calm Waters";
    desc.innerText =
      "A small yellow submarine drifts gently through soft blue light.";
    choices.innerHTML = `<button onclick="scene2()">Dive Deeper</button>`;
    console.log("Restarted to Scene 1.");
  });
}
