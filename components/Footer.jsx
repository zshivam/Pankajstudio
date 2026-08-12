'use client';
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#050505', position: 'relative', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#fff' }}>
      
      {/* 🌟 TOP SECTION: Columns 🌟 */}
      <div style={{ padding: '80px var(--page-gutter) 60px', maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '60px' }} className="footer-grid">

        {/* 🌟 LEFT COLUMN: Premium Get In Touch 🌟 */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700, color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Get In Touch</h3>
            <span style={{ height: 1, width: 30, background: '#d4af37' }}></span>
          </div>
          
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 400, color: '#fff', marginBottom: 10 }}>Pankaj Studio</h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 24, fontStyle: 'italic' }}>
            Capturing life, preserving legacy.
          </p>

          {/* Premium Contact Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              Near Hanuman Mandir, Jaiswal Katra<br />
              Deoria (U.P.) - <strong style={{ color: '#d4af37' }}>274001</strong>
            </p>
            
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ color: '#d4af37', fontSize: 16 }}>📞</span>
              <a href="tel:+918931883717" style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#fff', textDecoration: 'none' }}>+91 8931883717</a>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
              <a href="tel:+916390237272" style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#fff', textDecoration: 'none' }}>+91 6390237272</a>
            </div>
            
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ color: '#d4af37', fontSize: 16 }}>✉️</span>
              <a href="mailto:pankajstudiodeoria@gmail.com" style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#fff', textDecoration: 'none' }}>pankajstudiodeoria@gmail.com</a>
            </div>
          </div>

          {/* 🌟 Social Media Icons 🌟 */}
          <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: 16 }}>
            
            {/* 🌟 WHATSAPP LINK UPDATED HERE 🌟 */}
            <a 
              href="https://wa.me/916390237272" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp" 
              className="social-btn whatsapp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
            
            <a href="https://www.instagram.com/pankaj_studio_deoria" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-btn instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            
            <a href="https://www.facebook.com/pankajstudiodeoria/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-btn facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            
            <a href="https://www.youtube.com/@PankajStudioDeoria" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-btn youtube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* 🌟 RIGHT COLUMN 1: Quick Links 🌟 */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700, color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Links</h3>
            <span style={{ height: 1, width: 30, background: '#d4af37' }}></span>
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              { name: 'Home', path: '/' },
              { name: 'About Us', path: '/about' },
              { name: 'Our Services', path: '/service' },
              { name: 'Gallery / Work', path: '/work' }
            ].map(link => (
              <li key={link.name} className="footer-link-item">
                <Link href={link.path}>
                  <span className="arrow">❯</span> {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 🌟 RIGHT COLUMN 2: Services 🌟 */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700, color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Services</h3>
            <span style={{ height: 1, width: 30, background: '#d4af37' }}></span>
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              { name: '4K Cinematography', path: '/service' },
              { name: 'Candid Photography', path: '/service' },
              { name: 'Pre Wedding', path: '/service' },
              { name: 'Wedding Films', path: '/service' }
            ].map(link => (
              <li key={link.name} className="footer-link-item">
                <Link href={link.path}>
                  <span className="arrow">❯</span> {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 🌟 BOTTOM BAR 🌟 */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '24px var(--page-gutter)' }} className="footer-bottom-bar">
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            © {year} Pankaj Studio. All rights reserved.
          </p>

          <div style={{ display: 'flex', gap: 16, alignItems: 'center', fontFamily: 'var(--font-sans)', fontSize: 13 }}>
            <Link href="/" className="bottom-link">Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <Link href="#" className="bottom-link">Privacy Policy</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <Link href="/contact" className="bottom-link">Contact Us</Link>
            
            {/* 🌟 HIDDEN ADMIN LINK 🌟 */}
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <Link href="/admin/login" className="admin-hidden-link">
              🔒 Admin
            </Link>
          </div>

        </div>

        {/* Yellow Square Scroll To Top Button */}
        <button 
          onClick={scrollToTop}
          className="scroll-top-btn"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      </div>

      {/* CSS for Links, Hover Effects, and Responsive Layout */}
      <style>{`
        .footer-link-item a {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-family: var(--font-sans);
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }
        .footer-link-item a:hover {
          color: #d4af37;
          transform: translateX(5px);
        }
        .footer-link-item .arrow {
          color: rgba(255,255,255,0.3);
          font-size: 10px;
          transition: color 0.3s ease;
        }
        .footer-link-item a:hover .arrow {
          color: #d4af37;
        }
        
        .bottom-link {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .bottom-link:hover {
          color: #d4af37;
        }

        .admin-hidden-link {
          color: rgba(255,255,255,0.15); 
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .admin-hidden-link:hover {
          color: #d4af37; 
        }

        .footer-bottom-bar {
          position: relative;
        }

        .scroll-top-btn {
          position: absolute;
          right: var(--page-gutter);
          bottom: 20px;
          width: 40px;
          height: 40px;
          background-color: #d4af37;
          color: #000;
          border: none;
          border-radius: 4px;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
        }
        .scroll-top-btn:hover {
          background-color: #fff;
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.5);
        }

        /* 🌟 Social Icons CSS 🌟 */
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .social-btn.whatsapp { color: #25D366; border: 1px solid rgba(37, 211, 102, 0.3); background: rgba(37, 211, 102, 0.05); }
        .social-btn.whatsapp:hover { background: rgba(37, 211, 102, 0.2); transform: translateY(-3px); box-shadow: 0 5px 15px rgba(37, 211, 102, 0.3); }

        .social-btn.instagram { color: #E1306C; border: 1px solid rgba(225, 48, 108, 0.3); background: rgba(225, 48, 108, 0.05); }
        .social-btn.instagram:hover { background: rgba(225, 48, 108, 0.2); transform: translateY(-3px); box-shadow: 0 5px 15px rgba(225, 48, 108, 0.3); }

        .social-btn.facebook { color: #1877F2; border: 1px solid rgba(24, 119, 242, 0.3); background: rgba(24, 119, 242, 0.05); }
        .social-btn.facebook:hover { background: rgba(24, 119, 242, 0.2); transform: translateY(-3px); box-shadow: 0 5px 15px rgba(24, 119, 242, 0.3); }

        .social-btn.youtube { color: #FF0000; border: 1px solid rgba(255, 0, 0, 0.3); background: rgba(255, 0, 0, 0.05); }
        .social-btn.youtube:hover { background: rgba(255, 0, 0, 0.2); transform: translateY(-3px); box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3); }

        @media(max-width: 960px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 60px 40px; }
        }
        @media(max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; gap: 40px; }
          .scroll-top-btn { display: none; }
        }
      `}</style>
    </footer>
  );
}