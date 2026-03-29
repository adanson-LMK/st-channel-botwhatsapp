// Landing Page JavaScript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

if (cursor && ring) {
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx;
  let ry = my;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';

  document.addEventListener('mousemove', (event) => {
    mx = event.clientX;
    my = event.clientY;
  });

  function animCursor() {
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animCursor);
  }

  animCursor();
}

const bar = document.getElementById('progress-bar');
if (bar) {
  window.addEventListener('scroll', () => {
    const availableHeight = document.body.scrollHeight - window.innerHeight;
    if (availableHeight <= 0) {
      bar.style.width = '0%';
      return;
    }

    const pct = (window.scrollY / availableHeight) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  });
}

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

const mobileMenu = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-menu-overlay');
const hamburgerButton = document.getElementById('hamburger');
const closeButton = document.getElementById('mobile-menu-close');
const closeMenuLinks = document.querySelectorAll('.js-close-mobile');

function openMobile() {
  if (!mobileMenu || !mobileOverlay) return;
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeMobile() {
  if (!mobileMenu || !mobileOverlay) return;
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

if (hamburgerButton) {
  hamburgerButton.addEventListener('click', () => {
    if (!mobileMenu || !mobileOverlay) return;
    if (mobileMenu.classList.contains('open')) {
      closeMobile();
      return;
    }
    openMobile();
  });
}

if (closeButton) {
  closeButton.addEventListener('click', closeMobile);
}

if (mobileOverlay) {
  mobileOverlay.addEventListener('click', closeMobile);
}

closeMenuLinks.forEach((link) => {
  link.addEventListener('click', closeMobile);
});

const reveals = document.querySelectorAll('.reveal');

// Fallback: show all immediately if no intersection observer
const showReveal = (el) => {
  if (!el.classList.contains('visible')) {
    el.classList.add('visible');
  }
};

if (reveals.length) {
  if (!prefersReducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach((el) => io.observe(el));
  } else {
    // Reduced motion: show all immediately
    reveals.forEach((el) => el.classList.add('visible'));
  }
}

function animateCounter(el, target, duration = 1600, suffix = '') {
  let start = null;

  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target) + suffix;
    if (progress < 1) {
      requestAnimationFrame(step);
      return;
    }
    el.textContent = target + suffix;
  }

  requestAnimationFrame(step);
}

const counterEls = document.querySelectorAll('[data-target]');
if (counterEls.length) {
  if (prefersReducedMotion) {
    counterEls.forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      el.textContent = target + suffix;
    });
  } else {
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, 1600, suffix);
        counterObs.unobserve(el);
      });
    }, { threshold: 0.5 });

    counterEls.forEach((el) => counterObs.observe(el));
  }
}

const canvas = document.getElementById('particles-canvas');
if (canvas && !prefersReducedMotion) {
  const ctx = canvas.getContext('2d');
  let W;
  let H;
  const particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.r = Math.random() * 1.5 + 0.5;
      this.a = Math.random() * 0.4 + 0.1;
      this.color = Math.random() > 0.6 ? '0,240,255' : '16,185,129';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + this.color + ',' + this.a + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i += 1) {
    particles.push(new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist >= 100) continue;

        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = 'rgba(0,240,255,' + (0.06 * (1 - dist / 100)) + ')';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  function animParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    drawConnections();
    requestAnimationFrame(animParticles);
  }

  animParticles();
}

const messages = [
  { type: 'in', name: 'Carlos', text: '¿El cliente confirmó la entrega para el viernes? 📦', delay: 600 },
  { type: 'in', name: 'Maria', text: 'Sí, pero cambió la hora a las 3pm. También necesita el informe.', delay: 1800 },
  { type: 'in', name: 'Luis', text: 'Perfecto, yo me encargo 👍', delay: 1600 },
  { type: 'ai-thinking', delay: 500 },
  { type: 'ai-result', delay: 2000, tasks: [
    { icon: 'task_alt', text: 'Entrega cliente · Viernes 3PM', color: '#00F0FF' },
    { icon: 'description', text: 'Informe → Luis · Esta semana', color: '#10B981' }
  ]}
];

const chatBody = document.getElementById('chat-body');
const flowchatStatus = document.getElementById('flowchat-status');
let shown = 0;

function showNextMessage() {
  if (!chatBody || !flowchatStatus) return;

  if (shown >= messages.length) {
    setTimeout(() => { 
      chatBody.innerHTML = ''; 
      shown = 0; 
      setTimeout(runChat, 1000); 
    }, 3000);
    return;
  }
  const m = messages[shown++];
  setTimeout(() => {
    let el;
    if (m.type === 'in') {
      el = document.createElement('div');
      el.style.cssText = 'display:flex;flex-direction:column;align-self:flex-start;';
      el.innerHTML = '<span style="font-size:10px;color:rgba(255,255,255,0.35);margin-left:10px;margin-bottom:3px;">' + m.name + '</span><div class="chat-bubble bubble-in">' + m.text + '</div>';
      chatBody.appendChild(el);
      chatBody.scrollTop = chatBody.scrollHeight;
    } else if (m.type === 'ai-thinking') {
      flowchatStatus.innerHTML = '<span class="thinking-dots"><span></span><span></span><span></span></span><span style="margin-left:6px;color:rgba(0,240,255,0.8);">thinking</span>';
    } else if (m.type === 'ai-result') {
      flowchatStatus.innerHTML = '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#25d366;margin-right:4px;"></span><span style="color:#25d366;">completado</span>';
      el = document.createElement('div');
      el.className = 'bubble-ai';
      let taskHtml = '';
      m.tasks.forEach(t => { taskHtml += '<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-top:1px solid rgba(255,255,255,0.05);"><span class="material-symbols-outlined" style="font-size:14px;color:' + t.color + ';">' + t.icon + '</span><span style="font-size:12px;color:rgba(229,225,228,0.7);">' + t.text + '</span></div>'; });
      el.innerHTML = '<div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;"><div style="width:18px;height:18px;border-radius:50%;background:linear-gradient(135deg,#00f0ff,#10B981);display:flex;align-items:center;justify-content:center;"><span class="material-symbols-outlined" style="font-size:10px;color:#131315;">smart_toy</span></div><span style="font-size:11px;font-weight:700;color:rgba(0,240,255,0.8);">@Flowchat detectó:</span></div>' + taskHtml;
      chatBody.appendChild(el);
      chatBody.scrollTop = chatBody.scrollHeight;
    }
    showNextMessage();
  }, m.delay);
}

function runChat() { 
  if (!flowchatStatus) return;
  flowchatStatus.innerHTML = '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#25d366;margin-right:4px;"></span> online';
  showNextMessage(); 
}

if (chatBody && flowchatStatus) {
  setTimeout(runChat, 1200);
}
