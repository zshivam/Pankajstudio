'use client';

export default function ByTheNumbers() {
  return (
    <section style={{ 
      padding: '100px var(--page-gutter)', 
      // 🌟 Parallax Strip Background Added 🌟
      backgroundImage: 'linear-gradient(to bottom, rgba(5, 5, 5, 0.90), rgba(5, 5, 5, 0.95)), url("/strip.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed', // Parallax effect
      borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
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
        .stat-card {
          padding: 40px 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          backdrop-filter: blur(5px);
          transition: transform 0.3s ease, background 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-5px);
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
      `}</style>
    </section>
  );
}