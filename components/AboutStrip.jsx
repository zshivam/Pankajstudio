import Link from 'next/link';

export default function AboutStrip() {
  return (
    <section 
      className="about-strip"
      style={{ 
        backgroundImage: 'linear-gradient(to right, rgba(15, 15, 15, 0.95) 0%, rgba(15, 15, 15, 0.85) 100%), url("/strip.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '100px var(--page-gutter)', 
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }} 
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'center' }} className="about-grid">
        
        {/* LEFT SIDE: Detailed Story & Ethos */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <span style={{ display: 'block', width: 28, height: 1, background: '#d4af37' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: '#d4af37', textTransform: 'uppercase' }}>Behind The Lens</span>
          </div>
          
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24 }}>
            We Don&apos;t Just Shoot.<br />
            <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.65)' }}>We Remember For You.</em>
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontWeight: 300 }}>
              At <strong>Pankaj Studio</strong>, photography is not just about clicking pictures; it&apos;s about preserving your legacy. For over a decade, our philosophy has been simple:
               <strong>100% Customer Satisfaction</strong> with absolutely 
               <strong>zero compromise on quality</strong>. 
               From the first consultation to the final 4K cinematic delivery, we ensure a flawless and premium experience.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontWeight: 300 }}>
              We believe the best smiles are natural. That&apos;s why we build a highly friendly and family-like bond not just with our clients, but within our entire crew. This comfortable environment allows us to capture your most authentic emotions. You live your dream day effortlessly, while our dedicated team works tirelessly behind the scenes.
            </p>
          </div>

          <Link href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', background: '#d4af37', color: '#000', fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 4, transition: 'all 0.3s ease' }}>
            More About Our Story →
          </Link>
        </div>

        {/* RIGHT SIDE: Premium Highlights */}
        <div style={{ padding: '48px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, backdropFilter: 'blur(10px)' }} className="about-stats">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontStyle: 'italic', color: '#fff', marginBottom: 36, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 16 }}>The Studio Promise</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {[
              { num: '100%', label: 'Client Satisfaction Guarantee' },
              { num: 'Friendly', label: 'Crew & Stress-Free Environment' },
              { num: 'Zero', label: 'Compromise on 4K Quality' },
              { num: '11+', label: 'Years of Trust & Legacy' },
            ].map((s) => (
              <div key={s.num} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', alignItems: 'center', gap: 16 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 300, color: '#d4af37', letterSpacing: '-0.02em', lineHeight: 1 }}>{s.num}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', lineHeight: 1.5 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
      
      <style>{`
        @media(max-width:960px){
          .about-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
          .about-stats { padding: 32px 24px !important; }
        }
      `}</style>
    </section>
  );
}