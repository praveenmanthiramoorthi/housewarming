/* ═══════════════════════════════════════════════
   CONFIGURATION — Edit your invitation details here!
   ═══════════════════════════════════════════════ */

const CONFIG = {
  // Family & Names
  familyName:    "Dakshanamoorthi",
  names: [
    { name: "S. Dakshanamoorthi", note: "living in hearts" },
    { name: "D. Indirani" },
    { name: "D. Manthiramoorthi" },
    { name: "M. Chitra" },
    { name: "M. Pradeep" },
    { name: "M. Praveen" },
  ],

  // Welcome Screen Quote
  welcomeQuote:  "A house is made of walls and beams; a home is built with love and dreams.",

  // Event Details
  eventTitle:    "புதுமனைப் புகு விழா (Griha Pravesh)",
  eventDate:     "Sunday, 13 September 2026",
  eventTime:     "5:00 AM onwards",

  // Location
  fullAddress:   "Click below to get exact route & directions on Google Maps",
  mapsEmbedUrl:  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.5!2d77.0!3d11.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAwJzAwLjAiTiA3N8KwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  mapsShareLink: "https://maps.app.goo.gl/69Y7DMV1pFeLNuJf7",

  // Contact
  contactNumber: "[CONTACT_NUMBER]",       // WhatsApp/call number

  // Assets (paths relative to index.html)
  bgmFile:       "assets/bgm.mp3",
  familyPhoto:   "assets/family-photo.jpg",

  // Host line
  hostedBy:      "Dakshanamoorthi Family",
};


/* ═══════════════════════════════════════════════
   DOM REFERENCES
   ═══════════════════════════════════════════════ */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const welcomeSection   = $('#welcome');
const welcomeHeading   = $('#welcome-heading');
const welcomeSubtitle  = $('#welcome-subtitle');
const namesList        = $('#names-list');
const btnLight         = $('#btn-light');

const diyaOverlay      = $('#diya-overlay');

const bgmAudio         = $('#bgm');
const btnAudio         = $('#btn-audio');
const audioIconOn      = $('.audio-icon--on');
const audioIconOff     = $('.audio-icon--off');

const invitationMain   = $('#invitation');
const eventTitle       = $('#event-title');
const eventDate        = $('#event-date');
const eventTime        = $('#event-time');
const hostedBy         = $('#hosted-by');
const familyPhoto      = $('#family-photo');
const fullAddress      = $('#full-address');
const btnCalendar     = $('#btn-calendar');
const scrollIndicator = $('#scroll-indicator');


/* ═══════════════════════════════════════════════
   POPULATE CONTENT FROM CONFIG
   ═══════════════════════════════════════════════ */
function populateContent() {
  // Welcome screen
  welcomeHeading.textContent = `Our family warmly welcomes you for our housewarming`;
  welcomeSubtitle.textContent = CONFIG.welcomeQuote;

  // Names — stagger with CSS animation-delay
  CONFIG.names.forEach((entry, i) => {
    const li = document.createElement('li');
    li.classList.add('welcome__name');
    li.style.animationDelay = `${0.6 + i * 0.4}s`;

    const nameSpan = document.createElement('span');
    nameSpan.textContent = entry.name;
    li.appendChild(nameSpan);

    if (entry.note) {
      const noteSpan = document.createElement('span');
      noteSpan.classList.add('welcome__name-note');
      noteSpan.textContent = `(${entry.note})`;
      li.appendChild(noteSpan);
    }

    namesList.appendChild(li);
  });

  // Invitation card
  eventTitle.textContent = CONFIG.eventTitle;
  eventDate.textContent = CONFIG.eventDate;
  eventTime.textContent = CONFIG.eventTime;
  hostedBy.textContent = `Hosted by ${CONFIG.hostedBy}`;

  // Google Calendar URL (Sep 13, 2026 at 5:00 AM IST)
  const calendarTitle = encodeURIComponent(`${CONFIG.eventTitle} - ${CONFIG.hostedBy}`);
  const calendarDetails = encodeURIComponent(`We warmly invite you and eagerly expect your gracious presence to bless our new home!`);
  const calendarLocation = encodeURIComponent(CONFIG.fullAddress);
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calendarTitle}&dates=20260913T050000/20260913T120000&ctz=Asia/Kolkata&details=${calendarDetails}&location=${calendarLocation}`;
  btnCalendar.href = calendarUrl;

  // Photo
  familyPhoto.src = CONFIG.familyPhoto;
  familyPhoto.alt = `${CONFIG.familyName} Family`;

  // Location
  fullAddress.textContent = CONFIG.fullAddress;
  directionsLink.href = CONFIG.mapsShareLink;

  // Footer
  footerContact.innerHTML = `For queries, call/WhatsApp <a href="tel:${CONFIG.contactNumber}">${CONFIG.contactNumber}</a>`;

  // Audio
  bgmAudio.querySelector('source').src = CONFIG.bgmFile;

  // Page title
  document.title = `${CONFIG.eventTitle} — ${CONFIG.familyName} Family`;
}

/* ═══════════════════════════════════════════════
   SCROLL INDICATOR LOGIC
   ═══════════════════════════════════════════════ */
function handleScrollIndicator() {
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const bottomThreshold = document.documentElement.scrollHeight - 100;
    if (scrollPosition >= bottomThreshold) {
      scrollIndicator.classList.add('is-hidden');
    } else {
      scrollIndicator.classList.remove('is-hidden');
    }
  }, { passive: true });
}


/* ═══════════════════════════════════════════════
   DIYA LIGHTING ANIMATION FLOW
   ═══════════════════════════════════════════════ */
let animationStarted = false;

function startDiyaAnimation() {
  if (animationStarted) return;
  animationStarted = true;

  // 1. Start background music (tied to user gesture)
  startBGM();

  // 2. Show diya overlay
  diyaOverlay.classList.add('is-active');
  diyaOverlay.setAttribute('aria-hidden', 'false');

  // 3. Hide welcome screen behind overlay
  setTimeout(() => {
    welcomeSection.classList.add('is-hidden');
  }, 400);

  // 4. After animation completes (~3.2s), fade to invitation
  setTimeout(() => {
    transitionToInvitation();
  }, 3200);
}

function transitionToInvitation() {
  // Fade out diya overlay
  diyaOverlay.classList.add('is-fading');

  // Show invitation content
  invitationMain.removeAttribute('hidden');

  // Show audio toggle
  btnAudio.removeAttribute('hidden');

  // After overlay fades out, remove it from DOM flow
  setTimeout(() => {
    diyaOverlay.classList.remove('is-active', 'is-fading');
    diyaOverlay.setAttribute('aria-hidden', 'true');

    // Trigger scroll reveal for sections
    initScrollReveal();
    handleScrollIndicator();
    initPetalsAnimation();
  }, 800);
}


/* ═══════════════════════════════════════════════
   LOW-TRANSPARENCY FALLING ROSE PETALS ANIMATION
   ═══════════════════════════════════════════════ */
function initPetalsAnimation() {
  const canvas = $('#petals-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });

  // Soft low-transparency rose petal palette
  const petalColors = [
    { fill: 'rgba(229, 57, 53, ', shadow: 'rgba(198, 40, 40, ' },   // Deep rose red
    { fill: 'rgba(244, 143, 177, ', shadow: 'rgba(240, 98, 146, ' }, // Soft rose pink
    { fill: 'rgba(216, 27, 96, ', shadow: 'rgba(173, 20, 87, ' },   // Magenta rose
    { fill: 'rgba(255, 171, 145, ', shadow: 'rgba(255, 138, 101, ' },// Warm coral rose
  ];

  const totalPetals = 22; // Gentle count for performance & soft atmosphere
  const petals = [];

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = 8 + Math.random() * 10;
      this.speedY = 0.6 + Math.random() * 1.2;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.03;
      this.oscillationSpeed = 0.01 + Math.random() * 0.02;
      this.oscillationStep = Math.random() * Math.PI * 2;
      this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
      // Low transparency (0.15 - 0.35)
      this.alpha = 0.15 + Math.random() * 0.2;
    }

    update() {
      this.oscillationStep += this.oscillationSpeed;
      this.x += this.speedX + Math.sin(this.oscillationStep) * 0.8;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 20) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      // Curved organic petal path
      ctx.beginPath();
      ctx.moveTo(0, -this.size / 2);
      ctx.bezierCurveTo(this.size / 2, -this.size / 1.5, this.size, 0, 0, this.size);
      ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 1.5, 0, -this.size / 2);

      ctx.fillStyle = this.color.fill + this.alpha + ')';
      ctx.fill();

      // Subtle center vein line
      ctx.beginPath();
      ctx.moveTo(0, -this.size / 3);
      ctx.lineTo(0, this.size / 2);
      ctx.strokeStyle = this.color.shadow + (this.alpha * 0.5) + ')';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.restore();
    }
  }

  for (let i = 0; i < totalPetals; i++) {
    petals.push(new Petal());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    petals.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(render);
  }

  render();
}


/* ═══════════════════════════════════════════════
   BACKGROUND MUSIC
   ═══════════════════════════════════════════════ */
let isMuted = false;

function startBGM() {
  bgmAudio.volume = 0.35;
  bgmAudio.load();

  const playPromise = bgmAudio.play();
  if (playPromise !== undefined) {
    playPromise.catch((err) => {
      // Autoplay was prevented — this shouldn't happen since we
      // are inside a user-gesture handler, but handle gracefully.
      console.warn('Audio playback prevented:', err);
    });
  }
}

function toggleMute() {
  isMuted = !isMuted;
  bgmAudio.muted = isMuted;

  audioIconOn.style.display  = isMuted ? 'none'  : 'block';
  audioIconOff.style.display = isMuted ? 'block' : 'none';

  btnAudio.setAttribute('aria-label',
    isMuted ? 'Unmute background music' : 'Mute background music'
  );
}


/* ═══════════════════════════════════════════════
   SCROLL REVEAL (IntersectionObserver)
   ═══════════════════════════════════════════════ */
function initScrollReveal() {
  const revealTargets = [
    '.invitation__card',
    '.invitation__photo-section',
    '.location',
    '.footer',
  ];

  revealTargets.forEach((sel) => {
    const el = $(sel);
    if (el) el.classList.add('reveal');
  });

  // Small delay to ensure elements are in DOM and have the .reveal class
  requestAnimationFrame(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    $$('.reveal').forEach((el) => observer.observe(el));
  });
}


/* ═══════════════════════════════════════════════
   EVENT LISTENERS
   ═══════════════════════════════════════════════ */
btnLight.addEventListener('click', startDiyaAnimation);
btnAudio.addEventListener('click', toggleMute);

// Also handle touch for iOS Safari reliability
btnLight.addEventListener('touchend', (e) => {
  e.preventDefault();
  startDiyaAnimation();
});


/* ═══════════════════════════════════════════════
   INITIALISE
   ═══════════════════════════════════════════════ */
populateContent();
