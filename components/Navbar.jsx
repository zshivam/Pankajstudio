'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// 🌟 BRAND LOGO PATH 🌟
const LOGO_PATH = '/pstudiologo.png'; 

// 🌟 UPDATED NAV LINKS (WITH BOTH WORK & GALLERY) 🌟
const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/service', label: 'Services' },
  { 
    label: 'About ▾', 
    isDropdown: true,
    dropdownItems: [
      { href: '/about', label: 'About The Studio' },
      { href: '/about/team', label: 'Behind The Lens' }
    ]
  },
];

// 🌟 MOBILE MENU LINKS 🌟
const MOBILE_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/service', label: 'Services' },
  { href: '/about', label: 'About The Studio' },
  { href: '/about/team', label: 'Behind The Lens' },
  { href: '/contact', label: 'Book a session' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { 
    document.body.style.overflow = menuOpen ? 'hidden' : ''; 
    return () => { document.body.style.overflow = ''; }; 
  }, [menuOpen]);

  return (
    <>
      {/* 🌟 NAVBAR HEADER 🌟 */}
      <header style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 var(--page-gutter)', transition: 'all 0.4s ease', 
        background: scrolled ? 'rgba(5, 5, 5, 0.88)' : 'transparent', 
        backdropFilter: scrolled ? 'blur(16px)' : 'none', 
        borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.12)' : '1px solid transparent' 
      }}>
        
        {/* 🌟 BRANDING BLOCK 🌟 */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }} className="branding-block">
          <img 
            src={LOGO_PATH} 
            alt="Pankaj Studio Logo" 
            style={{ height: scrolled ? 36 : 42, width: 'auto', display: 'block', transition: 'height 0.4s ease' }} 
            className="navbar-logo"
          />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
             <span className="brand-sub" style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 15, fontWeight: 500, color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.4em', marginTop: 2, transition: 'color 0.3s ease' }}>
              Pankaj
               <span className="brand-sub" style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 15, fontWeight: 500, color: '#fcfcfc', textTransform: 'uppercase', letterSpacing: '0.4em', marginTop: 2, transition: 'color 0.3s ease' }}>
               Studio
            </span>
            </span>
          </div>
        </Link>

        {/* 🌟 DESKTOP NAVIGATION 🌟 */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 14 }} className="desktop-nav">
          {NAV_LINKS.map((l, index) => {
            if (l.isDropdown) {
              return (
                <div key={index} className="nav-item-dropdown" style={{ position: 'relative', display: 'inline-block' }}>
                  <span className="nav-link-premium" style={{ 
                    position: 'relative', fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', transition: 'all 0.3s ease', cursor: 'pointer', padding: '8px 14px' 
                  }}>
                  {l.label}
                  </span>
                  
                  <div className="dropdown-content">
                    {l.dropdownItems.map((dropItem) => (
                      <Link key={dropItem.href} href={dropItem.href} className="dropdown-link">
                        {dropItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link key={l.href} href={l.href} className="nav-link-premium" style={{ 
                position: 'relative', fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', color: 'rgba(255,255,255,0.85)', transition: 'all 0.3s ease', padding: '8px 14px'
              }}>
                {l.label}
              </Link>
            );
          })}
          
          <Link href="/contact" className="book-now-btn" style={{ 
            fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', padding: '11px 24px', backgroundColor: '#d4af37', color: '#000000', borderRadius: '4px', marginLeft: '10px', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', boxShadow: '0 4px 15px rgba(212, 175, 55, 0.2)'
          }}>
            BOOK NOW
          </Link>
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" aria-label="Toggle menu" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }}>
          <div style={{ width: 24, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[0, 1, 2].map((i) => {
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
                    display: 'block', height: 2, background: '#ffffff', borderRadius: '2px', transition: 'all 0.3s ease', transform: transformValue, opacity: menuOpen && i === 1 ? 0 : 1 
                  }} 
                />
              );
            })}
          </div>
        </button>
      </header>
      
      {/* 🌟 MOBILE MENU OVERLAY 🌟 */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 40, background: '#050505', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 var(--page-gutter)', transform: menuOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.5s cubic-bezier(0.77,0,0.175,1)' }}>
        
        <Link href="/" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', marginBottom: 40 }}>
          <img 
            src={LOGO_PATH}
            alt="Pankaj Studio Logo" 
            style={{ height: 48, width: 'auto', display: 'block' }} 
          />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontFamily: '"Great Vibes", cursive', fontSize: 36, color: '#ffffff', lineHeight: 1, letterSpacing: '1px' }}>
              Pankaj
            </span>
            <span style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 10, fontWeight: 400, color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.4em', marginTop: 4 }}>
              Studio
            </span>
          </div>
        </Link>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {MOBILE_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="mobile-nav-link" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 5.5vw, 36px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', transition: 'all 0.3s ease' }}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* 🌟 STYLES 🌟 */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@300;400;500;700&display=swap');

        @media(max-width:900px){
          .desktop-nav{display:none!important}
          .mobile-menu-btn{display:flex!important}
        }
        
        .nav-link-premium {
          border-radius: 30px; 
        }
        .nav-link-premium:hover {
          color: #d4af37 !important;
          background-color: rgba(212, 175, 55, 0.08); 
          transform: translateY(-2px); 
          text-shadow: 0 0 10px rgba(212, 175, 55, 0.4); 
        }

        .book-now-btn:hover {
          background-color: #ffffff !important;
          color: #000000 !important;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 10px 25px rgba(212, 175, 55, 0.4) !important;
        }

        .branding-block:hover .brand-name {
          color: #d4af37 !important;
          text-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
        }
        .branding-block:hover .brand-sub {
          color: #ffffff !important;
        }
        .branding-block .navbar-logo {
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .branding-block:hover .navbar-logo {
          transform: scale(1.05) rotate(-2deg);
        }

        .mobile-nav-link:hover {
          color: #d4af37 !important;
          padding-left: 10px;
          text-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
        }

        .dropdown-content {
          display: none;
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background-color: #0a0a0a;
          min-width: 180px;
          box-shadow: 0px 8px 20px 0px rgba(0,0,0,0.8);
          z-index: 50;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          overflow: hidden;
          padding: 8px 0;
          margin-top: 10px;
        }

        .nav-item-dropdown::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 10px;
        }

        .nav-item-dropdown:hover .dropdown-content {
          display: block; 
          animation: fadeInMenu 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .dropdown-link {
          color: rgba(255,255,255,0.7);
          padding: 12px 20px;
          text-decoration: none;
          display: block;
          font-family: var(--font-sans), sans-serif;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: background 0.3s, color 0.3s;
        }

        .dropdown-link:hover {
          background-color: rgba(212, 175, 55, 0.1);
          color: #d4af37;
        }

        @keyframes fadeInMenu {
          from { opacity: 0; transform: translate(-50%, 10px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}} />
    </>
  );
}