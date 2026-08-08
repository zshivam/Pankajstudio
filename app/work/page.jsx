import Link from 'next/link';
import Image from 'next/image';
import connectDB from '@/lib/mongodb';
import MediaProject from '@/models/MediaProject';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const revalidate = 60;

export const metadata = {
  title: 'Our Portfolio & Albums — Pankaj Studio',
  description: 'Explore our latest wedding photography, cinematography, and event albums.',
};

export default async function WorkPage() {
  await connectDB();

  // Fetch published projects from MongoDB
  const projects = await MediaProject.find({ isPublished: true })
    .sort({ sortOrder: -1, createdAt: -1 })
    .select('title slug category coverImage galleryImages storyHighlight location is4K eventDate')
    .lean();

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#050505', color: '#ffffff', paddingTop: 130, paddingBottom: 100, position: 'relative' }}>
        
        {/* 🌟 TOP AMBIENT GRADIENT FOR NAVBAR CONTRAST & VISIBILITY 🌟 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 220,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(5,5,5,0.6) 60%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          
          {/* Header */}
          <header style={{ marginBottom: 60, textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 10, letterSpacing: '0.28em', color: '#d4af37', textTransform: 'uppercase', display: 'block', marginBottom: 12, fontWeight: 500 }}>
              PORTFOLIO GALLERIES
            </span>
            <h1 style={{ fontFamily: 'var(--font-display, serif)', fontSize: 'clamp(38px, 5.5vw, 68px)', fontStyle: 'italic', fontWeight: 300, color: '#ffffff', marginBottom: 16, lineHeight: 1.1 }}>
              Albums & Stories
            </h1>
            <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Click any album to view full event gallery
            </p>
          </header>

          {/* Project Albums Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 32 }}>
            {projects.map((p) => {
              const coverUrl = typeof p.coverImage === 'string' ? p.coverImage : p.coverImage?.url;
              const photoCount = p.galleryImages?.length || 0;

              return (
                /* 🌟 FULL CARD WRAPPED IN CLICKABLE LINK 🌟 */
                <Link
                  key={p._id.toString()}
                  href={`/work/${p.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block', cursor: 'pointer' }}
                >
                  <div 
                    style={{ 
                      background: '#121212', 
                      borderRadius: 8, 
                      overflow: 'hidden', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: 'pointer',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
                    }}
                    className="portfolio-card"
                  >
                    {/* Cover Photo Frame */}
                    <div style={{ position: 'relative', aspectRatio: '16/10', background: '#0a0a0a', overflow: 'hidden' }}>
                      {coverUrl && (
                        <Image
                          src={coverUrl}
                          alt={p.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectFit: 'cover', transition: 'transform 0.5s ease', filter: 'brightness(0.9)' }}
                          className="card-img"
                        />
                      )}

                      {/* Hover Overlay Button */}
                      <div className="card-overlay">
                        <span style={{ 
                          padding: '10px 22px', 
                          background: '#d4af37', 
                          color: '#000000', 
                          fontFamily: 'var(--font-mono, monospace)', 
                          fontSize: 10, 
                          fontWeight: 700, 
                          letterSpacing: '0.15em', 
                          textTransform: 'uppercase',
                          borderRadius: 4,
                          boxShadow: '0 6px 20px rgba(0,0,0,0.6)'
                        }}>
                          OPEN ALBUM ↗
                        </span>
                      </div>
                      
                      {/* Photo Count Badge */}
                      <span style={{ 
                        position: 'absolute', 
                        bottom: 12, 
                        right: 12, 
                        background: 'rgba(0,0,0,0.85)', 
                        backdropFilter: 'blur(6px)',
                        padding: '5px 12px', 
                        borderRadius: 4, 
                        border: '1px solid rgba(255,255,255,0.15)',
                        fontFamily: 'var(--font-mono, monospace)', 
                        fontSize: 10, 
                        color: '#ffffff',
                        letterSpacing: '0.08em',
                        zIndex: 2
                      }}>
                        📷 {photoCount} Photos
                      </span>

                      {p.is4K && (
                        <span style={{ 
                          position: 'absolute', 
                          top: 12, 
                          left: 12, 
                          background: 'linear-gradient(135deg,#e8d5a3,#d4af37)', 
                          padding: '3px 9px', 
                          borderRadius: 3, 
                          fontFamily: 'var(--font-mono, monospace)', 
                          fontSize: 9, 
                          color: '#000000',
                          fontWeight: 'bold',
                          letterSpacing: '0.1em',
                          zIndex: 2
                        }}>
                          4K CINEMA
                        </span>
                      )}
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: 24 }}>
                      <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 9, color: '#d4af37', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 500 }}>
                        {p.category?.replace(/-/g, ' ')}
                      </p>
                      
                      <h3 style={{ fontFamily: 'var(--font-display, serif)', fontSize: 23, fontStyle: 'italic', fontWeight: 300, color: '#ffffff', marginBottom: 10, lineHeight: 1.2 }}>
                        {p.title}
                      </h3>

                      {p.storyHighlight && (
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: 1.6, fontWeight: 300, marginBottom: 16 }}>
                          {p.storyHighlight}
                        </p>
                      )}

                      {/* Explicit Action Button */}
                      <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '7px 16px',
                          background: 'rgba(212, 175, 55, 0.12)',
                          border: '1px solid rgba(212, 175, 55, 0.4)',
                          borderRadius: 4,
                          color: '#d4af37',
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: 10,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          transition: 'all 0.3s ease'
                        }} className="action-btn">
                          View Full Album →
                        </span>
                        {p.location?.city && (
                          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.08em' }}>
                            📍 {p.location.city}
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </main>

      {/* 🌟 STANDARD HTML STYLES FOR SAFE SERVER-SIDE RENDERING 🌟 */}
      <style>{`
        .portfolio-card:hover {
          transform: translateY(-6px);
          border-color: rgba(212, 175, 55, 0.6) !important;
          box-shadow: 0 16px 35px rgba(0, 0, 0, 0.6) !important;
        }
        .portfolio-card:hover .card-img {
          transform: scale(1.06);
          filter: brightness(1) !important;
        }
        .portfolio-card:hover .action-btn {
          background-color: #d4af37 !important;
          color: #000000 !important;
        }
        .card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 1;
        }
        .portfolio-card:hover .card-overlay {
          opacity: 1;
        }
      `}</style>
      <Footer />
    </>
  );
}