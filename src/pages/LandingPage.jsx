import React, { useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const container = useRef(null);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);

  const portfolioItems = [
    { id: 1, cat: "events", name: "The Venter Wedding", img: "https://picsum.photos/seed/signage1/800/600", className: "" },
    { id: 2, cat: "business", name: "Café Lumière Menu Board", img: "https://picsum.photos/seed/signage2/800/1000", className: "tall" },
    { id: 3, cat: "custom", name: "Acrylic Neon Installation", img: "https://picsum.photos/seed/signage3/800/600", className: "" },
    { id: 4, cat: "events", name: "Elegant 30th Celebration", img: "https://picsum.photos/seed/signage4/800/600", className: "" },
    { id: 5, cat: "custom", name: "Large Format Retail Wrap", img: "https://picsum.photos/seed/signage5/1200/600", className: "wide" },
    { id: 6, cat: "business", name: "Studio Nord Window Vinyl", img: "https://picsum.photos/seed/signage6/800/600", className: "" },
    { id: 7, cat: "events", name: "Arch Floral Welcome Sign", img: "https://picsum.photos/seed/signage7/800/600", className: "" },
    { id: 8, cat: "custom", name: "Bespoke Mirror Typography", img: "https://picsum.photos/seed/signage8/800/600", className: "" }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. HERO ENTRANCE
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 1, delay: 0.3 })
        .to('.hero-headline', { opacity: 1, y: 0, duration: 1.2 }, '-=0.7')
        .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.9 }, '-=0.8');

      // 2. SPOTLIGHT
      const circle = document.getElementById('spotCircle');
      const heroWrap = document.getElementById('spotlight-wrap');
      const trail = document.getElementById('cursor-trail');

      if (heroWrap && circle) {
        let mx = -500, my = -500;
        let cx = -500, cy = -500;
        let dots = [];

        const spawnDot = (x, y) => {
          const dot = document.createElement('div');
          dot.className = 'trail-dot';
          const size = Math.random() * 60 + 30;
          dot.style.cssText = `left: ${x}px; top: ${y}px; width: ${size}px; height: ${size}px; opacity: 0.6;`;
          trail.appendChild(dot);
          dots.push(dot);

          gsap.to(dot, {
            opacity: 0, scale: 2, duration: 1.4, ease: 'power2.out',
            onComplete: () => { dot.remove(); dots = dots.filter(d => d !== dot); }
          });
        };

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

        gsap.ticker.add(() => {
          cx += (mx - cx) * 0.12;
          cy += (my - cy) * 0.12;
          circle.setAttribute('cx', cx);
          circle.setAttribute('cy', cy);
        });
      }

      // 3. NAV SCROLL TINT
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

      // 4. SCROLL REVEALS
      gsap.utils.toArray('.reveal-text').forEach(el => {
        gsap.fromTo(el,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power4.inOut', scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' } }
        );
      });

      gsap.utils.toArray('.section-label').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: el, start: 'top 85%' } }
        );
      });

      gsap.fromTo('.service-card', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.services-grid', start: 'top 75%' } });
      gsap.fromTo('.portfolio-item', { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.8, stagger: { amount: 0.8, from: 'start' }, ease: 'power3.out', scrollTrigger: { trigger: '.portfolio-grid', start: 'top 80%' } });
      gsap.fromTo('.pricing-card', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.pricing-grid', start: 'top 78%' } });
      gsap.fromTo('.about-image-wrap', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '#about', start: 'top 75%' } });
      gsap.fromTo('.about-text', { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '#about', start: 'top 75%' } });
      gsap.fromTo('.contact-grid', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '#contact', start: 'top 78%' } });

    }, container);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    gsap.to('.portfolio-item', {
      opacity: (i, el) => filter === 'all' || el.dataset.cat === filter ? 1 : 0.15,
      scale: (i, el) => filter === 'all' || el.dataset.cat === filter ? 1 : 0.97,
      duration: 0.4,
      ease: 'power2.out',
      pointerEvents: (i, el) => filter === 'all' || el.dataset.cat === filter ? 'auto' : 'none'
    });
  }, [filter]);

  const handleSaveToVault = (e) => {
    e.preventDefault();
    navigate('/auth?signup=true');
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div ref={container}>
      {/* NAV */}
      <nav id="site-nav">
        <div className="nav-logo">AURA SIGNS</div>
        <div className="bubble-menu" id="bubbleMenu">
          <button className="bubble-trigger" onClick={() => setMenuOpen(!menuOpen)}>
            <span style={{ transform: menuOpen ? 'translateY(4px)' : 'none' }}></span>
            <span></span>
            <span style={{ transform: menuOpen ? 'translateY(-4px)' : 'none' }}></span>
          </button>
          <div className={`bubble-pill ${menuOpen ? 'open' : ''}`}>
            <button onClick={() => scrollTo('hero')} className="bubble-link" style={{ '--hc': '#C9603A' }}>Home</button>
            <button onClick={() => scrollTo('services')} className="bubble-link" style={{ '--hc': '#7A8C6E' }}>Services</button>
            <button onClick={() => scrollTo('portfolio')} className="bubble-link" style={{ '--hc': '#E8DFD0' }}>Portfolio</button>
            <button onClick={() => scrollTo('pricing')} className="bubble-link" style={{ '--hc': '#C9603A' }}>Pricing</button>
            <button onClick={() => scrollTo('about')} className="bubble-link" style={{ '--hc': '#7A8C6E' }}>About</button>
            <Link to="/auth" className="bubble-link" style={{ '--hc': '#E8DFD0' }}>The Vault</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div id="spotlight-wrap">
          <div id="hero-base">
            <img src="https://picsum.photos/seed/signage-hero/1600/900" alt="Aura Signs hero" id="hero-img" />
            <div id="hero-base-overlay"></div>
          </div>
          <div id="hero-reveal">
            <img src="https://picsum.photos/seed/signage-install/1600/900" alt="Signage installation" id="reveal-img" />
          </div>
          <svg id="spotlight-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="spotGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="1"/>
                <stop offset="80%" stopColor="white" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </radialGradient>
              <mask id="spotMask">
                <rect width="100%" height="100%" fill="black"/>
                <circle id="spotCircle" cx="-500" cy="-500" r="460" fill="url(#spotGrad)"/>
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="transparent" mask="url(#spotMask)"/>
          </svg>
          <div id="cursor-trail"></div>
        </div>
        <div className="hero-content">
          <p className="hero-eyebrow">Aesthetic Branding & Event Signage — Cape Town</p>
          <h1 className="hero-headline">Signs That<br /><em>Say Something.</em></h1>
          <div className="hero-ctas flex flex-col sm:flex-row items-center gap-4 mt-8">
            <button onClick={() => scrollTo('portfolio')} className="btn-primary">View Our Work</button>
            <Link to="/auth?signup=true" className="btn-outline">Unlock The Bridal Vault</Link>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="section-label">What We Do</div>
        <h2 className="section-title reveal-text">Crafted for<br /><em>Every Occasion</em></h2>
        <div className="services-grid">
          {[
            { num: '01', title: 'Event Signage', desc: 'Weddings, birthdays, celebrations — signs designed for moments that matter.', tags: ['Weddings', 'Birthdays', 'Celebrations'] },
            { num: '02', title: 'Business Signage', desc: 'Menus, vinyl, retail displays — your brand, made visible with intention.', tags: ['Menus', 'Vinyl', 'Retail'] },
            { num: '03', title: 'Custom Projects', desc: 'Acrylic, large format, bespoke — if you can dream it, we can sign it.', tags: ['Acrylic', 'Large Format', 'Bespoke'] }
          ].map((s) => (
            <div key={s.num} className="service-card" data-index={s.num}>
              <div className="service-num">{s.num}</div>
              <div className="service-body">
                <h3 className="service-name"><em>{s.title}</em></h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-tags">
                  {s.tags.map(t => <span key={t}>{t}</span>)}
                </div>
              </div>
              <div className="service-glow"></div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio">
        <h2 className="portfolio-title reveal-text"><em>The Work</em></h2>
        <div className="portfolio-filters">
          {['all', 'events', 'business', 'custom'].map(f => (
            <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="portfolio-grid" id="portfolioGrid">
          {portfolioItems.map((p) => (
            <div key={p.id} className={`portfolio-item ${p.className}`} data-cat={p.cat}>
              <img src={p.img} alt={p.name} loading="lazy" />
              <div className="portfolio-hover">
                <span className="p-cat capitalize">{p.cat}</span>
                <span className="p-name">{p.name}</span>
                <button onClick={handleSaveToVault} className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest bg-white/10 hover:bg-white/20 px-4 py-2 rounded-none backdrop-blur-sm transition-colors border border-white/20">
                  <Heart size={14} /> Save to Vault
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing">
        <div className="section-label">Transparent Pricing</div>
        <h2 className="section-title reveal-text">Made for<br /><em>Every Budget</em></h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-tier">Basic</div>
            <div className="pricing-price"><em>R600</em><span>from</span></div>
            <ul className="pricing-list">
              <li>1–2 signage pieces</li><li>Standard fonts & colours</li><li>Small events only</li><li>48hr turnaround</li><li>Digital proof included</li>
            </ul>
            <a href="https://wa.me/27600000000?text=Hi%20Aura%20Signs!%20I%27m%20interested%20in%20the%20Basic%20package." className="pricing-cta" target="_blank" rel="noreferrer">Get a Quote ↗</a>
          </div>
          <div className="pricing-card featured">
            <div className="pricing-badge">Most Popular</div>
            <div className="pricing-tier">Standard</div>
            <div className="pricing-price"><em>R900</em><span>from</span></div>
            <ul className="pricing-list">
              <li>Full event package</li><li>Welcome + table + bar signs</li><li>Custom design consultation</li><li>24hr turnaround</li><li>Delivery in Cape Town</li><li>2 revision rounds</li>
            </ul>
            <a href="https://wa.me/27600000000?text=Hi%20Aura%20Signs!%20I%27m%20interested%20in%20the%20Standard%20package." className="pricing-cta pricing-cta-accent" target="_blank" rel="noreferrer">Get a Quote ↗</a>
          </div>
          <div className="pricing-card">
            <div className="pricing-tier">Premium</div>
            <div className="pricing-price"><em>R2,500</em><span>from</span></div>
            <ul className="pricing-list">
              <li>Corporate & large format</li><li>Custom acrylic & bespoke</li><li>Unlimited revisions</li><li>Rush options available</li><li>Installation assistance</li><li>Brand kit alignment</li>
            </ul>
            <a href="https://wa.me/27600000000?text=Hi%20Aura%20Signs!%20I%27m%20interested%20in%20the%20Premium%20package." className="pricing-cta" target="_blank" rel="noreferrer">Get a Quote ↗</a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="about-grid">
          <div className="about-image-wrap">
            <img src="https://picsum.photos/seed/studio-aura/700/900" alt="Aura Signs studio" className="about-img" />
            <div className="about-img-accent"></div>
          </div>
          <div className="about-text">
            <div className="section-label">Our Story</div>
            <h2 className="section-title reveal-text"><em>Born from a Love<br />of Clean Design</em></h2>
            <p className="about-body">Aura Signs grew from a simple belief — that signage should be as beautiful as the moments it marks. Based in Cape Town, we work at the intersection of craft and creativity, turning words and ideas into physical things people remember.</p>
            <p className="about-body">Every piece we make is designed with intention. Whether it's a handwritten welcome board for a backyard celebration or an acrylic installation for a flagship store, we bring the same premium attention to detail.</p>
            <p className="about-body">We are a small studio, and we like it that way. It means you work directly with us — from concept to collection.</p>
            <div className="about-sig">— Aura Signs, Cape Town</div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <h2 className="contact-title reveal-text">Let's Make<br /><em>Something Beautiful.</em></h2>
        <p className="contact-sub">Tell us about your event or project and we'll get back to you within a few hours.</p>
        <div className="contact-grid">
          <div className="contact-wa">
            <p className="wa-label">Fastest way to reach us</p>
            <a href="https://wa.me/27600000000?text=Hi" className="wa-button" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </a>
            <p className="wa-note">Monday–Saturday · 8am–6pm · Cape Town, SA</p>
          </div>
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert("Use WhatsApp for MVP!"); }}>
            <div className="form-row">
              <div className="form-group"><label>Your Name</label><input type="text" placeholder="Sarah & James" /></div>
              <div className="form-group"><label>Phone</label><input type="tel" placeholder="083 000 0000" /></div>
            </div>
            <div className="form-group"><label>Event Date</label><input type="date" /></div>
            <div className="form-group"><label>Details</label><textarea rows="5" placeholder="e.g. Wedding in Franschhoek..."></textarea></div>
            <button type="submit" className="form-submit">Send Enquiry</button>
          </form>
        </div>
      </section>

      {/* Floating WA */}
      <a href="https://wa.me/27600000000" className="wa-float" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}
