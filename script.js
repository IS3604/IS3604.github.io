/* ============================================================
   ISHPREET SINGH — PORTFOLIO JAVASCRIPT
   ============================================================ */

/* ── 1. ANIMATED PARTICLE CANVAS BACKGROUND ── */
(function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(true); }

    reset(init) {
      this.x     = Math.random() * W;
      this.y     = init ? Math.random() * H : (Math.random() < 0.5 ? -5 : H + 5);
      this.vx    = (Math.random() - 0.5) * 0.25;
      this.vy    = (Math.random() - 0.5) * 0.25;
      this.size  = Math.random() * 1.5 + 0.4;
      this.alpha = Math.random() * 0.35 + 0.08;
    }

    update() {
      this.x += this.vx;
      this.vy += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) {
        this.reset(false);
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(96, 165, 250, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 100; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(96, 165, 250, ${0.07 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    drawLines();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  })();
})();


/* ── 2. STICKY NAV — darken on scroll ── */
(function initNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
})();


/* ── 3. HERO STAT COUNTER ANIMATION ── */
(function initCounters() {
  const statsEl = document.querySelector('.hero-stats');
  if (!statsEl) return;

  function countUp(el, target, suffix) {
    let value    = 0;
    const step   = target / 55;
    const timer  = setInterval(() => {
      value += step;
      if (value >= target) {
        value = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(value) + suffix;
    }, 22);
  }

  let counted = false;
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      document.querySelectorAll('.hero-stat-num').forEach(el => {
        countUp(el, parseInt(el.dataset.target, 10), el.dataset.suffix || '');
      });
    }
  });

  observer.observe(statsEl);
})();


/* ── 4. SCROLL REVEAL ── */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.sr');
  if (!elements.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
})();


/* ── 5. SUBTLE MOUSE PARALLAX ON HERO NAME ── */
(function initParallax() {
  const heroName = document.querySelector('.hero-name');
  if (!heroName) return;

  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 8;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    heroName.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
})();


/* ── 6. SMOOTH ANCHOR SCROLL (fallback for older browsers) ── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();