/* ═══════════════════════════════════════════════════
   AURA SIGNS — Main JS
   GSAP animations · Spotlight reveal · Bubble menu
═══════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────────── 1. HERO ENTRANCE ── */
window.addEventListener('DOMContentLoaded', () => {

  // Stagger hero content in
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 1, delay: 0.3 })
    .to('.hero-headline',  { opacity: 1, y: 0, duration: 1.2 }, '-=0.7')
    .to('.hero-ctas',      { opacity: 1, y: 0, duration: 0.9 }, '-=0.8');

  /* ─────────────────── 2. SPOTLIGHT REVEAL (SVG mask) ── */
  const svg      = document.getElementById('spotlight-svg');
  const circle   = document.getElementById('spotCircle');
  const heroWrap = document.getElementById('spotlight-wrap');
  const trail    = document.getElementById('cursor-trail');

  if (heroWrap && circle) {
    let mx = -500, my = -500;
    let cx = -500, cy = -500;
    let dots = [];

    // Trailing cursor circles
    function spawnDot(x, y) {
      const dot = document.createElement('div');
      dot.className = 'trail-dot';
      const size = Math.random() * 60 + 30;
      dot.style.cssText = `
        left: ${x}px; top: ${y}px;
        width: ${size}px; height: ${size}px;
        opacity: 0.6;
      `;
      trail.appendChild(dot);
      dots.push(dot);

      gsap.to(dot, {
        opacity: 0,
        scale: 2,
        duration: 1.4,
        ease: 'power2.out',
        onComplete: () => { dot.remove(); dots = dots.filter(d => d !== dot); }
      });
    }

    let lastDotTime = 0;
    heroWrap.addEventListener('mousemove', (e) => {
      const rect = heroWrap.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;

      const now = Date.now();
      if (now - lastDotTime > 60) {
        spawnDot(mx, my);
        lastDotTime = now;
      }
    });

    // Smooth follow
    gsap.ticker.add(() => {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
    });
  }

  /* ─────────────────────────── 3. BUBBLE MENU ── */
  const trigger = document.getElementById('bubbleTrigger');
  const pill    = document.getElementById('bubblePill');

  if (trigger && pill) {
    let isOpen = false;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      isOpen = !isOpen;
      pill.classList.toggle('open', isOpen);

      gsap.to(trigger.querySelectorAll('span'), {
        stagger: 0.05,
        y: isOpen ? [4, 0, -4] : [0, 0, 0],
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    document.addEventListener('click', (e) => {
      if (!document.getElementById('bubbleMenu').contains(e.target)) {
        isOpen = false;
        pill.classList.remove('open');
      }
    });

    // Close on nav link click
    pill.querySelectorAll('.bubble-link').forEach(link => {
      link.addEventListener('click', () => {
        isOpen = false;
        pill.classList.remove('open');
      });
    });
  }

  /* ─────────────────────────── 4. NAV SCROLL TINT ── */
  const nav = document.getElementById('site-nav');
  ScrollTrigger.create({
    start: 80,
    onUpdate: (self) => {
      if (self.progress > 0) {
        nav.style.background = 'rgba(8,8,6,0.85)';
        nav.style.backdropFilter = 'blur(16px)';
        nav.style.borderBottom = '1px solid rgba(242,237,230,0.05)';
      } else {
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
        nav.style.borderBottom = 'none';
      }
    }
  });

  /* ─────────────────────────── 5. SCROLL REVEALS ── */

  // Section titles
  gsap.utils.toArray('.reveal-text').forEach(el => {
    gsap.fromTo(el,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Section label
  gsap.utils.toArray('.section-label').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 16 },
      {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: el, start: 'top 85%' }
      }
    );
  });

  // Service cards stagger
  gsap.fromTo('.service-card',
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 75%'
      }
    }
  );

  // Portfolio items stagger
  gsap.fromTo('.portfolio-item',
    { opacity: 0, scale: 0.96 },
    {
      opacity: 1, scale: 1,
      duration: 0.8,
      stagger: { amount: 0.8, from: 'start' },
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.portfolio-grid',
        start: 'top 80%'
      }
    }
  );

  // Pricing cards
  gsap.fromTo('.pricing-card',
    { opacity: 0, y: 60 },
    {
      opacity: 1, y: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.pricing-grid',
        start: 'top 78%'
      }
    }
  );

  // About split
  gsap.fromTo('.about-image-wrap',
    { opacity: 0, x: -60 },
    {
      opacity: 1, x: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#about', start: 'top 75%' }
    }
  );
  gsap.fromTo('.about-text',
    { opacity: 0, x: 60 },
    {
      opacity: 1, x: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#about', start: 'top 75%' }
    }
  );

  // Contact fade up
  gsap.fromTo('.contact-grid',
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#contact', start: 'top 78%' }
    }
  );

  /* ─────────────────────────── 6. PORTFOLIO FILTER ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      portfolioItems.forEach(item => {
        const match = filter === 'all' || item.dataset.cat === filter;
        gsap.to(item, {
          opacity: match ? 1 : 0.15,
          scale: match ? 1 : 0.97,
          duration: 0.4,
          ease: 'power2.out'
        });
        item.style.pointerEvents = match ? 'auto' : 'none';
      });
    });
  });

  /* ─────────────────────────── 7. CONTACT FORM ── */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value;
      const phone = form.querySelector('#phone').value;
      const date = form.querySelector('#event-date').value;
      const details = form.querySelector('#details').value;

      const msg = encodeURIComponent(
        `Hi Aura Signs! 👋\n\nName: ${name}\nPhone: ${phone}\nEvent Date: ${date}\n\nDetails:\n${details}`
      );

      // Show confirmation
      formNote.textContent = '✓ Message sent! We\'ll be in touch shortly.';
      formNote.style.color = '#7A8C6E';

      // Open WhatsApp
      setTimeout(() => {
        window.open(`https://wa.me/27600000000?text=${msg}`, '_blank');
      }, 400);

      form.reset();
    });
  }

  /* ─────────────────────────── 8. SMOOTH ANCHOR SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

}); // end DOMContentLoaded
