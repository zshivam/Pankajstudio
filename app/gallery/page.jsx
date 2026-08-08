import connectDB from '@/lib/mongodb';
import MediaProject from '@/models/MediaProject';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryLightbox from '@/components/GalleryLightbox';

// Prevent prerender build issues during database fetches
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Gallery — Photos & Cinematic Films | Pankaj Studio',
  description: 'Explore our latest wedding photo stream and cinematic video films.',
};

// Helper to convert standard YouTube link to embed format safely
function toEmbedUrl(url) {
  if (!url) return null;
  if (url.includes('youtube.com/embed/')) return url;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export default async function GalleryPage() {
  await connectDB();

  // Fetch all published projects with videos and gallery images
  const projects = await MediaProject.find({ isPublished: true })
    .select('title slug category coverImage galleryImages videoEmbedUrl is4K')
    .sort({ createdAt: -1 })
    .lean();

  const plainProjects = JSON.parse(JSON.stringify(projects));
  const allImages = [];
  const allVideos = [];

  plainProjects.forEach((p) => {
    // Collect Video Embeds
    if (p.videoEmbedUrl) {
      const embed = toEmbedUrl(p.videoEmbedUrl);
      if (embed) {
        allVideos.push({
          id: p._id,
          title: p.title,
          category: p.category,
          is4K: p.is4K,
          embedUrl: embed,
          slug: p.slug
        });
      }
    }

    // Collect Cover Photo
    if (p.coverImage?.url || typeof p.coverImage === 'string') {
      const coverUrl = typeof p.coverImage === 'string' ? p.coverImage : p.coverImage.url;
      allImages.push({
        url: coverUrl,
        altText: `${p.title} — Cover`,
      });
    }

    // Collect Gallery Photos
    if (Array.isArray(p.galleryImages)) {
      p.galleryImages.forEach((img, idx) => {
        const imgUrl = typeof img === 'string' ? img : img?.url;
        if (imgUrl) {
          allImages.push({
            url: imgUrl,
            altText: img?.altText || `${p.title} — Frame ${idx + 1}`,
          });
        }
      });
    }
  });

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#050505', color: '#ffffff', paddingTop: 130, paddingBottom: 100, position: 'relative' }}>
        
        {/* Ambient Top Overlay for Navbar Contrast */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: 220,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(5,5,5,0.6) 60%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          
          {/* Main Header */}
          <header style={{ marginBottom: 60, textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 10, letterSpacing: '0.28em', color: '#d4af37', textTransform: 'uppercase', display: 'block', marginBottom: 12, fontWeight: 500 }}>
              GALLERY SHOWCASE
            </span>
            <h1 style={{ fontFamily: 'var(--font-display, serif)', fontSize: 'clamp(38px, 5.5vw, 68px)', fontStyle: 'italic', fontWeight: 300, color: '#ffffff', marginBottom: 16 }}>
              Films & Photo Stream
            </h1>
            <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Explore cinematic wedding films and photo captures
            </p>
          </header>

          {/* 🎬 VIDEO SECTION */}
          {allVideos.length > 0 && (
            <section style={{ marginBottom: 80 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
                <span style={{ display: 'block', width: 28, height: 1, background: '#d4af37' }} />
                <h2 style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 12, letterSpacing: '0.22em', color: '#d4af37', textTransform: 'uppercase', fontWeight: 600 }}>
                  🎬 Cinematic Films ({allVideos.length})
                </h2>
              </div>

              {/* Responsive Video Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 28 }}>
                {allVideos.map((v) => (
                  <div key={v.id} style={{ background: '#111', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {/* Embedded Video Player */}
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: '#000' }}>
                      <iframe
                        src={v.embedUrl}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={v.title}
                      />
                    </div>

                    {/* Video Info */}
                    <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: 4 }}>
                          {v.category?.replace(/-/g, ' ')}
                        </span>
                        <h3 style={{ fontFamily: 'var(--font-display, serif)', fontSize: 18, fontStyle: 'italic', fontWeight: 300, color: '#fff' }}>
                          {v.title}
                        </h3>
                      </div>
                      {v.is4K && (
                        <span style={{ background: 'linear-gradient(135deg,#e8d5a3,#d4af37)', color: '#000', fontSize: 8, fontWeight: 'bold', padding: '3px 8px', borderRadius: 2, fontFamily: 'var(--font-mono, monospace)' }}>
                          4K ULTRA HD
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 📷 PHOTO GALLERY SECTION */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
              <span style={{ display: 'block', width: 28, height: 1, background: '#c8c0b7' }} />
              <h2 style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 12, letterSpacing: '0.22em', color: '#9a9087', textTransform: 'uppercase', fontWeight: 600 }}>
                📷 Photo Stream ({allImages.length})
              </h2>
            </div>

            {allImages.length > 0 ? (
              <GalleryLightbox images={allImages} title="Pankaj Studio Gallery" />
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: '#111', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono, monospace)', fontSize: 12 }}>
                  No photo frames uploaded yet.
                </p>
              </div>
            )}
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}