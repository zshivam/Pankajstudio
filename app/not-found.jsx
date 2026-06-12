import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: '404 — Page Not Found' };

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 var(--page-gutter)', textAlign: 'center', background: '#f8f7f5' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: '#b8b0a8', textTransform: 'uppercase', marginBottom: 24 }}>404</span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 300, fontStyle: 'italic', color: '#1a1714', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 20 }}>
          This frame<br />does not exist.
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 300, color: '#7a7268', lineHeight: 1.7, maxWidth: 340, marginBottom: 40 }}>
          The page you are looking for may have moved or never existed.
        </p>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" style={{ padding: '13px 32px', background: '#1a1714', fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: '#f8f7f5' }}>
            Back Home
          </Link>
          <Link href="/work" style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: '#1a1714', borderBottom: '1px solid rgba(26,23,20,0.3)', paddingBottom: 2 }}>
            View Work
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
