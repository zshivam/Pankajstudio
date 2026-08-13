
import Link from 'next/link';
import Image from 'next/image'; // 🌟 1. Next.js Image Import Kiya
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoogleReviews from '@/components/GoogleReviews';

export const metadata = { 
  title: 'About Pankaj Studio | Deoria', 
  description: 'Deoria’s premier destination for luxury wedding photography, cinematic films, and digital solutions.' 
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      
      {/* 🌟 OPTIMIZED PARALLAX BACKGROUND (0% Lag) 🌟 */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          backgroundImage: 'linear-gradient(to right, rgba(5, 5, 5, 0.98) 0%, rgba(5, 5, 5, 0.92) 100%), url("/strip.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'translateZ(0)', // Hardware acceleration
          willChange: 'transform'
        }}
      />
      
      {/* 🌟 MAIN CONTAINER 🌟 */}
      <main style={{ paddingTop: 64, minHeight: '100vh', color: '#fff', position: 'relative', zIndex: 1 }}>
        
        {/* 🌟 HERO SECTION 🌟 */}
        <section style={{ background: 'transparent', padding: 'clamp(80px,12vw,120px) var(--page-gutter) clamp(40px,8vw,80px)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 24 }}>
              <span style={{ display: 'block', width: 28, height: 1, background: '#d4af37' }} />
              <span style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 11, letterSpacing: '0.25em', color: '#d4af37', textTransform: 'uppercase' }}>Deoria's Finest</span>
              <span style={{ display: 'block', width: 28, height: 1, background: '#d4af37' }} />
            </div>
            <h1 style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif', fontSize: 'clamp(52px, 9vw, 96px)', fontWeight: 400, color: '#fff', lineHeight: 1.1, letterSpacing: '0.02em', marginBottom: 24 }}>
              Capturing Life, <br /><span style={{ color: '#d4af37' }}>Preserving Legacy.</span>
            </h1>
          </div>
        </section>

        {/* 🌟 EDITORIAL ALTERNATING SECTION 🌟 */}
        <section style={{ padding: '0 var(--page-gutter) 100px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(60px, 10vw, 120px)' }}>
            
            {/* Block 1: Philosophy (Image Right) */}
            <div className="editorial-row">
              <div className="editorial-content">
                <h2 className="editorial-heading">Our Philosophy</h2>
                <p className="editorial-text">
                  Pankaj Studio is more than just a photography service; it is a creative space dedicated to the art of storytelling. Located in the heart of Deoria, we have built a reputation as the ultimate destination for premium photography, cinematography, and digital solutions. We believe that every fleeting moment carries a deep emotion, and our mission is to blend artistic vision with cutting-edge technology to ensure your memories remain vibrant for a lifetime. We don’t just take pictures; we capture the heartbeat of your most significant days.
                </p>
              </div>
              <div className="editorial-image-wrapper">
                <Image 
                  src="/philosophy.jpg" 
                  alt="Our Philosophy" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="editorial-image" 
                  loading="eager" // 1st image load fast
                  quality={85}
                />
              </div>
            </div>

            {/* Block 2: Stills & Cinema (Image Left) */}
            <div className="editorial-row reverse">
              <div className="editorial-content">
                <h2 className="editorial-heading">The Art of Stills & Cinema</h2>
                <p className="editorial-text">
                  Our expertise lies in turning unscripted reality into cinematic masterpieces. Whether it is a grand multi-day wedding celebration, an intimate pre-wedding shoot, or a precious maternity session, our team approaches every event with the precision of a filmmaker. We deliver stunning 4K cinematography and high-resolution candid photography that feels natural, elegant, and timeless. By directing moments thoughtfully rather than staging them forcefully, we provide you with a visual documentary that reads like the most beautiful chapter of your life.
                </p>
              </div>
              <div className="editorial-image-wrapper">
                <Image 
                  src="/cinema.jpg" 
                  alt="Wedding Cinematography" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="editorial-image" 
                  loading="lazy"
                  quality={85}
                />
              </div>
            </div>

            {/* Block 3: Restoration (Image Right) */}
            <div className="editorial-row">
              <div className="editorial-content">
                <h2 className="editorial-heading">Restoration & Preservation</h2>
                <p className="editorial-text">
                  We understand that true legacy is passed down through generations, which is why our commitment goes far beyond the digital screen. At Pankaj Studio, we breathe new life into fading history through our advanced old-to-new photo restoration services. We take your torn, faded, or black-and-white family photographs and digitally restore them to their former glory. Coupled with our premium photo framing, lamination, and high-quality printing services, we ensure that your heritage is protected and displayed with the respect it deserves.
                </p>
              </div>
              <div className="editorial-image-wrapper">
                <Image 
                  src="/restoration.jpg" 
                  alt="Photo Restoration" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="editorial-image" 
                  loading="lazy"
                  quality={85}
                />
              </div>
            </div>

            {/* Block 4: Digital Tech (Image Left) */}
            <div className="editorial-row reverse">
              <div className="editorial-content">
                <h2 className="editorial-heading">Beyond The Lens</h2>
                <p className="editorial-text">
                  To cater to the evolving needs of our clients, we have expanded our offerings to include personalized gifting and tech solutions. From custom-printed mugs, t-shirts, and LED displays to secure your home with professional CCTV camera installations, we meet your everyday digital needs with fair pricing and unmatched quality. From the moment you walk into our studio to the final delivery of your project, our goal is to provide an experience that is seamless, professional, and entirely focused on you.
                </p>
              </div>
              <div className="editorial-image-wrapper">
                <Image 
                  src="/digital.jpeg" 
                  alt="Digital Solutions" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="editorial-image" 
                  loading="lazy"
                  quality={85}
                />
              </div>
            </div>

          </div>
        </section>

        <GoogleReviews />

        {/* 🌟 CTA SECTION 🌟 */}
        <section style={{ background: 'transparent', padding: '100px var(--page-gutter) 60px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif', fontSize: 'clamp(32px,5vw,60px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 1.1, letterSpacing: '0.02em', marginBottom: 20 }}>Ready to begin?</h2>
          <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 450, margin: '0 auto 40px' }}>
            Let's discuss your next big event or custom printing needs. Our team is ready to bring your vision to life.
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', padding: '16px 48px', background: '#d4af37', fontFamily: '"Montserrat", sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', color: '#000', borderRadius: '4px', transition: 'all 0.3s' }} className="cta-btn">
            Contact Us Today
          </Link>
        </section>

        {/* 🌟 LOCATION MAP SECTION WITH PIN 🌟 */}
        <section id="location-map" style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '80px var(--page-gutter)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 16 }}>
              <span style={{ display: 'block', width: 28, height: 1, background: '#d4af37' }} />
              <span style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 11, letterSpacing: '0.25em', color: '#d4af37', textTransform: 'uppercase' }}>Visit Us</span>
              <span style={{ display: 'block', width: 28, height: 1, background: '#d4af37' }} />
            </div>
            
            <h2 style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 1.1, marginBottom: 40 }}>
              Find Us in Deoria 📍
            </h2>

            <div style={{ width: '100%', height: 480, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(20%) contrast(100%)' }} 
                src="https://maps.google.com/maps?q=Pankaj+Studio+The+Wedding+Filmer,+Jaiswal+Katra+Panchmukhi+Hanuman+Mandir+Deoria+Khas+Road,+Deoria,+Uttar+Pradesh&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>
        </section>

      </main>
      
      {/* 🌟 PREMIUM TYPOGRAPHY & LAYOUT STYLES 🌟 */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');

        .editorial-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
        }

        .editorial-row.reverse {
          flex-direction: row-reverse;
        }

        .editorial-content {
          flex: 1;
          max-width: 500px;
        }

        .editorial-image-wrapper {
          flex: 1;
          width: 100%;
          max-width: 500px;
          aspect-ratio: 4/5; 
          overflow: hidden;
          border-radius: 4px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          position: relative;
          
          /* 🌟 GPU Acceleration 🌟 */
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        .editorial-image {
          object-fit: cover;
          transition: transform 0.7s ease;
          will-change: transform;
        }
        
        .editorial-image-wrapper:hover .editorial-image {
          transform: scale(1.05);
        }

        .editorial-heading {
          font-family: "Playfair Display", "Cormorant Garamond", serif;
          font-size: 38px;
          font-weight: 400;
          font-style: italic;
          color: #fff;
          margin-bottom: 24px;
          letter-spacing: 0.02em;
        }

        .editorial-text {
          font-family: "Montserrat", sans-serif;
          font-size: 15px;
          font-weight: 300;
          color: rgba(255,255,255,0.7);
          line-height: 1.9;
          text-align: justify;
        }

        .cta-btn:hover {
          background: #fff !important;
          color: #000 !important;
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }

        @media(max-width: 900px) {
          .editorial-row {
            gap: 40px;
          }
        }

        @media(max-width: 768px) {
          .editorial-row, .editorial-row.reverse {
            flex-direction: column-reverse; 
            gap: 30px;
          }
          
          .editorial-content {
            max-width: 100%;
          }
          
          .editorial-image-wrapper {
            max-width: 100%;
            aspect-ratio: 16/9; 
          }

          .editorial-heading { font-size: 32px; text-align: center; }
          .editorial-text { text-align: left; }
        }
      `}</style>
      <Footer />
    </>
  );
}