const header = document.querySelector(".header");
const yes = document.querySelector(".yes-button");
const no = document.querySelector(".no-button");
const excitedFrog = document.querySelector(".excited-frog");
const envelope = document.querySelector('.envelope-wrapper');
const giftCards = document.querySelectorAll(".flip-container");

// For button movement
if (no) {
    const avoidanceRadius = 150;
    const moveSpeed = 50;

    document.addEventListener("mousemove", (event) => {
        // Get cursor position
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        
        const elementRect = no.getBoundingClientRect();
        const elementX = elementRect.left + elementRect.width / 2;
        const elementY = elementRect.top + elementRect.height / 2;

        const deltaX = mouseX - elementX;
        const deltaY = mouseY - elementY;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Move button if cursor is within the avoidance radius
        if (distance < avoidanceRadius) {
            // Calculate the direction away from the cursor
            const directionX = -deltaX / distance;
            const directionY = -deltaY / distance;

            // Calculate the new position
            const newX = elementRect.left + directionX * moveSpeed;
            const newY = elementRect.top + directionY * moveSpeed;

            // Apply new position
            if (newX > 0 && newX + elementRect.width < window.innerWidth && newY > 0 && newY + 
                elementRect.height < window.innerHeight) {
                    no.style.left = newX + 'px';
                    no.style.top = newY + 'px';
            }
        }
    });
}

if (yes) {
    yes.addEventListener("click", ()=> {
        header.remove();
        yes.remove();
        no.remove();
    });
}

if (yes && excitedFrog) {
    yes.addEventListener("mouseenter", () => {
        excitedFrog.style.visibility = "visible";
        excitedFrog.style.opacity = "1";
    });

    yes.addEventListener("mouseleave", () => {
        excitedFrog.style.opacity = "0";
        setTimeout(() => {
            excitedFrog.style.visibility = "hidden";
        }, 500);
    });
}

if (envelope) {
    envelope.addEventListener('click', () => {
        envelope.classList.toggle('flap');
    });
}

// -------------------- Gifts page: flip + sparkle sound --------------------
const giftClickSound = document.getElementById("giftClickSound");

if (giftCards.length) {
  giftCards.forEach((card) => {
    card.addEventListener("click", () => {
      // flip card
      card.classList.toggle("flipped");

      // sparkle sound
      if (giftClickSound) {
        giftClickSound.currentTime = 0;
        giftClickSound.volume = 0.6;
        giftClickSound.play().catch(() => {});
      }
    });
  });
}


// -------------------- No screen: page load sounds (boo + foghorn + buzzer) --------------------
window.addEventListener("DOMContentLoaded", async () => {
  const boo = document.getElementById("booSound");
  const horn = document.getElementById("hornSound");
  const buzzer = document.getElementById("buzzerSound");

  let played = false;

  if (boo) {
    boo.volume = 0.45;
    boo.currentTime = 0;
    try {
      await boo.play();
      played = true;
    } catch {}
  }

  if (horn) {
    horn.volume = 0.7;
    horn.currentTime = 0;
    try {
      await horn.play();
      played = true;
    } catch {}
  }

  if (buzzer) {
    buzzer.volume = 0.6;
    buzzer.currentTime = 0;
    try {
      await buzzer.play();
      played = true;
    } catch {}
  }

  // 🔓 unlock hover audio if ANY sound played
  if (played && typeof audioUnlocked !== "undefined") {
    audioUnlocked = true;
  }
});




// -------------------- Hover sounds for Yes / No --------------------
const yesButton = document.querySelector(".yes-button");
const noButton = document.querySelector(".no-button");

const yesSound = document.getElementById("yesHoverSound");
const noSound = document.getElementById("noHoverSound");

let audioUnlocked = false;

// Browser requires a user interaction first
document.addEventListener("click", () => {
  audioUnlocked = true;
}, { once: true });

function playHoverSound(audio, volume = 0.6) {
  if (!audioUnlocked || !audio) return;

  audio.pause();            // stop if already playing
  audio.currentTime = 0;    // restart cleanly
  audio.volume = volume;

  audio.play().catch(() => {});
}

if (yesButton) {
  yesButton.addEventListener("mouseenter", () => {
    playHoverSound(yesSound, 0.7);
  });
}

if (noButton) {
  noButton.addEventListener("mouseenter", () => {
    playHoverSound(noSound, 0.7);
  });
}

// -------------------- Frog hover sound --------------------
const frog = document.querySelector(".heart-frog");
const frogSound = document.getElementById("frogHoverSound");

if (frog) {
  frog.addEventListener("mouseenter", () => {
    playHoverSound(frogSound, 0.6); // use the function you actually have
  });

  frog.addEventListener("mouseleave", () => {
    if (!frogSound) return;
    frogSound.pause();
    frogSound.currentTime = 0;
  });
}

// -------------------- Despair hover sound --------------------
const despairImg = document.querySelector(".despair");
const despairSound = document.getElementById("despairHoverSound");

if (despairImg) {
  despairImg.addEventListener("mouseenter", () => {
    playHoverSound(despairSound, 0.6);
  });

  despairImg.addEventListener("mouseleave", () => {
    if (!despairSound) return;
    despairSound.pause();
    despairSound.currentTime = 0;
  });
}

// -------------------- Sad frog hover sound --------------------
const sadFrogs = document.querySelectorAll(".sad-frog");
const bruhSound = document.getElementById("frogHoverSoundNoScreen");

if (sadFrogs.length) {
  sadFrogs.forEach((frog) => {
    frog.addEventListener("mouseenter", () => {
      playHoverSound(bruhSound, 0.6);
    });

    frog.addEventListener("mouseleave", () => {
      if (!bruhSound) return;
      bruhSound.pause();
      bruhSound.currentTime = 0;
    });
  });
}

// -------------------- Yes screen: play 3 sounds on load --------------------
window.addEventListener("DOMContentLoaded", async () => {
  const sfx1 = document.getElementById("yesSfx1"); // crowdpop
  const sfx2 = document.getElementById("yesSfx2"); // horn
  const music = document.getElementById("yesMusic"); // jellyfishjam

  // Only run on yes screen (if the elements exist)
  if (!sfx1 && !sfx2 && !music) return;

  let playedSomething = false;

  if (sfx1) {
    sfx1.volume = 0.7;
    sfx1.currentTime = 0;
    try { await sfx1.play(); playedSomething = true; } catch {}
  }

  if (sfx2) {
    sfx2.volume = 0.7;
    sfx2.currentTime = 0;
    try { await sfx2.play(); playedSomething = true; } catch {}
  }

  if (music) {
    music.volume = 0.35;
    music.currentTime = 0;
    try { await music.play(); playedSomething = true; } catch {}
  }

  // If you’re using audioUnlocked gating for hover sounds elsewhere:
  if (typeof audioUnlocked !== "undefined" && playedSomething) {
    audioUnlocked = true;
  }
});

// -------------------- Woo sound on WOOOOOOHOOOOOO hover --------------------
const wooBox = document.querySelector(".yes-header-container");
const wooSound = document.getElementById("wooHoverSound");

if (wooBox) {
  wooBox.addEventListener("mouseenter", () => {
    playHoverSound(wooSound, 0.7);
  });

  wooBox.addEventListener("mouseleave", () => {
    if (!wooSound) return;
    wooSound.pause();
    wooSound.currentTime = 0;
  });
}

// -------------------- Photos page: aww sound on load --------------------
window.addEventListener("DOMContentLoaded", async () => {
  const aww = document.getElementById("awwSound");
  if (!aww) return;

  aww.volume = 0.6;
  aww.currentTime = 0;

  try {
    await aww.play();
    // unlock hover audio if you’re using audioUnlocked elsewhere
    if (typeof audioUnlocked !== "undefined") {
      audioUnlocked = true;
    }
  } catch {
    // autoplay blocked if page wasn't reached by click (normal)
  }
});

// -------------------- Kicking screen: sideeye sound --------------------
window.addEventListener("DOMContentLoaded", async () => {
  const sideeye = document.getElementById("sideeyeSound");
  const kickingImg = document.querySelector(".kicking-feet");

  if (!sideeye) return;

  // 🔊 play on page load
  sideeye.volume = 0.6;
  sideeye.currentTime = 0;

  try {
    await sideeye.play();
    if (typeof audioUnlocked !== "undefined") {
      audioUnlocked = true; // unlock hover sounds
    }
  } catch {
    // autoplay blocked if page wasn't reached via click
  }

  // 🐸 play on hover
  if (kickingImg) {
    kickingImg.addEventListener("mouseenter", () => {
      playHoverSound(sideeye, 0.6);
    });

    kickingImg.addEventListener("mouseleave", () => {
      sideeye.pause();
      sideeye.currentTime = 0;
    });
  }
});

// -------------------- Letter page: open letter sound --------------------
const envelopeWrapper = document.querySelector(".letter-page .envelope-wrapper");
const openLetterSound = document.getElementById("openLetterSound");

if (envelopeWrapper && openLetterSound) {
  envelopeWrapper.addEventListener("click", () => {
    // play sound when letter opens
    openLetterSound.volume = 0.6;
    openLetterSound.currentTime = 0;
    openLetterSound.play().catch(() => {});
  });
}

// -------------------- Gifts page: fart sound on hover --------------------
const giftFartSound = document.getElementById("giftHoverSound");

if (giftCards.length && giftFartSound) {
  giftCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      playHoverSound(giftFartSound, 0.6);
    });

    card.addEventListener("mouseleave", () => {
      giftFartSound.pause();
      giftFartSound.currentTime = 0;
    });
  });
}

// -------------------- Gifts page: unlock hover audio on load --------------------
window.addEventListener("DOMContentLoaded", () => {
  const giftHoverSound = document.getElementById("giftHoverSound");

  if (giftHoverSound && typeof audioUnlocked !== "undefined") {
    audioUnlocked = true;
  }
});

// -------------------- YES screen: beat-synced lasers --------------------
(function initYesLasers() {
  const musicEl = document.getElementById("yesMusic");
  const canvas = document.getElementById("laserCanvas");
  if (!musicEl || !canvas) return; // only runs on yesScreen.html

  const ctx = canvas.getContext("2d");
  let w = 0, h = 0, dpr = 1;

  function resize() {
    dpr = Math.max(1, window.devicePixelRatio || 1);
    w = Math.floor(window.innerWidth);
    h = Math.floor(window.innerHeight);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  // Beat analyser
  let audioCtx = null;
  let analyser = null;
  let data = null;
  let sourceNode = null;

  function setupAnalyser() {
    if (audioCtx) return; // already done
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.85;

    sourceNode = audioCtx.createMediaElementSource(musicEl);
    sourceNode.connect(analyser);
    analyser.connect(audioCtx.destination);

    data = new Uint8Array(analyser.frequencyBinCount);
  }

  // “Unlock” analyser on first user gesture (browser rule)
  function unlock() {
    try {
      setupAnalyser();
      if (audioCtx.state === "suspended") audioCtx.resume();
    } catch {}
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
  }
  window.addEventListener("pointerdown", unlock, { once: true });
  window.addEventListener("keydown", unlock, { once: true });

  // Lasers
  const COLORS = [
    "#ff4aae", "#f1a8ff", "#00e5ff", "#7CFF6B", "#FFD166",
    "#9B5DE5", "#F15BB5", "#00BBF9", "#00F5D4", "#FEE440"
  ];

  function rand(min, max) { return min + Math.random() * (max - min); }

  const beams = Array.from({ length: 18 }, () => ({
    x: rand(0, w),
    y: rand(0, h),
    vx: rand(-6, 6),
    vy: rand(-6, 6),
    color: COLORS[(Math.random() * COLORS.length) | 0],
    width: rand(1.5, 3.5),
    life: rand(0.6, 1.0)
  }));

  // Beat energy -> intensity
  function getEnergy() {
    if (!analyser || !data) return 0.25;
    analyser.getByteFrequencyData(data);

    // Use bass + low-mids for “beat”
    let sum = 0;
    const start = 2;
    const end = Math.min(60, data.length);
    for (let i = start; i < end; i++) sum += data[i];
    const avg = sum / (end - start) / 255; // 0..1
    return Math.max(0.1, Math.min(1.0, avg));
  }

  let last = performance.now();

  function tick(now) {
    const dt = Math.min(0.033, (now - last) / 1000);
    last = now;

    const energy = getEnergy();          // 0..1
    const speedBoost = 0.6 + energy * 2; // beat -> faster
    const glow = 10 + energy * 40;       // beat -> brighter

    // subtle trail fade
    ctx.fillStyle = `rgba(0,0,0,${0.08 - energy * 0.03})`;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.globalCompositeOperation = "screen";

    for (const b of beams) {
      b.x += b.vx * speedBoost;
      b.y += b.vy * speedBoost;

      // bounce off edges
      if (b.x < 0) { b.x = 0; b.vx *= -1; }
      if (b.x > w) { b.x = w; b.vx *= -1; }
      if (b.y < 0) { b.y = 0; b.vy *= -1; }
      if (b.y > h) { b.y = h; b.vy *= -1; }

      // draw beam
      const len = 120 + energy * 420;
      const angle = Math.atan2(b.vy, b.vx);
      const x2 = b.x + Math.cos(angle) * len;
      const y2 = b.y + Math.sin(angle) * len;

      ctx.lineCap = "round";
      ctx.strokeStyle = b.color;
      ctx.lineWidth = b.width + energy * 2;

      ctx.shadowColor = b.color;
      ctx.shadowBlur = glow;

      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // occasional color swap on strong beats
      if (energy > 0.55 && Math.random() < 0.03) {
        b.color = COLORS[(Math.random() * COLORS.length) | 0];
      }
    }

    ctx.restore();
    requestAnimationFrame(tick);
  }

  // start with a clear frame
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.fillRect(0, 0, w, h);
  requestAnimationFrame(tick);
})();
