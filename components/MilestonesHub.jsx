'use client';
import Link from 'next/link';
import Image from 'next/image'; // 🌟 1. Next.js Image import kiya

export default function MilestonesHub({ projects }) {
  // Note: Hum filhal MongoDB ke 'projects' prop ko ignore kar rahe hain 
  // aur ek static premium layout dikha rahe hain.

  return (
    <section style={{ background: '#050505', padding: '100px var(--page-gutter) 100px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 16 }}>
            <span style={{ display: 'block', width: 28, height: 1, background: '#d4af37' }} />
            <span style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 10, letterSpacing: '0.25em', color: '#d4af37', textTransform: 'uppercase' }}>Our Portfolio</span>
            <span style={{ display: 'block', width: 28, height: 1, background: '#d4af37' }} />
          </div>
          <h2 style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 1.1 }}>
            Signature Milestones
          </h2>
        </div>

        {/* Static Showcase Layout */}
        <div className="portfolio-showcase">
          
          {/* Text Content */}
          <div className="portfolio-text">
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', color: '#fff', marginBottom: '20px', fontWeight: 400 }}>
              A Glimpse Into Our Art
            </h3>
            <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.9, marginBottom: '30px', fontWeight: 300 }}>
              Every wedding, every portrait, and every fleeting moment is treated as a masterpiece at Pankaj Studio. While we are curating our extensive digital gallery, this space stands as a testament to our dedication to light, emotion, and storytelling. We don't just click pictures; we pause time for you.
            </p>
            <Link href="/contact" className="portfolio-btn">
              Book Your Session
            </Link>
          </div>

          {/* Single Large Image - 🌟 OPTIMIZED WAPPER 🌟 */}
          <div className="portfolio-image-wrapper">
            <Image 
              src="/dulhan.jpg" 
              alt="Pankaj Studio Portfolio"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="portfolio-img"
              quality={85}
              loading="lazy"
            />
          </div>

        </div>

      </div>

      {/* 🌟 CSS STYLES 🌟 */}
      <style>{`
        .portfolio-showcase {
          display: flex;
          align-items: center;
          gap: 60px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 40px;
          border-radius: 8px;
        }

        .portfolio-text {
          flex: 1;
          max-width: 450px;
        }

        .portfolio-image-wrapper {
          flex: 1.2;
          width: 100%;
          aspect-ratio: 16/10; /* Cinematic wide ratio */
          overflow: hidden;
          border-radius: 4px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          position: relative;
          
          /* 🌟 GPU Acceleration (Hardware Render) - Lag Killer 🌟 */
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        .portfolio-img {
          object-fit: cover;
          transition: transform 0.8s ease;
          will-change: transform; /* Browser ko pehle se alert karta hai animation ke liye */
        }

        .portfolio-image-wrapper:hover .portfolio-img {
          transform: scale(1.05);
        }

        .portfolio-btn {
          display: inline-block;
          font-family: "Montserrat", sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #d4af37;
          text-decoration: none;
          padding: 12px 0;
          border-bottom: 1px solid #d4af37;
          transition: all 0.3s;
        }

        .portfolio-btn:hover {
          color: #fff;
          border-color: #fff;
        }

        @media(max-width: 900px) {
          .portfolio-showcase {
            flex-direction: column-reverse;
            padding: 20px;
            gap: 30px;
          }
          .portfolio-text {
            max-width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}