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

  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);

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
      // 1. HERO ENTRANCE (Editorial Reveal)
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.to('.hero-headline', { clipPath: 'inset(0 0% 0 0)', duration: 1.5, delay: 0.5 })
        .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 1 }, '-=1')
        .to('.hero-ctas', { opacity: 1, y: 0, duration: 1 }, '-=0.8');

      // 2. SPOTLIGHT (High Precision)
      const circle = document.getElementById('spotCircle');
      const heroWrap = document.getElementById('spotlight-wrap');
      
      if (heroWrap && circle) {
        let mx = -1000, my = -1000;
        let cx = -1000, cy = -1000;

        heroWrap.addEventListener('mousemove', (e) => {
          const rect = heroWrap.getBoundingClientRect();
          mx = e.clientX - rect.left;
          my = e.clientY - rect.top;
        });

        gsap.ticker.add(() => {
          cx += (mx - cx) * 0.08;
          cy += (my - cy) * 0.08;
          circle.setAttribute('cx', cx);
          circle.setAttribute('cy', cy);
        });
      }

      // 4. SCROLL REVEALS
      gsap.utils.toArray('.reveal-text').forEach(el => {
        gsap.fromTo(el,
          { clipPath: 'inset(0 100% 0 0)', y: 20 },
          { clipPath: 'inset(0 0% 0 0)', y: 0, duration: 1.5, ease: 'power4.inOut', scrollTrigger: { trigger: el, start: 'top 85%' } }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const handleSaveToVault = (e) => {
    e.preventDefault();
    setShowUnlockModal(true);
  };

  return (
    <div ref={container} className="bg-[#080806]">
      {/* Vault Unlock Modal */}
      {showUnlockModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#080806]/90 backdrop-blur-xl" onClick={() => setShowUnlockModal(false)} />
          <div className="glass-panel max-w-lg w-full p-12 relative z-10 text-center border-[#E8DFD0]/20">
            <Heart size={48} className="mx-auto mb-8 text-[#E8DFD0] animate-pulse" />
            <h2 className="text-4xl font-display font-semibold mb-4 text-[#E8DFD0]">Unlock The Bridal Vault</h2>
            <p className="text-[#E8DFD0]/60 font-light mb-10 leading-relaxed text-lg">
              Save your favorite inspirations, access our Signage Master Checklist, and track your custom project from design to delivery.
            </p>
            <div className="flex flex-col gap-4">
              <Link to="/auth?signup=true" className="btn-primary py-5">Create My Vault</Link>
              <button onClick={() => setShowUnlockModal(false)} className="text-[#E8DFD0]/40 uppercase tracking-widest text-xs hover:text-[#E8DFD0] transition-colors">Maybe Later</button>
            </div>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav id="site-nav">
        <div className="nav-logo">AURA SIGNS</div>
        <div className="bubble-menu" id="bubbleMenu">
          <button className="bubble-trigger" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="flex gap-1">
              <span className={`w-1 h-1 rounded-full bg-[#E8DFD0] transition-all ${menuOpen ? 'scale-150' : ''}`} />
              <span className={`w-1 h-1 rounded-full bg-[#E8DFD0] transition-all ${menuOpen ? 'scale-150' : ''}`} />
              <span className={`w-1 h-1 rounded-full bg-[#E8DFD0] transition-all ${menuOpen ? 'scale-150' : ''}`} />
            </div>
          </button>
          <div className={`bubble-pill ${menuOpen ? 'open' : ''}`}>
            <button onClick={() => scrollTo('hero')} className="bubble-link" style={{ '--hc': '#C9603A' }}>Home</button>
            <button onClick={() => scrollTo('services')} className="bubble-link" style={{ '--hc': '#7A8C6E' }}>Services</button>
            <button onClick={() => scrollTo('portfolio')} className="bubble-link" style={{ '--hc': '#E8DFD0' }}>Portfolio</button>
            <Link to="/auth" className="bubble-link" style={{ '--hc': '#C9A96E' }}>The Vault</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div id="spotlight-wrap">
          <div id="hero-base">
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2000" alt="Aura Signs hero" id="hero-img" />
            <div id="hero-base-overlay"></div>
          </div>
          <div id="hero-reveal">
            <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000" alt="Signage installation" id="reveal-img" />
          </div>
          <svg id="spotlight-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="spotGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="1"/>
                <stop offset="60%" stopColor="white" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </radialGradient>
              <mask id="spotMask">
                <rect width="100%" height="100%" fill="black"/>
                <circle id="spotCircle" cx="-1000" cy="-1000" r="500" fill="url(#spotGrad)"/>
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="transparent" mask="url(#spotMask)"/>
          </svg>
        </div>
        <div className="hero-content">
          <p className="hero-eyebrow opacity-0 translate-y-4">Premium Wedding & Event Signage — Cape Town</p>
          <h1 className="hero-headline" style={{ clipPath: 'inset(0 100% 0 0)' }}>Signs That<br /><em>Say Something.</em></h1>
          <div className="hero-ctas flex flex-col sm:flex-row items-center gap-6 mt-12 opacity-0 translate-y-4">
            <button onClick={() => scrollTo('portfolio')} className="btn-primary px-12">Explore Portfolio</button>
            <Link to="/auth?signup=true" className="btn-outline px-12 border-[#E8DFD0]/40">Unlock The Vault</Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32">
        <div className="section-label text-center">Our Expertise</div>
        <h2 className="section-title reveal-text text-center">Crafted for<br /><em>Memorable Moments</em></h2>
        <div className="services-grid max-w-6xl mx-auto">
          {[
            { num: '01', title: 'Event Signage', desc: 'From minimal welcome boards to intricate seating charts that guide your guests with grace.', tags: ['Weddings', 'Celebrations'] },
            { num: '02', title: 'Business Branding', desc: 'Elevate your commercial space with custom vinyl, menu boards, and retail installations.', tags: ['Retail', 'Corporate'] },
            { num: '03', title: 'Bespoke Projects', desc: 'If you have a unique vision in acrylic, mirror, or wood, we bring it to life.', tags: ['Acrylic', 'Mirror', 'Bespoke'] }
          ].map((s) => (
            <div key={s.num} className="service-card group border-[#E8DFD0]/5 hover:border-[#E8DFD0]/20 transition-all duration-500">
              <div className="service-num opacity-20 group-hover:opacity-40 transition-opacity">{s.num}</div>
              <div className="relative z-10">
                <h3 className="service-name text-3xl mb-4"><em>{s.title}</em></h3>
                <p className="service-desc text-[#E8DFD0]/50 mb-8">{s.desc}</p>
                <div className="service-tags">
                  {s.tags.map(t => <span key={t} className="border-[#E8DFD0]/10 text-xs px-3 py-1 uppercase tracking-widest">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 px-8">
        <h2 className="portfolio-title reveal-text mb-16"><em>The Work</em></h2>
        <div className="portfolio-filters flex justify-center mb-16">
          {['all', 'events', 'business', 'custom'].map(f => (
            <button key={f} className={`filter-btn mx-2 ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="portfolio-grid max-w-[1800px] mx-auto">
          {portfolioItems.map((p) => (
            <div 
              key={p.id} 
              className={`portfolio-item ${p.className} relative group cursor-none`} 
              data-cat={p.cat}
              onMouseEnter={() => setActiveTooltip(p.id)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <img src={p.img} alt={p.name} loading="lazy" className="grayscale group-hover:grayscale-0 transition-all duration-700" />
              
              {/* Guest Save Hint */}
              {activeTooltip === p.id && (
                <div className="absolute top-4 left-4 z-50 bg-[#E8DFD0] text-[#080806] px-4 py-2 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <Heart size={12} fill="currentColor" /> Save to Vault
                </div>
              )}

              <div className="portfolio-hover p-12 bg-gradient-to-t from-[#080806] via-[#080806]/40 to-transparent">
                <span className="p-cat text-[#C9A96E] text-xs mb-2 block">{p.cat}</span>
                <span className="p-name text-3xl font-display italic">{p.name}</span>
                <button onClick={handleSaveToVault} className="mt-8 btn-outline py-3 px-6 border-white/20 text-xs group/btn">
                  Save Inspiration
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
