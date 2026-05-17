import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';
import { useQuote } from '../context/QuoteContext';

export default function Gallery() {
  const { addToBasket } = useQuote();

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

  const handleInterest = (title, category) => {
    addToBasket({
      name: `Gallery Style: ${title}`,
      type: `${category} Inspiration`,
      customNotes: `I am interested in a customized design inspired by this style from your gallery: "${title}".`
    });
  };

  return (
    <div className="landing-page-wrapper" style={{ paddingTop: '72px' }}>
      <section id="gallery" className="gallery reveal landing-section">
        <p className="section-label">Our work</p>
        <h2 className="section-headline">Elegant details.<br /><em>Memorable</em> setups.</h2>

        <div className="gallery-masonry">
          <div className="gallery-item">
            <div className="gallery-item-inner" style={{ aspectRatio: '3/4' }}>
              <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&q=75" alt="Acrylic wedding seating chart" />
            </div>
            <div className="gallery-item-caption">Seating chart · Wedding</div>
            <button 
              onClick={() => handleInterest('Acrylic Seating Chart', 'Wedding')}
              className="text-[10px] text-[#C9A96E] hover:text-[#E8DFD0] mt-1 underline tracking-widest uppercase transition-colors text-left focus:outline-none"
            >
              I'm interested in this →
            </button>
          </div>
          <div className="gallery-item">
            <div className="gallery-item-inner" style={{ aspectRatio: '4/3' }}>
              <img src="https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=500&q=75" alt="Event backdrop setup" />
            </div>
            <div className="gallery-item-caption">Backdrop · Event styling</div>
            <button 
              onClick={() => handleInterest('Custom Arch Backdrop', 'Event styling')}
              className="text-[10px] text-[#C9A96E] hover:text-[#E8DFD0] mt-1 underline tracking-widest uppercase transition-colors text-left focus:outline-none"
            >
              I'm interested in this →
            </button>
          </div>
          <div className="gallery-item">
            <div className="gallery-item-inner" style={{ aspectRatio: '1/1' }}>
              <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&q=75" alt="Business acrylic signage" />
            </div>
            <div className="gallery-item-caption">Acrylic sign · Business</div>
            <button 
              onClick={() => handleInterest('Reception Acrylic Signage', 'Business')}
              className="text-[10px] text-[#C9A96E] hover:text-[#E8DFD0] mt-1 underline tracking-widest uppercase transition-colors text-left focus:outline-none"
            >
              I'm interested in this →
            </button>
          </div>
          <div className="gallery-item">
            <div className="gallery-item-inner" style={{ aspectRatio: '3/4' }}>
              <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&q=75" alt="Balloon garland installation" />
            </div>
            <div className="gallery-item-caption">Balloon garland · Birthday</div>
            <button 
              onClick={() => handleInterest('Organic Balloon Installation', 'Birthday')}
              className="text-[10px] text-[#C9A96E] hover:text-[#E8DFD0] mt-1 underline tracking-widest uppercase transition-colors text-left focus:outline-none"
            >
              I'm interested in this →
            </button>
          </div>
          <div className="gallery-item">
            <div className="gallery-item-inner" style={{ aspectRatio: '4/3' }}>
              <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&q=75" alt="Wedding table numbers" />
            </div>
            <div className="gallery-item-caption">Table numbers · Wedding</div>
            <button 
              onClick={() => handleInterest('Acrylic Table Numbers', 'Wedding')}
              className="text-[10px] text-[#C9A96E] hover:text-[#E8DFD0] mt-1 underline tracking-widest uppercase transition-colors text-left focus:outline-none"
            >
              I'm interested in this →
            </button>
          </div>
          <div className="gallery-item">
            <div className="gallery-item-inner" style={{ aspectRatio: '1/1' }}>
              <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=75" alt="Custom stickers and packaging" />
            </div>
            <div className="gallery-item-caption">Stickers · Packaging</div>
            <button 
              onClick={() => handleInterest('Branded Stickers & Labels', 'Packaging')}
              className="text-[10px] text-[#C9A96E] hover:text-[#E8DFD0] mt-1 underline tracking-widest uppercase transition-colors text-left focus:outline-none"
            >
              I'm interested in this →
            </button>
          </div>
        </div>

        <div className="gallery-footer">
          <Link to="/auth" className="btn-outline-ivory">
            View full gallery
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </div>
  );
}
