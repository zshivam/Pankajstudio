import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
import MediaProject from '@/models/MediaProject';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryView from '@/components/GalleryView';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Gallery — Photos & Videos | Pankaj Studio',
  description: 'Complete visual feed combining photos and video films from all albums and studio uploads.',
};

// YouTube Embed URL Formatter
function toEmbedUrl(url) {
  if (!url) return null;
  if (url.includes('youtube.com/embed/')) return url;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export default async function GalleryPage() {
  await connectDB();

  let projects = [];
  let galleryItems = [];

  try {
    // 1. Fetch Work / Albums Projects
    const projRes = await MediaProject.find({ isPublished: true })
      .select('title slug category coverImage galleryImages videoEmbedUrl is4K')
      .sort({ createdAt: -1 })
      .lean();

    projects = JSON.parse(JSON.stringify(projRes || []));

    // 2. Safe Dynamic Model Lookup (Build Error-Free)
    const GalleryModel = mongoose.models.GalleryItem || mongoose.models.Gallery || mongoose.models.Media || null;

    if (GalleryModel) {
      const itemRes = await GalleryModel.find({ isPublished: true })
        .sort({ createdAt: -1 })
        .lean();
      galleryItems = JSON.parse(JSON.stringify(itemRes || []));
    }
  } catch (err) {
    console.error('Data fetch error on gallery page:', err);
  }

  const allImages = [];
  const allVideos = [];

  // Process Photos & Videos from Work/Albums
  projects.forEach((p) => {
    // Videos
    if (p.videoEmbedUrl) {
      const embed = toEmbedUrl(p.videoEmbedUrl);
      if (embed) {
        allVideos.push({
          id: `work-v-${p._id}`,
          title: p.title,
          category: p.category || 'Album Film',
          is4K: p.is4K || false,
          embedUrl: embed,
        });
      }
    }

    // Cover Photo
    if (p.coverImage?.url || typeof p.coverImage === 'string') {
      const coverUrl = typeof p.coverImage === 'string' ? p.coverImage : p.coverImage.url;
      allImages.push({
        url: coverUrl,
        altText: `${p.title} — Cover`,
      });
    }

    // Gallery Photos
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

  // Process Photos & Videos from Direct Admin Gallery Uploads (if model registered)
  galleryItems.forEach((item) => {
    if (item.type === 'video' || item.videoEmbedUrl || item.videoUrl) {
      const videoSrc = item.videoEmbedUrl || item.videoUrl;
      const embed = toEmbedUrl(videoSrc);
      if (embed) {
        allVideos.push({
          id: `gallery-v-${item._id}`,
          title: item.title || 'Studio Film',
          category: item.category || 'Gallery Video',
          is4K: item.is4K || false,
          embedUrl: embed,
        });
      }
    } else if (item.type === 'photo' || item.imageUrl || item.url) {
      const imgUrl = item.imageUrl || item.url;
      if (imgUrl) {
        allImages.push({
          url: imgUrl,
          altText: item.title || item.altText || 'Studio Gallery Frame',
        });
      }
    }
  });

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#050505', color: '#ffffff', paddingTop: 130, paddingBottom: 100, position: 'relative' }}>
        
        {/* Top Dark Overlay for Navbar Visibility */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: 220,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(5,5,5,0.6) 60%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          
          {/* Page Header */}
          <header style={{ marginBottom: 40, textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 10, letterSpacing: '0.28em', color: '#d4af37', textTransform: 'uppercase', display: 'block', marginBottom: 12, fontWeight: 500 }}>
              COMPLETE VISUAL FEED
            </span>
            <h1 style={{ fontFamily: 'var(--font-display, serif)', fontSize: 'clamp(38px, 5.5vw, 68px)', fontStyle: 'italic', fontWeight: 300, color: '#ffffff', marginBottom: 16 }}>
              Photos & Videos
            </h1>
            <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Switch between master photo stream and video films
            </p>
          </header>

          {/* Interactive Photo & Video Tab Switcher */}
          <GalleryView images={allImages} videos={allVideos} />

        </div>
      </main>
      <Footer />
    </>
  );
}