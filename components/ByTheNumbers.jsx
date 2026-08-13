'use client';

export default function ByTheNumbers() {
  return (
    <section className="impact-section">
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: '#d4af37', textTransform: 'uppercase', marginBottom: 16 }}>Our Impact</span>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, fontStyle: 'italic', color: '#fff' }}>
            A Legacy of <span style={{ color: '#d4af37' }}>Beautiful Moments</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40, textAlign: 'center' }}>
          
          <div className="stat-card">
            <h3 className="stat-number">2000+</h3>
            <p className="stat-label">Weddings Covered</p>
          </div>

          <div className="stat-card">
            <h3 className="stat-number">15+</h3>
            <p className="stat-label">Years of Experience</p>
          </div>

          <div className="stat-card">
            <h3 className="stat-number">100%</h3>
            <p className="stat-label">Client Satisfaction</p>
          </div>

          <div className="stat-card">
            <h3 className="stat-number">4K</h3>
            <p className="stat-label">Cinematic Quality</p>
          </div>

        </div>
      </div>

      <style>{`
        /* 🌟 Optimized Background Styling 🌟 */
        .impact-section {
          padding: 100px var(--page-gutter);
          background-image: linear-gradient(to bottom, rgba(5, 5, 5, 0.90), rgba(5, 5, 5, 0.95)), url("/strip.jpg");
          background-size: cover;
          background-position: center;
          background-attachment: fixed; /* Desktop par smoothly chalega */
          border-top: 1px solid rgba(255,255,255,0.05);
          position: relative;
        }

        /* 🌟 GPU Accelerated Cards 🌟 */
        .stat-card {
          padding: 40px 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          backdrop-filter: blur(5px);
          
          /* Lag-killer properties for hover effects */
          will-change: transform, background-color, border-color;
          transform: translateZ(0); 
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease, border-color 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px) translateZ(0);
          background: rgba(255,255,255,0.05);
          border-color: rgba(212, 175, 55, 0.3);
        }
        
        .stat-number {
          font-family: "Playfair Display", serif;
          font-size: 56px;
          color: #d4af37;
          font-weight: 400;
          margin-bottom: 12px;
          text-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }
        
        .stat-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
        }

        /* 📱 MOBILE LAG FIX (The Magic Wand) 📱 */
        @media (max-width: 768px) {
          .impact-section {
            background-attachment: scroll !important; /* Mobile par parallax off */
          }
          .stat-card {
            backdrop-filter: none; /* Mobile par blur off taaki scroll na atke */
            background: rgba(20, 20, 20, 0.6); /* Fallback background */
          }
        }
      `}</style>
    </section>
  );
}