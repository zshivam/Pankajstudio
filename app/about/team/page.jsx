import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh' }}>
        
        {/* 🌟 HEADER SECTION 🌟 */}
        <section style={{ textAlign: 'center', paddingTop: '180px', paddingBottom: '80px', paddingLeft: 'var(--page-gutter)', paddingRight: 'var(--page-gutter)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 24 }}>
            <span style={{ display: 'block', width: 40, height: 1, background: '#d4af37' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.25em', color: '#d4af37', textTransform: 'uppercase' }}>Behind The Magic</span>
            <span style={{ display: 'block', width: 40, height: 1, background: '#d4af37' }} />
          </div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 400, fontStyle: 'italic', marginBottom: 24 }}>
            Meet The Masters
          </h1>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.6)', maxWidth: 650, margin: '0 auto', lineHeight: 1.8 }}>
            A legacy built on brotherhood, passion, and an obsession with visual perfection. Get to know the creative minds who bring your stories to life.
          </p>
        </section>

        {/* 🌟 SECTION 1: BADE BHAIYA (Founder & Lead) 🌟 */}
        <section className="profile-section">
          <div className="profile-container">
            {/* Image (Left) */}
            <div className="profile-img-wrapper" style={{ maxHeight: '700px' }}>
              <div className="profile-img-bg" style={{ backgroundImage: `url(/Deepak.jpeg)` }} />
              <div className="profile-number">01</div>
              <img src="/Deepak.jpeg" alt="Deepak Sahani - Founder" className="profile-img" />
            </div>
            
            {/* Content (Right) */}
            <div className="profile-content">
              <p className="profile-subtitle">Founder & Lead Director</p>
              <h2 className="profile-name">Deepak Sahani</h2>

              {/* 🏆 HONOR TAG ADDED HERE 🏆 */}
              <div className="honor-badge">
                <span>🏅 Appointed District In-Charge — Photographers Association, UP (Deoria Unit)</span>
              </div>
              
              <div className="bio-content">
                <p>
                  Pankaj Studio was born from a simple belief: real emotions make the most beautiful photographs. Deepak founded the studio with this vision, moving away from stiff, staged poses toward a documentary style that captures weddings as they truly unfold — the laughter, the tears, the stolen glances between two families becoming one.
                </p>
                <p>
                  Over the past decade, he has quietly built a reputation across the region for his patient eye and calm presence on set, blending timeless traditional portraiture with a candid, editorial sensibility. Every wedding he shoots is treated as a once-in-a-lifetime story, because for the couple, it is.
                </p>
              </div>

              {/* Founder Achievements Grid */}
              <div className="achievement-grid">
                <div className="achievement-box">
                  <h4>10+</h4>
                  <span>Years Experience</span>
                </div>
                <div className="achievement-box">
                  <h4>1000+</h4>
                  <span>Weddings Shot</span>
                </div>
                <div className="achievement-box">
                  <h4>🏆</h4>
                  <span>Awarded Photographer</span>
                </div>
              </div>

              <p className="quote-text">
                "We don't take photos, we capture feelings that last a lifetime."
              </p>
            </div>
          </div>
        </section>

        {/* 🌟 SECTION 2: CHOTE BHAIYA (Cinematographer) - REVERSED 🌟 */}
        <section className="profile-section reversed">
          <div className="profile-container reversed-container">
            {/* Image (Right) */}
            <div className="profile-img-wrapper" style={{ maxHeight: '700px' }}>
              <div className="profile-img-bg" style={{ backgroundImage: `url(/Ratnesh.jpeg)` }} />
              <div className="profile-number">02</div>
              <img src="/Ratnesh.jpeg" alt="Ratnesh Sahani - Cinematographer" className="profile-img" />
            </div>
            
            {/* Content (Left) */}
            <div className="profile-content">
              <p className="profile-subtitle">Master Cinematographer & Editor</p>
              <h2 className="profile-name">Ratnesh Sahani</h2>
              
              <div className="bio-content">
                <p>
                  If Deepak captures the moment, Ratnesh gives it motion. As the studio's cinematographer, he turns hours of raw footage into a cinematic film that plays out like a movie made just for the couple — complete with sweeping drone shots, intimate handheld frames, and sound design that pulls you right back into the day.
                </p>
                <p>
                  His editing style borrows heavily from feature-film color grading, giving every wedding film a rich, theatrical look rather than a flat, everyday video. From the first look to the last dance, he shapes the story so it feels less like documentation and more like a memory you can replay forever.
                </p>
              </div>

              {/* Cinematographer Expertise List */}
              <div className="expertise-container">
                <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16 }}>Signature Expertise</h4>
                <ul className="expertise-list">
                  <li>Cinematic 4K Videography & Direction</li>
                  <li>Advanced Aerial & Drone Operations</li>
                  <li>Hollywood-Grade Color Grading</li>
                  <li>Sound Design & Story-Driven Editing</li>
                </ul>
              </div>

              <p className="quote-text">
                "Every love story deserves a breathtaking cinematic soundtrack."
              </p>
            </div>
          </div>
        </section>

        {/* 🌟 SECTION 3: THE CREW (Wide Group Photo) 🌟 */}
        <section style={{ padding: '100px var(--page-gutter)', background: 'linear-gradient(to bottom, #050505, #0a0a0a)', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            
            <p className="profile-subtitle" style={{ marginBottom: 10, justifyContent: 'center' }}>The Backbone</p>
            <h2 className="profile-name" style={{ marginBottom: 24 }}>Our Dedicated Crew</h2>
            <p className="profile-desc" style={{ textAlign: 'center', marginBottom: 50, margin: '0 auto 50px', fontFamily: '"DM Sans", sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, maxWidth: 700 }}>
              A masterpiece is never created alone. Behind every frame you see stands a team you rarely notice — second-shooters catching angles Deepak can't be in two places for, lighting assistants chasing the perfect golden hour, and editors spending countless hours polishing every gallery before it reaches you. This is the crew that makes Pankaj Studio's flawless finish possible.
            </p>

            <div className="wide-img-wrapper">
              <img 
                src="/philosophy.jpg" 
                alt="Pankaj Studio Team" 
                className="wide-img"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.5), transparent 50%)', zIndex: 2, pointerEvents: 'none' }}></div>
            </div>

          </div>
        </section>

      </main>

      {/* 🌟 SAFE CSS INJECTION 🌟 */}
      <style dangerouslySetInnerHTML={{ __html: `
        .profile-section {
          padding: 100px var(--page-gutter);
          border-top: 1px solid rgba(255,255,255,0.02);
        }

        .profile-section.reversed {
          background: rgba(255,255,255,0.02);
        }

        .profile-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 100px;
        }

        .reversed-container {
          flex-direction: row-reverse;
        }

        .profile-img-wrapper {
          flex: 1;
          width: 100%;
          max-width: 500px;
          aspect-ratio: 4/5;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
          background: #0a0a0a;
        }

        .profile-img-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: blur(35px) brightness(0.45) saturate(1.1);
          transform: scale(1.25);
          z-index: 0;
        }

        .profile-img {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          transition: transform 1s ease, filter 1s ease;
          filter: grayscale(20%) contrast(108%);
        }

        .profile-img-wrapper:hover .profile-img {
          transform: scale(1.03);
          filter: grayscale(0%) contrast(100%);
        }

        .profile-number {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 10;
          font-family: "Playfair Display", serif;
          font-size: 80px;
          font-weight: 400;
          font-style: italic;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.4);
          line-height: 1;
        }

        .profile-content {
          flex: 1;
        }

        .profile-subtitle {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #d4af37;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .profile-subtitle::before {
          content: "";
          display: block;
          width: 30px;
          height: 1px;
          background: #d4af37;
        }

        .profile-name {
          font-family: "Playfair Display", serif;
          font-size: clamp(40px, 5vw, 64px);
          color: #fff;
          font-weight: 400;
          margin-bottom: 16px;
          line-height: 1.1;
        }

        /* 🌟 HONOR BADGE STYLING 🌟 */
        .honor-badge {
          display: inline-block;
          background: rgba(212, 175, 55, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 4px;
          padding: 8px 14px;
          margin-bottom: 24px;
        }

        .honor-badge span {
          font-family: var(--font-sans), sans-serif;
          font-size: 13px;
          color: #d4af37;
          font-weight: 500;
          letter-spacing: 0.03em;
        }

        .bio-content {
          font-family: "DM Sans", sans-serif;
          font-size: 16px;
          color: rgba(255,255,255,0.7);
          line-height: 1.9;
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .achievement-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .achievement-box {
          background: rgba(255,255,255,0.03);
          padding: 20px 10px;
          text-align: center;
          border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .achievement-box h4 {
          font-family: "Playfair Display", serif;
          font-size: 28px;
          color: #d4af37;
          font-weight: 400;
          margin-bottom: 8px;
        }

        .achievement-box span {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }

        .expertise-container {
          margin-bottom: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .expertise-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .expertise-list li {
          font-family: "DM Sans", sans-serif;
          font-size: 15px;
          color: rgba(255,255,255,0.8);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .expertise-list li::before {
          content: "✦";
          color: #d4af37;
          font-size: 14px;
        }

        .quote-text {
          font-family: "Playfair Display", serif;
          font-style: italic;
          color: #fff;
          font-size: 22px;
          border-left: 3px solid #d4af37;
          padding-left: 20px;
        }

        .wide-img-wrapper {
          width: 50%;
          margin: 0 auto;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 30px 60px rgba(0,0,0,0.8);
          background: #0a0a0a;
        }

        .wide-img {
          display: block;
          width: 100%;
          height: auto; 
          position: relative;
          z-index: 1;
          filter: grayscale(20%) contrast(110%);
        }

        @media(max-width: 1024px) {
          .profile-container {
            gap: 60px;
          }
        }

        @media(max-width: 768px) {
          .profile-container, .reversed-container {
            flex-direction: column;
            text-align: left;
            gap: 40px;
          }
          
          .profile-img-wrapper {
            max-width: 100%;
            aspect-ratio: 4/5; 
          }

          .profile-subtitle {
            justify-content: flex-start;
          }

          .achievement-grid {
            grid-template-columns: 1fr 1fr;
          }
          
          .wide-img-wrapper {
            width: 100%;
          }
        }
      `}} />
      
      <Footer />
    </>
  );
}