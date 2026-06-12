import { redirect } from 'next/navigation';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import MediaProject from '@/models/MediaProject';
import { getAdminSession } from '@/lib/auth';
import AdminLogoutButton from '@/components/admin/AdminLogoutButton';
import { formatCardDate, getCategoryLabel } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Projects — Admin' };

export default async function AdminProjectsPage({ searchParams }) {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const sp = await searchParams;
  const category = sp?.category || 'all';
  const page = parseInt(sp?.page || '1');
  const limit = 20;
  const skip = (page - 1) * limit;

  await connectDB();
  const query = {};
  if (category !== 'all') query.category = category;

  const [projects, total] = await Promise.all([
    MediaProject.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)
      .select('title slug category coverImage isPublished featured is4K eventDate createdAt').lean(),
    MediaProject.countDocuments(query),
  ]);

  const pages = Math.ceil(total / limit);

  const CATEGORIES = ['all', 'wedding', 'pre-wedding', 'maternity', 'baby', 'birthday', 'corporate', 'cinema-4k'];

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', fontFamily: '"DM Sans", system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{ background: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link href="/admin/dashboard" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 20, fontStyle: 'italic', color: '#fff', textDecoration: 'none' }}>Pankaj Studio</Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Projects</span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link href="/admin/projects/new" style={{ padding: '8px 20px', background: '#fff', color: '#0f0f0f', fontFamily: '"DM Sans", sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
            + New
          </Link>
          <AdminLogoutButton />
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 32, fontWeight: 300, fontStyle: 'italic', color: '#fff' }}>
            All Projects <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 16, fontStyle: 'normal', color: 'rgba(255,255,255,0.3)' }}>({total})</span>
          </h1>
        </div>

        {/* Category filter tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: 32, overflowX: 'auto' }}>
          {CATEGORIES.map((cat) => (
            <Link key={cat} href={`/admin/projects?category=${cat}`} style={{
              padding: '10px 18px', fontFamily: '"DM Mono", monospace', fontSize: 9,
              letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none',
              color: category === cat ? '#fff' : 'rgba(255,255,255,0.35)',
              borderBottom: `2px solid ${category === cat ? '#fff' : 'transparent'}`,
              marginBottom: -1, whiteSpace: 'nowrap', transition: 'color 0.2s',
            }}>
              {cat === 'all' ? 'All' : getCategoryLabel(cat)}
            </Link>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)' }}>
          {projects.length > 0 ? projects.map((p, i) => (
            <div key={p._id.toString()} style={{
              display: 'grid', gridTemplateColumns: '60px 1fr 140px 100px 80px 80px',
              alignItems: 'center', gap: 16, padding: '14px 24px',
              borderBottom: i < projects.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}>
              {/* Thumbnail */}
              <div style={{ width: 52, height: 36, background: '#111', overflow: 'hidden', flexShrink: 0 }}>
                {p.coverImage?.url && <img src={p.coverImage.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>
              {/* Title + slug */}
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 14, color: '#fff', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</p>
                <p style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>{p.slug}</p>
              </div>
              {/* Category + date */}
              <div>
                <p style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 3 }}>{p.category}</p>
                {p.eventDate && <p style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>{formatCardDate(p.eventDate)}</p>}
              </div>
              {/* Status */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ padding: '2px 8px', fontSize: 9, fontFamily: '"DM Mono", monospace', letterSpacing: '0.1em', textTransform: 'uppercase', background: p.isPublished ? 'rgba(100,200,100,0.15)' : 'rgba(255,255,255,0.06)', color: p.isPublished ? '#6dc86d' : 'rgba(255,255,255,0.3)', width: 'fit-content' }}>
                  {p.isPublished ? 'Live' : 'Draft'}
                </span>
                {p.featured && <span style={{ padding: '2px 8px', fontSize: 9, fontFamily: '"DM Mono", monospace', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'rgba(201,168,76,0.15)', color: '#c9a84c', width: 'fit-content' }}>Featured</span>}
              </div>
              {/* Edit */}
              <Link href={`/admin/projects/${p._id}`} style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Edit →
              </Link>
              {/* View live */}
              {p.isPublished && (
                <Link href={`/work/${p.slug}`} target="_blank" style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, color: 'rgba(255,255,255,0.25)', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  View ↗
                </Link>
              )}
            </div>
          )) : (
            <div style={{ padding: '60px', textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>No projects found.</p>
              <Link href="/admin/projects/new" style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 11, color: '#fff', fontWeight: 500, textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: 2 }}>
                Create your first project
              </Link>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div style={{ display: 'flex', gap: 8, marginTop: 24, justifyContent: 'center' }}>
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <Link key={p} href={`/admin/projects?category=${category}&page=${p}`} style={{
                width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: '"DM Mono", monospace', fontSize: 11, textDecoration: 'none',
                background: p === page ? '#fff' : 'transparent',
                color: p === page ? '#0f0f0f' : 'rgba(255,255,255,0.4)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}>{p}</Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
