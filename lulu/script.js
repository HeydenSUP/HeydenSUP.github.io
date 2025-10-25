//Global variables for DOM elements
let sub, monster, title, desc, transition, choices, sceneDiv;

// INITIALIZATION
window.onload = function () {
  try {
    sub = document.getElementById("submarine"); // submarine element
    monster = document.getElementById("monster"); // monster shape element
    title = document.getElementById("sceneTitle"); // scene title text
    desc = document.getElementById("sceneDesc"); // scene description text
    transition = document.getElementById("transition"); // overlay for fades
    choices = document.getElementById("choices"); // container for buttons
    sceneDiv = document.getElementById("scene"); // overall scene area
    console.log("Scene 1 ready: Calm Waters initialized successfully.");
  } catch (err) {
    console.error("Initialization Error:", err.message); // logs if missing element
  }
};

// Helper Function: Smooth Scene Fade
function sceneTransition(callback) {
  transition.style.opacity = "1"; // fade to black
  setTimeout(() => {
    callback(); // run next scene function
    transition.style.opacity = "0"; // fade back to visible
  }, 1200);
}

// SCENE 1 → SCENE 2
// Triggered by clicking “Dive Deeper”

function scene2() {
  sceneTransition(() => {
    document.body.className = "scene2"; // apply CSS for deep sea
    document.body.style.background = "linear-gradient(#0c4a6e, #001a33)"; // dark blue gradient

    title.innerText = "Scene 2: Deeper Waters"; // update heading
    desc.innerText =
      "The submarine descends into the darkness. Something stirs below…"; // description

    sub.className = "diveAnim"; // play CSS dive animation
    sub.querySelector(".light").style.opacity = "1"; // show headlight
    monster.style.opacity = "1"; // reveal monster silhouette
    spawnBubbles(30); // add moving bubbles

    // create interactive buttons
    choices.innerHTML = `
      <button onclick="stayStill()">Stay Still</button>
      <button onclick="breakThrough()">Break Through</button>
      <button onclick="escapeAway()">Escape Away</button>
    `;
  });
}

// Spawn bubbles for background movement

function spawnBubbles(count) {
  for (let i = 0; i < count; i++) {
    const b = document.createElement("div"); // create bubble div
    b.className = "bubble"; // attach CSS animation
    const size = Math.random() * 10 + 5; // bubble size range
    b.style.width = b.style.height = size + "px";
    b.style.left = Math.random() * 100 + "vw"; // random position
    b.style.animationDuration = 4 + Math.random() * 3 + "s"; // speed
    b.style.animationDelay = Math.random() * 5 + "s"; // delay
    sceneDiv.appendChild(b);
    setTimeout(() => b.remove(), 8000); // remove after animation
  }
}

// CHOICE 1 — STAY STILL
// Submarine freezes, gets crushed, shatters into fragments

function stayStill() {
  sceneTransition(() => {
    document.body.style.background = "linear-gradient(#000000,#0f172a)"; // dark abyss
    monster.style.opacity = "0.9"; // make monster more visible
    title.innerText = "Ending : Crushed by the Deep"; // ending title
    desc.innerText =
      "You freeze. The monster wraps around the hull. A final creak—then silence."; // ending text

    sub.style.opacity = "0"; // hide submarine

    // generate fragments
    for (let i = 0; i < 8; i++) {
      const frag = document.createElement("div");
      frag.className = "subFragment";
      frag.style.left = "50%";
      frag.style.top = "50%";
      frag.style.background = "#ffd84b"; // yellow
      frag.style.width = Math.random() * 20 + 10 + "px";
      frag.style.height = Math.random() * 10 + 5 + "px";
      frag.style.position = "absolute";
      frag.style.borderRadius = "3px";
      frag.style.transform = "translate(-50%, -50%)";
      sceneDiv.appendChild(frag);

      // animate scattering
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
      setTimeout(() => frag.remove(), 4000); // cleanup
    }

    // restart button
    choices.innerHTML = `<button onclick="restartJourney()">Restart Journey</button>`;
  });
}
// CHOICE 2 — BREAK THROUGH
// Submarine shakes vertically, background flipped (yellow top)
function breakThrough() {
  sceneTransition(() => {
    monster.style.opacity = "0"; // monster disappears
    document.body.style.background = "linear-gradient(#fcd34d, #2563eb)"; // yellow top, blue bottom
    title.innerText = "Ending : Toward the Dawn"; // title update
    desc.innerText =
      "You surge forward, shaking violently, bursting through the barrier into light!"; // text

    // vertical shaking motion
    sub.animate(
      [
        { transform: "translate(-50%, -50%)" },
        { transform: "translate(-50%, -55%)" },
        { transform: "translate(-50%, -50%)" },
      ],
      { duration: 300, iterations: 10, easing: "ease-in-out" }
    );

    spawnBubbles(40); // additional bubbles
    choices.innerHTML = `<button onclick="restartJourney()">Restart Journey</button>`; // restart
  });
}

// CHOICE 3 — ESCAPE AWAY
// Step 1: Sub flips horizontally
// Step 2: Sub flees left and fades into darkness

function escapeAway() {
  sceneTransition(() => {
    monster.style.opacity = "0.3"; // dim monster
    document.body.style.background = "linear-gradient(#001b2e,#000)"; // dark blue
    title.innerText = "Scene 3: Turning Away"; // temporary text
    desc.innerText = "You turn the submarine around, fleeing into the dark."; // description

    sub.style.transition = "transform 1s ease"; // smooth flip
    sub.style.transform = "translate(-50%,-50%) scaleX(-1)"; // flip horizontally

    // after flipping, make it flee
    setTimeout(() => {
      sub.animate(
        [
          { transform: "translate(-50%, -50%) scaleX(-1)" },
          { transform: "translate(-150%, -40%) scaleX(-1)" },
        ],
        { duration: 3000, fill: "forwards", easing: "ease-in" }
      );

      title.innerText = "Ending : The Silent Sea"; // final title
      desc.innerText =
        "Engines strain… then fade. The submarine drifts downward into endless quiet."; // ending desc
      setTimeout(() => {
        document.body.style.background = "linear-gradient(#000814,#000)"; // fade to black
      }, 2000);

      choices.innerHTML = `<button onclick="restartJourney()">Restart Journey</button>`; // restart
    }, 1200);
  });
}

// RESTART JOURNEY — Reset everything to Scene 1

function restartJourney() {
  sceneTransition(() => {
    document.body.className = ""; // clear scene styles
    document.body.style.background = "linear-gradient(#7dd3fc,#1e3a8a)"; // calm blue

    monster.style.opacity = "0"; // hide monster
    sub.style.opacity = "1"; // make sub visible
    sub.style.transform = "translate(-50%,-50%)"; // reset position
    sub.querySelector(".body").style.background = "#ffd84b"; // restore yellow
    sub.querySelector(".light").style.opacity = "0"; // turn off light

    title.innerText = "Scene 1: Calm Waters"; // reset title
    desc.innerText =
      "A small yellow submarine drifts gently through soft blue light."; // reset desc

    choices.innerHTML = `<button onclick="scene2()">Dive Deeper</button>`; // restart button
    console.log("Restarted to Scene 1 successfully."); // console feedback
  });
}
