
import Link from 'next/link';
import Image from 'next/image'; // 🌟 1. Next.js Image Import Kiya
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Our Services | Pankaj Studio Deoria',
  description: 'Explore our premium services: 4K Video, Candid Photography, Cinematography, Weddings, and more.'
};

// 🌟 ALL 9 SERVICES WITH SHORT, PUNCHY DESCRIPTIONS 🌟
const SERVICES_DATA = [
  { 
    title: 'Full HD & 4K Video', 
    subtitle: 'Crystal Clear Detail',
    desc: 'Ultra-high-definition video coverage. We ensure every tiny detail of your special day is recorded with industry-leading 4K technology for a truly premium viewing experience.',
    image: '/cinema.jpg' 
  },
  { 
    title: 'Candid Photography', 
    subtitle: 'Unposed & Real',
    desc: 'We capture the genuine smiles, sudden tears, and fleeting glances that make your story unique. No forced poses, just the pure, raw emotion of your moments.',
    image: '/candid1.jpg' 
  },
  { 
    title: 'Cinematography', 
    subtitle: 'Your Story, Directed',
    desc: 'More than just a video, it is a film. We shoot and edit your event like a high-end movie, complete with beautiful storytelling and cinematic color grading.',
    image: '/Cinematography.jpg'
  },
  { 
    title: 'Ring Ceremony', 
    subtitle: 'The Beginning of Forever',
    desc: 'We focus on the intimate details, the perfect exchange of rings, and the joyous celebrations of your engagement with elegance and precision.',
    image: '/engagement.jpg'
  },
  { 
    title: 'Pre Wedding', 
    subtitle: 'Romance on Frame',
    desc: 'Before the chaos of the big day begins, we scout stunning locations and direct a personalized, romantic visual narrative exclusively for you both.',
    image: '/prewedding.jpg'
  },
  { 
    title: 'Wedding', 
    subtitle: 'The Grand Celebration',
    desc: 'Comprehensive coverage of your most important day. From the quiet morning preparations to the grand evening farewell, we document every ritual flawlessly.',
    image: '/wedding.jpg'
  },
  { 
    title: 'Baby & Maternity', 
    subtitle: 'Life’s Milestones',
    desc: 'Celebrating life’s precious moments. Whether it is a grand birthday bash or the glowing beauty of motherhood, we freeze these joyful times into beautiful portraits.',
    image: '/baby.jpeg'
  },
  { 
    title: 'Corporate Events', 
    subtitle: 'Professional Coverage',
    desc: 'Sleek, high-quality media coverage for your business needs. We deliver crisp photos and videos for seminars, product launches, and corporate gatherings.',
    image: '/digital.jpeg'
  },
  { 
    title: 'Drone & LED Wall', 
    subtitle: 'High-Tech Setup',
    desc: 'Elevate your event with breathtaking aerial drone shots and dynamic live LED wall displays. We provide cutting-edge visual tech for a spectacular guest experience.',
    image: '/drone.jpeg'
  }
];

export default function ServicePage() {
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
          backgroundImage: 'linear-gradient(to bottom, rgba(5, 5, 5, 0.85), rgba(5, 5, 5, 0.90)), url("/strip.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          transform: 'translateZ(0)', // Hardware acceleration
          willChange: 'transform'
        }}
      />
      
      {/* 🌟 MAIN CONTENT WRAPPER 🌟 */}
      <main style={{ minHeight: '100vh', color: '#fff', position: 'relative', zIndex: 1 }}>
        
        {/* 🌟 HERO SECTION 🌟 */}
        <section style={{ paddingTop: '180px', paddingBottom: '80px', textAlign: 'center', paddingLeft: 'var(--page-gutter)', paddingRight: 'var(--page-gutter)', background: 'transparent' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 24 }}>
            <span style={{ display: 'block', width: 40, height: 1, background: '#d4af37' }} />
            <span style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 11, letterSpacing: '0.25em', color: '#d4af37', textTransform: 'uppercase' }}>Our Offerings</span>
            <span style={{ display: 'block', width: 40, height: 1, background: '#d4af37' }} />
          </div>
          
          <h1 style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif', fontSize: 'clamp(48px, 8vw, 80px)', fontStyle: 'italic', fontWeight: 400, color: '#fff', letterSpacing: '0.02em', marginBottom: 30, textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
            Mastering The Art <br/><span style={{ color: 'rgba(255,255,255,0.7)' }}>of Visuals.</span>
          </h1>

          <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 'clamp(14px, 2vw, 16px)', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, maxWidth: 600, margin: '0 auto', fontWeight: 300, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Explore our signature services, tailored to document your legacy with uncompromising quality and artistic vision.
          </p>
        </section>

        {/* 🌟 THE EPISODE LAYOUT 🌟 */}
        <section style={{ padding: '0 var(--page-gutter) 100px', maxWidth: 1200, margin: '0 auto', background: 'transparent' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(60px, 8vw, 100px)' }}>
            {SERVICES_DATA.map((service, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className={`episode-row ${isEven ? '' : 'reverse'}`}>
                  
                  {/* The Image Wrapper - Optimized for GPU */}
                  <div className="episode-image-wrapper">
                    <div className="episode-number">
                      0{index + 1}
                    </div>
                    {/* 🌟 NEXT.JS IMAGE REPLACEMENT 🌟 */}
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                      className="episode-img"
                      loading={index < 2 ? "eager" : "lazy"} // Pehli 2 image fast load hongi, baaki scroll karne par
                      quality={85}
                    />
                  </div>

                  {/* The Content */}
                  <div className="episode-content">
                    <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 11, letterSpacing: '0.2em', color: '#d4af37', textTransform: 'uppercase', marginBottom: 10 }}>
                      {service.subtitle}
                    </p>
                    <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 400, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
                      {service.title}
                    </h2>
                    <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, fontWeight: 300, marginBottom: 24, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                      {service.desc}
                    </p>
                    <Link href="/contact" className="episode-btn">
                      Enquire Now
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>

        </section>

        {/* 🌟 FOOTER CTA SECTION 🌟 */}
        <section style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '80px var(--page-gutter)', borderTop: '1px solid rgba(212, 175, 55, 0.1)', textAlign: 'center', backdropFilter: 'blur(5px)' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', marginBottom: 20 }}>Ready to create magic?</h2>
          <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
            Let's discuss how we can tailor our services for your upcoming event.
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', padding: '16px 40px', background: '#d4af37', color: '#000', fontFamily: '"Montserrat", sans-serif', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none', borderRadius: 4, transition: 'all 0.3s' }} className="cta-btn">
            Book your session 
          </Link>
        </section>

      </main>
      
      {/* 🌟 EDITORIAL CSS STYLES 🌟 */}
      <style>{`
        .episode-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
        }

        .episode-row.reverse {
          flex-direction: row-reverse;
        }

        .episode-image-wrapper {
          flex: 1;
          width: 100%;
          max-width: 480px; 
          aspect-ratio: 4/3; 
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.8);
          
          /* 🌟 GPU Acceleration for Lag-Free Scroll 🌟 */
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        .episode-img {
          object-fit: cover;
          transition: transform 1s ease, filter 1s ease;
          filter: grayscale(10%) contrast(105%);
          will-change: transform, filter; /* Prevents frame drops on hover */
        }

        .episode-image-wrapper:hover .episode-img {
          transform: scale(1.05);
          filter: grayscale(0%) contrast(100%);
        }

        .episode-number {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 10;
          font-family: "Playfair Display", serif;
          font-size: 48px;
          font-weight: 400;
          font-style: italic;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.9);
          line-height: 1;
        }

        .episode-content {
          flex: 1;
          max-width: 450px;
        }

        .episode-btn {
          display: inline-block;
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #fff;
          text-decoration: none;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(255,255,255,0.3);
          transition: all 0.3s ease;
        }

        .episode-btn:hover {
          color: #d4af37;
          border-color: #d4af37;
          padding-right: 15px;
        }

        .cta-btn:hover {
          background: #fff !important;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.4);
        }

        @media(max-width: 960px) {
          .episode-row {
            gap: 40px;
          }
        }

        @media(max-width: 768px) {
          .episode-row, .episode-row.reverse {
            flex-direction: column;
            gap: 30px;
          }
          
          .episode-image-wrapper {
            max-width: 100%;
            aspect-ratio: 16/9;
          }

          .episode-content {
            max-width: 100%;
            text-align: left;
          }
        }
      `}</style>
      
      <Footer />
    </>
  );
}