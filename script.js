// ============================================================
// VALENTINE WEBSITE – Interactive Script
// ============================================================

// --- Floating Hearts Background ---
function createFloatingHearts() {
  const container = document.getElementById('heartsBg');
  const heartEmojis = ['💕', '💗', '💖', '💓', '💞', '💘', '❤️', '🩷', '🤍', '✨'];

  function spawnHeart() {
    const heart = document.createElement('span');
    heart.classList.add('floating-heart');
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (14 + Math.random() * 24) + 'px';
    heart.style.animationDuration = (6 + Math.random() * 8) + 's';
    heart.style.animationDelay = '0s';
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 14000);
  }

  // Initial burst
  for (let i = 0; i < 15; i++) {
    setTimeout(spawnHeart, i * 300);
  }

  // Continuous spawning
  setInterval(spawnHeart, 800);
}

// --- Sparkles on Card ---
function createSparkles() {
  const card = document.getElementById('card');
  for (let i = 0; i < 6; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.animationDelay = (Math.random() * 3) + 's';
    sparkle.style.width = (3 + Math.random() * 4) + 'px';
    sparkle.style.height = sparkle.style.width;
    card.appendChild(sparkle);
  }
}

// --- Escaping "No" Button Logic ---
let escapeCount = 0;
let celebrated = false;

const teaseMessages = [
  "You can't say no! 😏",
  "Try again... if you can! 😜",
  "Haha, nice try! 💕",
  "Catch me if you can! 🏃‍♂️",
  "Come onnn, just say YES! 🥺",
  "Too slow! 😘",
  "Accept your destiny! 💘",
  "Resistance is futile! 💖",
  "The answer is clearly YES! 🎀",
  "Stop chasing, just say YES! 😍"
];

function repositionNo() {
  if (celebrated) return;

  const btn = document.getElementById('btnNo');
  const card = document.getElementById('card');
  const noMsg = document.getElementById('noMsg');
  const bearMouth = document.getElementById('bearMouth');

  escapeCount++;

  // Make it fixed-positioned on first escape
  if (!btn.classList.contains('orbiting')) {
    btn.classList.add('orbiting');
  }

  // Bear goes sad
  bearMouth.classList.add('sad');
  bearMouth.classList.remove('happy');
  setTimeout(() => bearMouth.classList.remove('sad'), 1500);

  // Tease message
  noMsg.textContent = teaseMessages[escapeCount % teaseMessages.length];
  noMsg.classList.add('visible');
  setTimeout(() => noMsg.classList.remove('visible'), 2000);

  // Grow the Yes button
  const yesBtn = document.getElementById('btnYes');
  const scale = 1 + Math.min(escapeCount * 0.03, 0.35);
  yesBtn.style.transform = `scale(${scale})`;

  // Pick a random spot around the card edges
  const cardRect = card.getBoundingClientRect();
  const btnW = btn.offsetWidth;
  const btnH = btn.offsetHeight;
  const gap = 12; // gap between card edge and button

  // 4 possible zones: top, bottom, left, right of the card
  const side = Math.floor(Math.random() * 4);
  let x, y;

  switch (side) {
    case 0: // top
      x = cardRect.left + Math.random() * (cardRect.width - btnW);
      y = cardRect.top - btnH - gap;
      break;
    case 1: // bottom
      x = cardRect.left + Math.random() * (cardRect.width - btnW);
      y = cardRect.bottom + gap;
      break;
    case 2: // left
      x = cardRect.left - btnW - gap;
      y = cardRect.top + Math.random() * (cardRect.height - btnH);
      break;
    case 3: // right
      x = cardRect.right + gap;
      y = cardRect.top + Math.random() * (cardRect.height - btnH);
      break;
  }

  // Clamp to viewport
  x = Math.max(8, Math.min(x, window.innerWidth - btnW - 8));
  y = Math.max(8, Math.min(y, window.innerHeight - btnH - 8));

  btn.style.left = x + 'px';
  btn.style.top = y + 'px';
}

// Prevent any click on No
function blockNo(e) {
  e.preventDefault();
  e.stopPropagation();
  repositionNo();
  return false;
}

// --- Say Yes! ---
function sayYes() {
  celebrated = true;

  const bearMouth = document.getElementById('bearMouth');
  bearMouth.classList.add('happy');
  bearMouth.classList.remove('sad');

  // Hide the No button
  const btn = document.getElementById('btnNo');
  btn.style.display = 'none';

  // Show celebration
  setTimeout(() => {
    const celebration = document.getElementById('celebration');
    celebration.classList.add('active');
    createConfetti();
    createCelebrationHearts();
  }, 300);
}

// --- Confetti Effect ---
function createConfetti() {
  const container = document.getElementById('confetti');
  const colors = ['#ff3366', '#ff6699', '#ff99bb', '#ffccdd', '#ff0044', '#ffaacc', '#ff77aa', '#ffffff', '#ffd4e5'];
  const shapes = ['❤️', '💕', '💖', '✨', '🌟', '💗', '🎀'];

  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const piece = document.createElement('div');
      piece.classList.add('confetti-piece');

      if (Math.random() > 0.5) {
        piece.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        piece.style.fontSize = (12 + Math.random() * 16) + 'px';
      } else {
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        piece.style.width = (6 + Math.random() * 10) + 'px';
        piece.style.height = piece.style.width;
      }

      piece.style.left = Math.random() * 100 + '%';
      piece.style.animationDuration = (2 + Math.random() * 3) + 's';
      piece.style.animationDelay = '0s';
      container.appendChild(piece);
      setTimeout(() => piece.remove(), 5000);
    }, i * 50);
  }
}

// --- Extra celebration hearts ---
function createCelebrationHearts() {
  const container = document.getElementById('confetti');
  function burst() {
    for (let i = 0; i < 5; i++) {
      const heart = document.createElement('span');
      heart.classList.add('floating-heart');
      heart.textContent = ['💖', '💕', '💗', '❤️', '💘'][i % 5];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.fontSize = (20 + Math.random() * 20) + 'px';
      heart.style.animationDuration = (4 + Math.random() * 4) + 's';
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 8000);
    }
  }
  burst();
  const intervalId = setInterval(burst, 2000);
  setTimeout(() => clearInterval(intervalId), 20000);
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  createFloatingHearts();
  createSparkles();

  const btnNo = document.getElementById('btnNo');
  btnNo.addEventListener('mouseover', repositionNo);
  btnNo.addEventListener('click', blockNo);
  btnNo.addEventListener('mousedown', blockNo);
  btnNo.addEventListener('touchstart', blockNo);
});
