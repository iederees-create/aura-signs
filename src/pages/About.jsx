import React, { useEffect } from 'react';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';

export default function About() {
  useEffect(() => {
    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page-wrapper" style={{ paddingTop: '72px' }}>
      <section id="about" className="about landing-section reveal">
        <div className="about-inner">
          <div className="about-visual">
            <img className="about-visual-img"
                 src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80"
                 alt="Premium acrylic signage detail" />
            <div className="about-accent"></div>
            <div className="about-tag">Est. Cape Town</div>
          </div>
          <div className="about-content">
            <p className="section-label">About Bespoke</p>
            <h2 className="section-headline">Creative signage<br />with a <em>premium</em> touch</h2>
            <p className="section-body">
              We specialise in modern, elegant, and fully customised signage for events and businesses of all sizes. From intimate celebrations to large corporate activations, every piece is designed and produced to reflect your vision — with the quality to match.
            </p>
            <p className="section-body" style={{ marginTop: '1rem' }}>
              We handle everything from concept and design through to production, delivery, and installation — making the process simple and stress-free.
            </p>
            <div className="about-stats">
              <div className="stat-block">
                <p>100+</p>
                <span>Projects completed</span>
              </div>
              <div className="stat-block">
                <p>2</p>
                <span>Service categories</span>
              </div>
              <div className="stat-block">
                <p>1</p>
                <span>City — Cape Town</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </div>
  );
}
