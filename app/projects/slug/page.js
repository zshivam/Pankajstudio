import connectDB from '@/lib/mongodb';
import MediaProject from '@/models/MediaProject';
import { notFound } from 'next/navigation';

export default async function ProjectDetailPage({ params }) {
  // Next.js 15 mein params ek promise hota hai, isliye await lagana zaroori hai
  const { slug } = await params;

  await connectDB();
  
  // Database se wo project dhoondho jiska slug URL se match karta hai
  const rawProject = await MediaProject.findOne({ slug, isPublished: true }).lean();

  // Agar project nahi mila, toh 404 page dikhao
  if (!rawProject) {
    notFound();
  }

  // MongoDB ObjectId ko string mein convert karne ka wahi Master Trick
  const project = JSON.parse(JSON.stringify(rawProject));

  const coverImgUrl = project.coverImage?.url || '/Copy of DSC03244.jpg';

  return (
    <main style={{ background: '#050505', color: '#fff', minHeight: '100vh', fontFamily: '"DM Sans", sans-serif' }}>
      
      {/* 1. HERO SECTION (Cover Image) */}
      <section style={{ position: 'relative', width: '100%', height: '70vh', display: 'flex', alignItems: 'flex-end', padding: '60px 5%' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img 
            src={coverImgUrl} 
            alt={project.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} 
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #050505 0%, transparent 100%)' }} />
        </div>
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
          <div style={{ textTransform: 'uppercase', color: '#d4af37', letterSpacing: '0.1em', fontSize: 14, marginBottom: 16 }}>
            {project.category?.replace('-', ' ')} {project.location ? `| ${project.location}` : ''}
          </div>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(40px, 6vw, 72px)', fontStyle: 'italic', margin: '0 0 16px 0', lineHeight: 1.1 }}>
            {project.title}
          </h1>
          {project.eventDate && (
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16 }}>
              {new Date(project.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}
        </div>
      </section>

      {/* 2. STORY HIGHLIGHT / DESCRIPTION */}
      {project.storyHighlight && (
        <section style={{ padding: '80px 5%', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', fontStyle: 'italic', fontFamily: '"Cormorant Garamond", serif' }}>
            "{project.storyHighlight}"
          </p>
        </section>
      )}

      {/* 3. GALLERY GRID (Agar images hain toh dikhayenge) */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <section style={{ padding: '40px 5% 120px' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: 16 
          }}>
            {project.galleryImages.map((img, index) => (
              <div key={img.publicId || index} style={{ aspectRatio: '1/1', overflow: 'hidden', borderRadius: 4, background: '#111' }}>
                <img 
                  src={img.url} 
                  alt={`Gallery Image ${index + 1}`} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
            ))}
          </div>
        </section>
      )}

    </main>
  );
}