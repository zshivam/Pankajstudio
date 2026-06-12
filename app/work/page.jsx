import { Suspense } from 'react';
import connectDB from '@/lib/mongodb';
import MediaProject from '@/models/MediaProject';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MilestonesHub from '@/components/MilestonesHub';

export const revalidate = 60;
export const metadata = { title: 'Work', description: 'Browse our full portfolio — weddings, pre-wedding shoots, maternity sessions, and 4K cinema films.' };

async function getProjects() {
  try {
    await connectDB();
    return MediaProject.find({ isPublished: true, category: { $ne: 'cinema-4k' } })
      .sort({ featured: -1, sortOrder: -1, eventDate: -1 })
      .select('title slug category storyHighlight coverImage location eventDate is4K featured').lean();
  } catch { return []; }
}

async function getCinemaProjects() {
  try {
    await connectDB();
    return MediaProject.findCinemaLounge(20);
  } catch { return []; }
}

export default async function WorkPage() {
  const [projects, cinemaProjects] = await Promise.all([getProjects(), getCinemaProjects()]);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 64 }}>
        {/* Header */}
        <div style={{ background: '#f8f7f5', padding: '72px var(--page-gutter) 0', borderBottom: '1px solid #e4dfd9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <span style={{ display: 'block', width: 28, height: 1, background: '#c8c0b7' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: '#9a9087', textTransform: 'uppercase' }}>Archive</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px, 5vw, 64px)', fontWeight: 300, fontStyle: 'italic', color: '#1a1714', lineHeight: 1.05, letterSpacing: '-0.02em', paddingBottom: 48 }}>
            All Work
          </h1>
        </div>

        {/* Portfolio grid */}
        <Suspense fallback={<div style={{ height: 400 }} />}>
          <MilestonesHub projects={projects} />
        </Suspense>

        {/* Cinema section */}
        {cinemaProjects.length > 0 && (
          <section style={{ background: '#060606', padding: 'var(--section-gap) var(--page-gutter)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
              <span style={{ display: 'block', width: 28, height: 1, background: 'rgba(255,255,255,0.18)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>Cinema Lounge</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 48 }}>4K Films</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 20 }}>
              {cinemaProjects.map((p) => (
                <a key={p._id || p.slug} href={`/work/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', borderRadius: 2 }}>
                    {p.coverImage?.url && <img src={p.coverImage.url} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.75)' }} loading="lazy" />}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)', zIndex: 1 }} />
                    {p.is4K && <span style={{ position: 'absolute', top: 12, left: 12, zIndex: 2, padding: '2px 7px', fontFamily: 'var(--font-sans)', fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', color: '#0a0a0a', textTransform: 'uppercase', background: 'linear-gradient(135deg,#e8d5a3,#c9a84c,#f5e099,#b8902a)', borderRadius: 1 }}>4K ULTRA HD</span>}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2, padding: '0 16px 16px' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, fontStyle: 'italic', color: '#fff', lineHeight: 1.2 }}>{p.title}</h3>
                      {p.location?.city && <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: 5 }}>{p.location.city}</p>}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
