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

  // Fetch published projects
  const projects = await MediaProject.find({ isPublished: true })
    .sort({ sortOrder: -1, createdAt: -1 })
    .select('title slug category coverImage galleryImages storyHighlight location is4K eventDate')
    .lean();

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', paddingTop: 100, paddingBottom: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          
          {/* Header */}
          <header style={{ marginBottom: 60, textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 10, letterSpacing: '0.25em', color: '#c9a84c', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
              Selected Works
            </span>
            <h1 style={{ fontFamily: 'var(--font-display, serif)', fontSize: 'clamp(36px, 5vw, 64px)', fontStyle: 'italic', fontWeight: 300, marginBottom: 16 }}>
              Albums & Stories
            </h1>
            <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Click any album to open the full photo gallery
            </p>
          </header>

          {/* Project Albums Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 32 }}>
            {projects.map((p) => {
              const coverUrl = typeof p.coverImage === 'string' ? p.coverImage : p.coverImage?.url;
              const photoCount = p.galleryImages?.length || 0;

              return (
                <Link
                  key={p._id.toString()}
                  href={`/work/${p.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <div 
                    style={{ 
                      background: '#141414', 
                      borderRadius: 8, 
                      overflow: 'hidden', 
                      border: '1px solid rgba(255,255,255,0.06)',
                      transition: 'transform 0.3s ease, border-color 0.3s ease'
                    }}
                    className="portfolio-card"
                  >
                    {/* Cover Photo Frame */}
                    <div style={{ position: 'relative', aspectRatio: '16/10', background: '#111', overflow: 'hidden' }}>
                      {coverUrl && (
                        <Image
                          src={coverUrl}
                          alt={p.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectFit: 'cover' }}
                        />
                      )}
                      
                      {/* Photo Count Badge */}
                      <span style={{ 
                        position: 'absolute', 
                        bottom: 12, 
                        right: 12, 
                        background: 'rgba(0,0,0,0.8)', 
                        backdropFilter: 'blur(4px)',
                        padding: '4px 10px', 
                        borderRadius: 4, 
                        fontFamily: 'var(--font-mono, monospace)', 
                        fontSize: 10, 
                        color: '#fff',
                        letterSpacing: '0.08em'
                      }}>
                        📷 {photoCount} Photos
                      </span>

                      {p.is4K && (
                        <span style={{ 
                          position: 'absolute', 
                          top: 12, 
                          left: 12, 
                          background: 'linear-gradient(135deg,#e8d5a3,#c9a84c)', 
                          padding: '2px 8px', 
                          borderRadius: 2, 
                          fontFamily: 'var(--font-mono, monospace)', 
                          fontSize: 9, 
                          color: '#000',
                          fontWeight: 'bold'
                        }}>
                          4K FILM
                        </span>
                      )}
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: 24 }}>
                      <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 9, color: '#c9a84c', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>
                        {p.category?.replace(/-/g, ' ')}
                      </p>
                      
                      <h3 style={{ fontFamily: 'var(--font-display, serif)', fontSize: 22, fontStyle: 'italic', fontWeight: 300, color: '#fff', marginBottom: 8 }}>
                        {p.title}
                      </h3>

                      {p.storyHighlight && (
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: 1.6, fontWeight: 300 }}>
                          {p.storyHighlight}
                        </p>
                      )}

                      <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                        <span>View Album →</span>
                        {p.location?.city && <span>📍 {p.location.city}</span>}
                      </div>
                    </div>

                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </main>

      {/* 🌟 Standard HTML Style Tag (Fixes Server Component Build Crash) */}
      <style>{`
        .portfolio-card:hover {
          transform: translateY(-6px);
          border-color: rgba(201, 168, 76, 0.4) !important;
        }
      `}</style>
      <Footer />
    </>
  );
}