'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/work?category=wedding', label: 'Weddings' },
  { href: '/work?category=cinema-4k', label: 'Cinema' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [menuOpen]);

  const dark = !scrolled;

  return (
    <>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 var(--page-gutter)', transition: 'background 0.4s, border-color 0.4s', background: scrolled ? 'rgba(248,247,245,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottom: scrolled ? '1px solid #e4dfd9' : '1px solid transparent' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, fontStyle: 'italic', textDecoration: 'none', color: dark ? '#ffffff' : '#1a1714', transition: 'color 0.4s' }}>
          Pankaj Studio
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="desktop-nav">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: dark ? 'rgba(255,255,255,0.75)' : '#7a7268', transition: 'color 0.25s' }}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', padding: '9px 20px', border: `1px solid ${dark ? 'rgba(255,255,255,0.5)' : '#1a1714'}`, color: dark ? '#ffffff' : '#1a1714', transition: 'all 0.25s' }}>
            Book
          </Link>
        </nav>
        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" aria-label="Toggle menu" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }}>
          <div style={{ width: 24, display: 'flex', flexDirection: 'column', gap: 5 }}>
{[0, 1, 2].map((i) => {
  // Complex logic ko simple variables mein tod diya hai
  let transformValue = 'none';
  if (menuOpen) {
    if (i === 0) transformValue = 'translateY(6px) rotate(45deg)';
    if (i === 1) transformValue = 'scaleX(0)';
    if (i === 2) transformValue = 'translateY(-6px) rotate(-45deg)';
  }

  return (
    <span 
      key={i} 
      style={{ 
        display: 'block', 
        height: 1, 
        background: typeof dark !== 'undefined' && dark ? '#fff' : '#1a1714', 
        transition: 'all 0.3s', 
        transform: transformValue, 
        opacity: menuOpen && i === 1 ? 0 : 1 
      }} 
    />
  );
})}          </div>
        </button>
      </header>
      {/* Mobile menu */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 40, background: '#f8f7f5', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 var(--page-gutter)', transform: menuOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.4s cubic-bezier(0.77,0,0.175,1)' }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {[...NAV_LINKS, { href: '/contact', label: 'Book a Session' }].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 300, fontStyle: 'italic', color: '#1a1714', textDecoration: 'none' }}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <style>{`@media(max-width:768px){.desktop-nav{display:none!important}.mobile-menu-btn{display:flex!important}}`}</style>
    </>
  );
}
