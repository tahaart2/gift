/**
 * 404 — Missing Piece Found
 * Pure Vanilla JavaScript Application
 */

// --- Data Constants ---
const SCREENS = ['intro', 'memes', 'research', 'final'];

const BASE_MEMES = [
  {
    id: 'meme-1',
    image: '/src/assets/images/cat_bug_laptop_1794478835297.jpg',
    caption: 'When you fix one bug and discover 17 new ones.',
    tag: 'Bug Report #404',
    subtext: 'The bugs are friendly, but they do not speak python.'
  },
  {
    id: 'meme-2',
    image: '/src/assets/images/cat_sleepy_code_1794478853016.jpg',
    caption: 'Me pretending I understand the code I wrote yesterday.',
    tag: 'Git Blame',
    subtext: 'Who wrote this at 3 AM? Oh wait, it was me.'
  },
  {
    id: 'meme-3',
    image: '/src/assets/images/cat_ai_disagrees_1794478852618.jpg',
    caption: 'AI said the code is correct. The computer disagrees.',
    tag: 'SyntaxError',
    subtext: 'The compiler took personal offense to line 42.'
  }
];

const EXTRA_MEMES = [
  {
    id: 'meme-extra-1',
    image: '/src/assets/images/cat_intro_flowers_1794478833523.jpg',
    caption: 'git commit -m "fixed it for real this time i promise"',
    tag: 'Version Control',
    subtext: 'Narrator: It was not, in fact, fixed for real.'
  },
  {
    id: 'meme-extra-2',
    image: '/src/assets/images/cat_scientist_glasses_1794478834869.jpg',
    caption: 'Cat.sleep() is a critical blocking dependency.',
    tag: 'System Architecture',
    subtext: 'Cannot compile until belly rubs are delivered.'
  },
  {
    id: 'meme-extra-3',
    image: '/src/assets/images/cat_flowers_final_1794478836081.jpg',
    caption: 'Replacing 200 lines of complex logic with a single cup of tea.',
    tag: 'Refactor #99',
    subtext: 'Sometimes the best algorithm is just taking a break.'
  }
];

const ARABIC_DUA_MAIN = "اللهم اجعل بيننا خيرًا، وارزقنا حسن النية، وطيب الكلام، وجميل الأثر.";
const ARABIC_DUA_SUB = "وأسأل الله أن يكتب لنا الخير أينما كان.";

const TERMINAL_LOGS = [
  '> Searching...',
  '> Debugging...',
  '> Testing...',
  '> Searching again...',
  '> Found something interesting! ✨'
];

// --- Application State ---
let currentScreen = 'intro';
let soundEnabled = true;
let audioCtx = null;
let memeList = [...BASE_MEMES];
let extraMemeIndex = 0;
let memeLikes = {
  'meme-1': 17,
  'meme-2': 42,
  'meme-3': 99
};
let puzzleLocked = false;
let terminalTimer = null;
let terminalLogIndex = 0;
let blessingHearts = 3;

// --- Web Audio API Chimes ---
function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playChime(noteFreq = 523.25, duration = 0.8) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(noteFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(noteFreq * 1.5, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Autoplay policy or unsupported audio
  }
}

function playSuccessChime() {
  if (!soundEnabled) return;
  const notes = [440, 554.37, 659.25, 880]; // A major peaceful triad
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      playChime(freq, 1.2);
    }, idx * 120);
  });
}

function playPurrTap() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(330, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {}
}

// --- Confetti Engine (Canvas based) ---
function fireConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#F8DCE8', '#D88DAA', '#E9E2FF', '#DDEBD8', '#FFCCD5', '#B8587A'];
  const particles = [];
  const count = 50;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: canvas.width * 0.5 + (Math.random() - 0.5) * 160,
      y: canvas.height * 0.65,
      vx: (Math.random() - 0.5) * 12,
      vy: -(Math.random() * 12 + 6),
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 10
    });
  }

  let animationFrame;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeCount = 0;

    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.vx *= 0.98; // drag
      p.alpha -= 0.012; // fade out
      p.rotation += p.vRotation;

      if (p.alpha > 0) {
        activeCount++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    if (activeCount > 0) {
      animationFrame = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  render();
}

// --- Floating Petals Generator ---
function initFloatingPetals() {
  const container = document.getElementById('petalsContainer');
  if (!container) return;
  container.innerHTML = '';

  const colors = ['#F8DCE8', '#F2C2D4', '#E9E2FF', '#FFCCD5'];
  const count = 14;

  for (let i = 0; i < count; i++) {
    const left = Math.random() * 95;
    const size = 14 + Math.random() * 14;
    const duration = 10 + Math.random() * 12;
    const delay = Math.random() * 8;
    const color = colors[i % colors.length];

    const petal = document.createElement('div');
    petal.className = 'petal-particle';
    petal.style.left = `${left}%`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.3}px`;
    petal.style.color = color;

    petal.innerHTML = `
      <svg viewBox="0 0 24 32" fill="currentColor" width="100%" height="100%" style="opacity: 0.65;">
        <path d="M12 0C6 8 0 16 0 24C0 28.4 5.4 32 12 32C18.6 32 24 28.4 24 24C24 16 18 8 12 0Z" />
      </svg>
    `;

    container.appendChild(petal);
  }
}

// --- Screen Switching & Progress ---
function setScreen(screenId) {
  if (!SCREENS.includes(screenId)) return;
  currentScreen = screenId;

  // Toggle sections
  document.querySelectorAll('.screen-section').forEach((section) => {
    section.classList.remove('active');
  });
  const activeEl = document.getElementById(`screen-${screenId}`);
  if (activeEl) {
    activeEl.classList.add('active');
  }

  // Update navbar steps
  document.querySelectorAll('.step-btn').forEach((btn) => {
    if (btn.dataset.screen === screenId) {
      btn.classList.add('active');
      btn.setAttribute('aria-current', 'step');
    } else {
      btn.classList.remove('active');
      btn.removeAttribute('aria-current');
    }
  });

  // Update progress bar
  const screenIdx = SCREENS.indexOf(screenId);
  const progressPercent = Math.round(((screenIdx + 1) / SCREENS.length) * 100);
  const progressFill = document.getElementById('progressFill');
  if (progressFill) {
    progressFill.style.width = `${progressPercent}%`;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Screen specific triggers
  if (screenId === 'research') {
    startResearchTerminal();
  }
}

function nextScreen() {
  const idx = SCREENS.indexOf(currentScreen);
  if (idx < SCREENS.length - 1) {
    setScreen(SCREENS[idx + 1]);
  } else {
    setScreen(SCREENS[0]);
  }
}

function prevScreen() {
  const idx = SCREENS.indexOf(currentScreen);
  if (idx > 0) {
    setScreen(SCREENS[idx - 1]);
  } else {
    setScreen(SCREENS[0]);
  }
}

// --- Sound Controls ---
function toggleSound() {
  soundEnabled = !soundEnabled;
  updateSoundButtonUI();
  if (soundEnabled) {
    playChime(659.25, 0.4);
  }
}

function updateSoundButtonUI() {
  const btn = document.getElementById('toggleSoundBtn');
  if (!btn) return;
  if (soundEnabled) {
    btn.classList.add('sound-on');
    btn.setAttribute('title', 'Mute soothing chimes');
    btn.setAttribute('aria-label', 'Mute soothing chimes');
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
      </svg>
    `;
  } else {
    btn.classList.remove('sound-on');
    btn.setAttribute('title', 'Enable soothing chimes');
    btn.setAttribute('aria-label', 'Enable soothing chimes');
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
      </svg>
    `;
  }
}

// --- Screen 2: Memes Render & Actions ---
function renderMemes() {
  const container = document.getElementById('memeGrid');
  if (!container) return;
  container.innerHTML = '';

  const displayMemes = memeList.slice(0, 3);
  displayMemes.forEach((meme, idx) => {
    const card = document.createElement('article');
    card.className = 'meme-card';
    card.innerHTML = `
      <div class="meme-img-container">
        <img src="${meme.image}" alt="${meme.caption}">
        <span class="meme-badge-pill">Meme ${idx + 1}</span>
      </div>
      <div class="meme-body">
        <div>
          <span class="meme-tag">${meme.tag}</span>
          <p class="meme-caption">"${meme.caption}"</p>
          ${meme.subtext ? `<p class="meme-subtext">${meme.subtext}</p>` : ''}
        </div>
        <div class="meme-footer">
          <button class="meme-like-btn" data-id="${meme.id}" aria-label="Like meme: ${meme.caption}">
            <svg viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span class="like-count">${memeLikes[meme.id] || 0}</span>
          </button>
          <span class="meme-verified">100% verified</span>
        </div>
      </div>
    `;

    const likeBtn = card.querySelector('.meme-like-btn');
    likeBtn.addEventListener('click', () => {
      playPurrTap();
      memeLikes[meme.id] = (memeLikes[meme.id] || 0) + 1;
      const countEl = card.querySelector('.like-count');
      if (countEl) countEl.textContent = memeLikes[meme.id];
    });

    container.appendChild(card);
  });
}

function handleGiveAnotherCat() {
  playPurrTap();
  const nextBonus = EXTRA_MEMES[extraMemeIndex % EXTRA_MEMES.length];
  extraMemeIndex++;

  const newMeme = {
    ...nextBonus,
    id: `bonus-${Date.now()}`
  };

  memeLikes[newMeme.id] = Math.floor(Math.random() * 20) + 12;
  memeList.unshift(newMeme);
  renderMemes();
}

// --- Screen 3: Research Terminal & Puzzle Snap ---
function startResearchTerminal() {
  if (terminalTimer) clearInterval(terminalTimer);
  terminalLogIndex = 0;
  puzzleLocked = false;

  const box = document.getElementById('puzzleInteractiveBox');
  if (box) {
    box.classList.remove('locked');
    const label = box.querySelector('.puzzle-label');
    const desc = box.querySelector('.puzzle-desc');
    const hint = document.getElementById('puzzleHintText');
    if (label) label.textContent = 'CLICK TO CONNECT';
    if (desc) desc.textContent = 'Searching socket #404...';
    if (hint) hint.textContent = 'Tap the puzzle piece to snap it in!';
  }

  updateTerminalLogsView();

  terminalTimer = setInterval(() => {
    terminalLogIndex++;
    updateTerminalLogsView();

    if (terminalLogIndex >= TERMINAL_LOGS.length - 1) {
      clearInterval(terminalTimer);
      // Auto-snap puzzle after logs finish
      setTimeout(() => {
        snapPuzzle();
      }, 700);
    }
  }, 650);
}

function updateTerminalLogsView() {
  const container = document.getElementById('researchTerminalLogs');
  if (!container) return;

  let html = '';
  for (let i = 0; i <= terminalLogIndex && i < TERMINAL_LOGS.length; i++) {
    const isFinal = i === TERMINAL_LOGS.length - 1;
    html += `<p class="${isFinal ? 'term-status' : 'term-output'}">${TERMINAL_LOGS[i]}</p>`;
  }

  if (terminalLogIndex < TERMINAL_LOGS.length - 1) {
    html += `<span class="terminal-cursor"></span>`;
  }
  container.innerHTML = html;
}

function snapPuzzle() {
  if (puzzleLocked) return;
  puzzleLocked = true;
  playSuccessChime();
  fireConfetti();

  const box = document.getElementById('puzzleInteractiveBox');
  if (box) {
    box.classList.add('locked');
    const label = box.querySelector('.puzzle-label');
    const desc = box.querySelector('.puzzle-desc');
    const hint = document.getElementById('puzzleHintText');
    if (label) label.textContent = 'STATUS: SNAPPED INTO PLACE';
    if (desc) desc.textContent = 'Missing piece: FOUND ❤️';
    if (hint) hint.textContent = 'Everything fits perfectly now.';
  }
}

// --- Screen 4: Final Screen Actions ---
async function copyArabicDua() {
  playPurrTap();
  const fullText = `${ARABIC_DUA_MAIN}\n${ARABIC_DUA_SUB}`;
  const btn = document.getElementById('copyDuaBtn');

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(fullText);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = fullText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    if (btn) {
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span style="color: #059669; font-weight: 700;">Copied with care</span>
      `;
      setTimeout(() => {
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>Copy Dua</span>
        `;
      }, 2500);
    }
  } catch (err) {
    // Clipboard failed
  }
}

function handleHeartReaction() {
  playPurrTap();
  blessingHearts++;
  const countEl = document.getElementById('blessingHeartsCount');
  if (countEl) countEl.textContent = blessingHearts;
}

// --- Init Event Listeners ---
function initApp() {
  initFloatingPetals();
  updateSoundButtonUI();
  renderMemes();

  // Parse URL search params
  const params = new URLSearchParams(window.location.search);
  const screenParam = params.get('screen');
  if (params.get('autostart') === '1') {
    setScreen('memes');
  } else if (screenParam && SCREENS.includes(screenParam)) {
    setScreen(screenParam);
  } else {
    setScreen('intro');
  }

  // Navbar brand
  const brandBtn = document.getElementById('brandBtn');
  if (brandBtn) {
    brandBtn.addEventListener('click', () => {
      playPurrTap();
      setScreen('intro');
    });
  }

  // Navbar reset
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      playPurrTap();
      setScreen('intro');
    });
  }

  // Sound toggle
  const toggleSoundBtn = document.getElementById('toggleSoundBtn');
  if (toggleSoundBtn) {
    toggleSoundBtn.addEventListener('click', toggleSound);
  }

  // Navbar step buttons
  document.querySelectorAll('.step-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      playPurrTap();
      const target = btn.dataset.screen;
      if (target) setScreen(target);
    });
  });

  // Interactive cats purr tap
  document.querySelectorAll('.interactive-cat').forEach((cat) => {
    cat.addEventListener('click', playPurrTap);
  });

  // Screen 1: Intro Next
  const introNextBtn = document.getElementById('introNextBtn');
  if (introNextBtn) {
    introNextBtn.addEventListener('click', () => {
      playChime(587.33); // D5 chime
      nextScreen();
    });
  }

  // Screen 2: Memes
  const giveAnotherCatBtn = document.getElementById('giveAnotherCatBtn');
  if (giveAnotherCatBtn) {
    giveAnotherCatBtn.addEventListener('click', handleGiveAnotherCat);
  }

  const memesPrevBtn = document.getElementById('memesPrevBtn');
  if (memesPrevBtn) {
    memesPrevBtn.addEventListener('click', () => {
      playPurrTap();
      prevScreen();
    });
  }

  const memesNextBtn = document.getElementById('memesNextBtn');
  if (memesNextBtn) {
    memesNextBtn.addEventListener('click', () => {
      playChime(659.25); // E5 chime
      nextScreen();
    });
  }

  // Screen 3: Research
  const puzzleBox = document.getElementById('puzzleInteractiveBox');
  if (puzzleBox) {
    puzzleBox.addEventListener('click', () => {
      snapPuzzle();
    });
  }

  const researchPrevBtn = document.getElementById('researchPrevBtn');
  if (researchPrevBtn) {
    researchPrevBtn.addEventListener('click', () => {
      playPurrTap();
      prevScreen();
    });
  }

  const researchNextBtn = document.getElementById('researchNextBtn');
  if (researchNextBtn) {
    researchNextBtn.addEventListener('click', () => {
      playChime(783.99); // G5 chime
      nextScreen();
    });
  }

  // Screen 4: Final Screen
  const copyDuaBtn = document.getElementById('copyDuaBtn');
  if (copyDuaBtn) {
    copyDuaBtn.addEventListener('click', copyArabicDua);
  }

  const sendHeartBtn = document.getElementById('sendHeartBtn');
  if (sendHeartBtn) {
    sendHeartBtn.addEventListener('click', handleHeartReaction);
  }

  const finalPrevBtn = document.getElementById('finalPrevBtn');
  if (finalPrevBtn) {
    finalPrevBtn.addEventListener('click', () => {
      playPurrTap();
      prevScreen();
    });
  }

  const restartAllBtn = document.getElementById('restartAllBtn');
  if (restartAllBtn) {
    restartAllBtn.addEventListener('click', () => {
      playChime(523.25);
      setScreen('intro');
    });
  }

  // Keyboard navigation: Left/Right Arrow
  window.addEventListener('keydown', (e) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    if (e.key === 'ArrowRight') {
      nextScreen();
    } else if (e.key === 'ArrowLeft') {
      prevScreen();
    }
  });

  // Handle window resize for confetti canvas
  window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });
}

// Start on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
