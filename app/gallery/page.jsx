import connectDB from '@/lib/mongodb';
import MediaProject from '@/models/MediaProject';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryLightbox from '@/components/GalleryLightbox';

export const revalidate = 60;

export const metadata = {
  title: 'Photo Gallery — Pankaj Studio',
  description: 'Explore our latest collection of wedding photography, portraits, and event photos.',
};

export default async function GalleryPage() {
  await connectDB();

  // Fetch all published projects
  const projects = await MediaProject.find({ isPublished: true })
    .select('title galleryImages coverImage')
    .sort({ createdAt: -1 })
    .lean();

  // Clean JSON serialization to avoid prerender object errors
  const plainProjects = JSON.parse(JSON.stringify(projects));
  const allImages = [];

  plainProjects.forEach((p) => {
    // Add Cover Image
    if (p.coverImage?.url || typeof p.coverImage === 'string') {
      const coverUrl = typeof p.coverImage === 'string' ? p.coverImage : p.coverImage.url;
      allImages.push({
        url: coverUrl,
        altText: `${p.title} — Cover`,
      });
    }

    // Add Gallery Images
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
          <header style={{ marginBottom: 60, textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 10, letterSpacing: '0.28em', color: '#d4af37', textTransform: 'uppercase', display: 'block', marginBottom: 12, fontWeight: 500 }}>
              VISUAL GALLERY
            </span>
            <h1 style={{ fontFamily: 'var(--font-display, serif)', fontSize: 'clamp(38px, 5.5vw, 68px)', fontStyle: 'italic', fontWeight: 300, color: '#ffffff', marginBottom: 16 }}>
              Photo Stream
            </h1>
            <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Click any photo to expand in full screen view
            </p>
          </header>

          {allImages.length > 0 ? (
            <GalleryLightbox images={allImages} title="Pankaj Studio Gallery" />
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 20px', background: '#111', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono, monospace)', fontSize: 12 }}>
                No gallery photos available yet. Add projects from admin panel to see photos here.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}