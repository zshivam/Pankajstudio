import { redirect } from 'next/navigation';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import MediaProject from '@/models/MediaProject';
import { getAdminSession } from '@/lib/auth';
import AdminLogoutButton from '@/components/admin/AdminLogoutButton';
import { formatCardDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Dashboard — Admin' };

async function getStats() {
  await connectDB();
  const [total, published, featured, categories] = await Promise.all([
    MediaProject.countDocuments(),
    MediaProject.countDocuments({ isPublished: true }),
    MediaProject.countDocuments({ featured: true }),
    MediaProject.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
  ]);
  return { total, published, featured, categories };
}

async function getRecentProjects() {
  await connectDB();
  return MediaProject.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .select('title slug category coverImage isPublished featured createdAt eventDate')
    .lean();
}

const CATEGORY_COLORS = {
  wedding: '#8b7355',
  'pre-wedding': '#6b7c6b',
  maternity: '#7c6b7c',
  baby: '#5c7a7a',
  birthday: '#7a6b5c',
  corporate: '#5c6b7a',
  'cinema-4k': '#c9a84c',
};

export default async function AdminDashboard() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const [stats, projects] = await Promise.all([getStats(), getRecentProjects()]);

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', fontFamily: '"DM Sans", system-ui, sans-serif' }}>
      {/* Top bar */}
      <header style={{
        background: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '0 32px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 20, fontStyle: 'italic', color: '#fff' }}>
            Pankaj Studio
          </span>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
            Admin
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
            {session.name}
          </span>
          <AdminLogoutButton />
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px' }}>
        {/* Page title + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
          <div>
            <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 36, fontWeight: 300, fontStyle: 'italic', color: '#fff', marginBottom: 6 }}>
              Dashboard
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
              Manage your portfolio projects and media.
            </p>
          </div>
          <Link href="/admin/projects/new" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '11px 24px', background: '#ffffff', color: '#0f0f0f',
            fontFamily: '"DM Sans", sans-serif', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
          }}>
            + New Project
          </Link>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 48 }}>
          {[
            { label: 'Total Projects', value: stats.total },
            { label: 'Published', value: stats.published },
            { label: 'Featured', value: stats.featured },
            { label: 'Drafts', value: stats.total - stats.published },
          ].map((s) => (
            <div key={s.label} style={{
              background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)',
              padding: '24px 28px',
            }}>
              <p style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 12 }}>
                {s.label}
              </p>
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 44, fontWeight: 300, color: '#fff', lineHeight: 1 }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Two columns: recent projects + categories */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
          {/* Recent projects */}
          <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
                Recent Projects
              </p>
              <Link href="/admin/projects" style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textDecoration: 'none', textTransform: 'uppercase' }}>
                View All →
              </Link>
            </div>
            <div>
              {projects.map((p) => (
                <div key={p._id.toString()} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '16px 28px', borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}>
                  {/* Thumbnail */}
                  <div style={{ width: 52, height: 36, flexShrink: 0, background: '#111', overflow: 'hidden' }}>
                    {p.coverImage?.url && (
                      <img src={p.coverImage.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>
                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, color: '#fff', fontWeight: 400, marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {p.title}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                        {p.category}
                      </span>
                      {p.eventDate && (
                        <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>
                          {formatCardDate(p.eventDate)}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Status badges */}
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    <span style={{ padding: '2px 8px', fontSize: 9, fontFamily: '"DM Mono", monospace', letterSpacing: '0.1em', textTransform: 'uppercase', background: p.isPublished ? 'rgba(100,200,100,0.15)' : 'rgba(255,255,255,0.06)', color: p.isPublished ? '#6dc86d' : 'rgba(255,255,255,0.3)' }}>
                      {p.isPublished ? 'Live' : 'Draft'}
                    </span>
                    {p.featured && (
                      <span style={{ padding: '2px 8px', fontSize: 9, fontFamily: '"DM Mono", monospace', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'rgba(201,168,76,0.15)', color: '#c9a84c' }}>
                        ★ Featured
                      </span>
                    )}
                  </div>
                  {/* Edit link */}
                  <Link href={`/admin/projects/${p._id}`} style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', letterSpacing: '0.1em', flexShrink: 0 }}>
                    Edit →
                  </Link>
                </div>
              ))}
              {projects.length === 0 && (
                <div style={{ padding: '48px 28px', textAlign: 'center' }}>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>No projects yet.</p>
                  <Link href="/admin/projects/new" style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 11, color: '#fff', fontWeight: 500, textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: 2 }}>
                    Add your first project
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Categories breakdown */}
          <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', alignSelf: 'start' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
                By Category
              </p>
            </div>
            <div style={{ padding: '8px 0' }}>
              {stats.categories.map((c) => (
                <div key={c._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: CATEGORY_COLORS[c._id] || '#555', display: 'block', flexShrink: 0 }} />
                    <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                      {c._id}
                    </span>
                  </div>
                  <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 12, color: '#fff' }}>
                    {c.count}
                  </span>
                </div>
              ))}
              {stats.categories.length === 0 && (
                <p style={{ padding: '24px', fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>No data yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
