const noBtn = document.getElementById("no");
const maybeBtn = document.getElementById("maybe");
const yesBtn = document.getElementById("yes");
const container = document.querySelector(".container");
const letter = document.getElementById("letter");
const song = document.getElementById("song");
const popSound = document.getElementById("popSound");
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const yesText = document.getElementById("yesText");

/* Move button safely inside screen */
 function moveInsideScreen(btn) {
  const padding = 40;
  const rect = btn.getBoundingClientRect();

  // currfunctionent position
  const currentX = rect.left;
  const currentY = rect.top;

  // gentle movement distance (not whole screen)
  const moveX = (Math.random() > 0.5 ? 1 : -1) * (80 + Math.random() * 60);
  const moveY = (Math.random() > 0.5 ? 1 : -1) * (60 + Math.random() * 50);

  let targetX = currentX + moveX;
  let targetY = currentY + moveY;

  // clamp inside screen
  targetX = Math.max(
    padding,
    Math.min(window.innerWidth - rect.width - padding, targetX)
  );
  targetY = Math.max(
    padding,
    Math.min(window.innerHeight - rect.height - padding, targetY)
  );

  btn.style.transform = `translate(${targetX - rect.left}px, ${targetY - rect.top}px)`;

  // tease text
  tease.style.left = targetX + rect.width / 2 + "px";
  tease.style.top = targetY - 30 + "px";
  tease.style.opacity = 1;

  clearTimeout(tease.hideTimeout);
  tease.hideTimeout = setTimeout(() => {
    tease.style.opacity = 0;
  }, 900);
}


/* Run ONLY on interaction, then stop */
["mouseover", "touchstart"].forEach(evt => {
  noBtn.addEventListener(evt, () => moveInsideScreen(noBtn));
  maybeBtn.addEventListener(evt, () => moveInsideScreen(maybeBtn));
});

/* YES action */
yesBtn.addEventListener("click", () => {
  popSound.currentTime = 0;
  popSound.play();

  // Fade out card 1
  card1.classList.add("fade-out");

  setTimeout(() => {
    song.play();

    // Hide card 1
    card1.style.display = "none";

    // Show card 2
    card2.style.display = "block";
    card2.classList.add("active", "fade-in");

    // Glow
    container.classList.add("final-glow");

    // Animate YES text
    setTimeout(() => {
      yesText.classList.add("show");
      sparkleBurst();

    }, 300);

  }, 600);
});
/* 🌸 Cute floating flowers & love */
const cuteIcons = ["🌸", "🌼", "💖", "💕", "💐"];

function createCuteFloat() {
  const el = document.createElement("div");
  el.className = "floating";
  el.innerText = cuteIcons[Math.floor(Math.random() * cuteIcons.length)];

  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = Math.random() * 10 + 26 + "px";

  el.style.animationDuration = Math.random() * 6 + 8 + "s";

  document.body.appendChild(el);

  setTimeout(() => el.remove(), 14000);
}

setInterval(createCuteFloat, 200);
function sparkleBurst() {
  const container = document.getElementById("sparkles");
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";

    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 80;

    s.style.left = "50%";
    s.style.top = "22%"; // behind YES text
    s.style.setProperty("--x", Math.cos(angle) * distance + "px");
    s.style.setProperty("--y", Math.sin(angle) * distance + "px");

    container.appendChild(s);
    setTimeout(() => s.remove(), 1600);
  }
}


