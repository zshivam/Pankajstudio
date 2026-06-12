import Link from 'next/link';

export default function AboutStrip() {
  return (
    <section style={{ background: '#1a1714', padding: 'var(--section-gap) var(--page-gutter)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px', alignItems: 'center' }} className="about-strip">
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <span style={{ display: 'block', width: 28, height: 1, background: 'rgba(255,255,255,0.2)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>The Studio</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 20 }}>
          We Don&apos;t Just Shoot.<br />
          <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>We Remember For You.</em>
        </h2>
        <Link href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: 3 }}>
          Our Story
        </Link>
      </div>
      <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: 60 }} className="about-strip-right">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {[
            { num: '340+', label: 'Weddings Documented' },
            { num: '8', label: 'Years of Studio Practice' },
            { num: '4K', label: 'Ultra HD Cinema Since 2021' },
          ].map((s) => (
            <div key={s.num} style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{s.num}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.about-strip{grid-template-columns:1fr!important;gap:48px 0!important}.about-strip-right{border-left:none!important;padding-left:0!important;border-top:1px solid rgba(255,255,255,0.08);padding-top:40px!important}}`}</style>
    </section>
  );
}
