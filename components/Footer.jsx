'use client';
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: '#0a0a0a', padding: 'var(--section-gap) var(--page-gutter) 40px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', gap: '0 60px', marginBottom: 64 }} className="footer-grid">
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', marginBottom: 14 }}>Pankaj Studio</h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.38)', lineHeight: 1.75, maxWidth: 280, marginBottom: 24 }}>
            Premium photography and cinema for life's most significant chapters. Based in Lucknow. Available across India.
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', padding: '11px 24px', fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}>
            Book a Session
          </Link>
        </div>
        {[
          { title: 'Work', links: [{ href: '/work?category=wedding', label: 'Weddings' }, { href: '/work?category=pre-wedding', label: 'Pre-Wedding' }, { href: '/work?category=maternity', label: 'Maternity' }, { href: '/work?category=baby', label: 'Baby Shoots' }, { href: '/work?category=cinema-4k', label: 'Cinema Lounge' }] },
          { title: 'Studio', links: [{ href: '/about', label: 'About' }, { href: '/about#process', label: 'Our Process' }, { href: '/contact', label: 'Contact' }, { href: '/contact', label: 'Book a Session' }] },
        ].map((col) => (
          <div key={col.title}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', marginBottom: 20 }}>{col.title}</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>© {year} Pankaj Studio. All rights reserved.</p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Lucknow · India</p>
      </div>
      <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr!important;gap:40px 0!important}}`}</style>
    </footer>
  );
}
