import Image from 'next/image';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import MediaProject from '@/models/MediaProject';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryLightbox from '@/components/GalleryLightbox';
import { buildProjectMeta, getCategoryLabel, formatFullDate, toYouTubeEmbed } from '@/lib/utils';

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    await connectDB();
    const project = await MediaProject.findOne({ slug, isPublished: true }).lean();
    if (!project) return { title: 'Project Not Found' };
    return buildProjectMeta(project);
  } catch { return { title: 'Project' }; }
}

export async function generateStaticParams() {
  try {
    await connectDB();
    const slugs = await MediaProject.find({ isPublished: true }).select('slug').lean();
    return slugs.map((p) => ({ slug: p.slug }));
  } catch { return []; }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  await connectDB();
  const project = await MediaProject.findOne({ slug, isPublished: true }).lean();
  if (!project) notFound();

  const embedUrl = project.videoEmbedUrl ? toYouTubeEmbed(project.videoEmbedUrl) : null;
  const coverUrl = typeof project.coverImage === 'string' ? project.coverImage : project.coverImage?.url;

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 64 }}>
        {/* Hero */}
        <div style={{ position: 'relative', width: '100%', height: '72vh', minHeight: 480, background: '#0a0a0a' }}>
          {coverUrl && (
            <Image
              src={coverUrl}
              alt={project.coverImage?.altText || project.title}
              fill
              priority
              quality={90}
              sizes="100vw"
              style={{ objectFit: 'cover', filter: 'brightness(0.8)' }}
              placeholder={project.coverImage?.blurDataUrl ? 'blur' : 'empty'}
              blurDataURL={project.coverImage?.blurDataUrl || undefined}
            />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.2) 50%, transparent 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 var(--page-gutter) 56px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                {getCategoryLabel(project.category)}
              </span>
              {project.is4K && (
                <span style={{ padding: '2px 7px', fontFamily: 'var(--font-sans)', fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', color: '#0a0a0a', textTransform: 'uppercase', background: 'linear-gradient(135deg,#e8d5a3,#c9a84c,#f5e099,#b8902a)', borderRadius: 1 }}>
                  4K ULTRA HD
                </span>
              )}
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 12 }}>
              {project.title}
            </h1>
            {project.location?.city && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                📍 {[project.location.venue, project.location.city, project.location.country].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>
        </div>

        {/* Story Details */}
        <div style={{ background: '#f8f7f5', padding: 'var(--section-gap) var(--page-gutter)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0 80px', maxWidth: 1100 }} className="story-grid">
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28, position: 'sticky', top: 96 }}>
                {project.eventDate && (
                  <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a9087', marginBottom: 7 }}>Date</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 300, color: '#1a1714' }}>{formatFullDate(project.eventDate)}</p>
                  </div>
                )}
                {project.location?.city && (
                  <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a9087', marginBottom: 7 }}>Location</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 300, color: '#1a1714' }}>{[project.location.venue, project.location.city].filter(Boolean).join(', ')}</p>
                  </div>
                )}
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a9087', marginBottom: 7 }}>Category</p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 300, color: '#1a1714' }}>{getCategoryLabel(project.category)}</p>
                </div>
                {project.tags?.length > 0 && (
                  <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a9087', marginBottom: 7 }}>Tags</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {project.tags.map((tag) => (
                        <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', color: '#9a9087', background: '#f0ece7', padding: '4px 9px' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              {project.storyHighlight && (
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 300, fontStyle: 'italic', color: '#1a1714', lineHeight: 1.35, letterSpacing: '-0.01em', marginBottom: 28 }}>
                  &ldquo;{project.storyHighlight}&rdquo;
                </p>
              )}
              {project.description && (
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 300, color: '#5c5348', lineHeight: 1.85 }}>
                  {project.description.split('\n').map((p, i) => (
                    <p key={i} style={{ marginBottom: 16 }}>{p}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Video Film */}
        {embedUrl && (
          <div style={{ background: '#060606', padding: 'var(--section-gap) var(--page-gutter)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
              <span style={{ display: 'block', width: 28, height: 1, background: 'rgba(255,255,255,0.18)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
                {project.is4K ? '4K Cinema Film' : 'Film'}
              </span>
            </div>
            <div style={{ position: 'relative', aspectRatio: '16/9', maxWidth: 1000, overflow: 'hidden', borderRadius: 2 }}>
              <iframe
                src={embedUrl}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${project.title} — Film`}
              />
            </div>
          </div>
        )}

        {/* Gallery Section with Lightbox */}
        {project.galleryImages?.length > 0 && (
          <div style={{ background: '#f8f7f5', padding: 'var(--section-gap) var(--page-gutter)' }}>
            <GalleryLightbox images={project.galleryImages} title={project.title} />
          </div>
        )}

        {/* CTA */}
        <div style={{ background: '#1a1714', padding: 'var(--section-gap) var(--page-gutter)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 50px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', marginBottom: 20 }}>
            Want us to tell your story?
          </h2>
          <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 40px', background: '#f8f7f5', fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: '#1a1714' }}>
            Book a Session
          </a>
        </div>
      </main>

      <style>{`
        @media(max-width:900px){
          .story-grid{grid-template-columns:1fr!important;gap:40px 0!important}
          .gallery-grid{columns:2!important}
        }
        @media(max-width:480px){
          .gallery-grid{columns:1!important}
        }
      `}</style>
      <Footer />
    </>
  );
}