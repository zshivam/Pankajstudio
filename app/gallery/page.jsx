import connectDB from '@/lib/mongodb';
import MediaProject from '@/models/MediaProject';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryView from '@/components/GalleryView';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Gallery — Photos & Videos | Pankaj Studio',
  description: 'Explore our latest photo stream and cinematic video films.',
};

// Helper to standardise YouTube embed URLs
function toEmbedUrl(url) {
  if (!url) return null;
  if (url.includes('youtube.com/embed/')) return url;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export default async function GalleryPage() {
  await connectDB();

  // Fetch all published projects
  const projects = await MediaProject.find({ isPublished: true })
    .select('title slug category coverImage galleryImages videoEmbedUrl is4K')
    .sort({ createdAt: -1 })
    .lean();

  const plainProjects = JSON.parse(JSON.stringify(projects));
  const allImages = [];
  const allVideos = [];

  plainProjects.forEach((p) => {
    // Collect Videos
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

    // Collect Cover Image
    if (p.coverImage?.url || typeof p.coverImage === 'string') {
      const coverUrl = typeof p.coverImage === 'string' ? p.coverImage : p.coverImage.url;
      allImages.push({
        url: coverUrl,
        altText: `${p.title} — Cover`,
      });
    }

    // Collect Gallery Images
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
        
        {/* Ambient Top Gradient */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: 220,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(5,5,5,0.6) 60%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          
          {/* Main Title Header */}
          <header style={{ marginBottom: 40, textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 10, letterSpacing: '0.28em', color: '#d4af37', textTransform: 'uppercase', display: 'block', marginBottom: 12, fontWeight: 500 }}>
              PORTFOLIO STREAM
            </span>
            <h1 style={{ fontFamily: 'var(--font-display, serif)', fontSize: 'clamp(38px, 5.5vw, 68px)', fontStyle: 'italic', fontWeight: 300, color: '#ffffff', marginBottom: 16 }}>
              Visual Gallery
            </h1>
            <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Switch between photo stream and video films below
            </p>
          </header>

          {/* Interactive Tabbed Gallery View (Photos & Videos Switcher) */}
          <GalleryView images={allImages} videos={allVideos} />

        </div>
      </main>
      <Footer />
    </>
  );
}