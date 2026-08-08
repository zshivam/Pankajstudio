import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import Navbar from '@/components/Navbar';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Our Work — Pankaj Studio' };

async function getGalleryData() {
  await connectDB();
  
  const media = await Gallery.find().sort({ createdAt: -1 }).lean();
  
  // 🌟 Safe mapping: url aur imageUrl dono ko handle kar raha hai
  const allImages = media
    .filter(m => m.type === 'image' && (m.url || m.imageUrl))
    .map(m => m.url || m.imageUrl);

  const allVideos = media
    .filter(m => m.type === 'video' && (m.url || m.videoUrl))
    .map(m => ({
      title: m.title || 'Cinematic Video',
      url: m.url || m.videoUrl || '',
      is4K: Boolean(m.is4K)
    }));

  return { allImages, allVideos };
}

export default async function WorkPage({ searchParams }) {
  const params = await searchParams;
  const view = params?.view || 'photos';

  const { allImages, allVideos } = await getGalleryData();

  // 🌟 FIX 1: Safe Embed check (Prevents undefined.includes crash)
  const isEmbed = (url) => {
    if (!url || typeof url !== 'string') return false;
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com');
  };

  const tabStyle = (isActive) => ({
    padding: '12px 32px',
    borderRadius: '30px',
    fontFamily: '"DM Sans", sans-serif',
    fontSize: 13,
    fontWeight: isActive ? 600 : 400,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: isActive ? '#fff' : '#888',
    background: isActive ? '#1a1a1a' : 'transparent',
    border: isActive ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
    transition: 'all 0.3s ease',
    textDecoration: 'none'
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', paddingTop: 100, paddingBottom: 80 }}>
      
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
        
        <Navbar />
        
        {/* Header & Tabs */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(40px, 6vw, 64px)', fontStyle: 'italic', fontWeight: 300, marginBottom: 24 }}>
            Our Gallery
          </h1>
          
          <div style={{ display: 'inline-flex', background: '#111', padding: 6, borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Link href="?view=photos" style={tabStyle(view === 'photos')}>
              Image Gallery
            </Link>
            <Link href="?view=videos" style={tabStyle(view === 'videos')}>
              4K Videos
            </Link>
          </div>
        </div>

        {/* TAB 1: IMAGE MASONRY GRID */}
        {view === 'photos' && (
          <div style={{ columnCount: 3, columnGap: '16px', width: '100%' }} className="masonry-grid">
            {allImages.length > 0 ? allImages.map((src, index) => (
              <div key={index} style={{ marginBottom: '16px', breakInside: 'avoid', overflow: 'hidden', borderRadius: '8px' }}>
                <img 
                  src={src} 
                  alt={`Gallery Image ${index}`} 
                  loading="lazy"
                  className="gallery-hover-effect"
                  style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                />
              </div>
            )) : (
              <p style={{ textAlign: 'center', color: '#666', gridColumn: '1 / -1', marginTop: 40 }}>No images uploaded yet.</p>
            )}
          </div>
        )}

        {/* TAB 2: 4K VIDEO GRID */}
        {view === 'videos' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 32 }}>
            {allVideos.length > 0 ? allVideos.map((video, index) => (
              <div key={index} style={{ background: '#111', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: '#000' }}>
                  {isEmbed(video.url) ? (
                    <iframe 
                      src={video.url} 
                      title={video.title}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    />
                  ) : (
                    <video 
                      src={video.url} 
                      controls 
                      preload="metadata" 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  )}
                </div>
                <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 16, fontWeight: 400 }}>{video.title}</h3>
                  {video.is4K && (
                    <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, padding: '4px 8px', background: 'rgba(201,168,76,0.1)', color: '#c9a84c', borderRadius: 4, letterSpacing: '0.1em' }}>
                      4K ULTRA
                    </span>
                  )}
                </div>
              </div>
            )) : (
              <p style={{ textAlign: 'center', color: '#666', gridColumn: '1 / -1', marginTop: 40 }}>No videos uploaded yet.</p>
            )}
          </div>
        )}

      </div>

      <style>{`
        .gallery-hover-effect {
          transition: transform 0.5s ease;
          cursor: pointer;
        }
        .gallery-hover-effect:hover {
          transform: scale(1.03);
        }
        @media (max-width: 1024px) { .masonry-grid { column-count: 2 !important; } }
        @media (max-width: 640px) { .masonry-grid { column-count: 1 !important; } }
      `}</style>

    </div>
  );
}