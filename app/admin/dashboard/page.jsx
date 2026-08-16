import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'; // 🌟 Added for Logout
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import MediaProject from '@/models/MediaProject';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Dashboard — Admin' };

// 🌟 SECURE LOGOUT SERVER ACTION 🌟
async function logoutAdmin() {
  'use server';
  cookies().delete('admin_token'); // Cookie delete karega
  redirect('/admin/login'); // Wapas login par bhej dega
}

async function getStats() {
  try {
    await connectDB();
    const [total, published, featured, categories] = await Promise.all([
      MediaProject.countDocuments(),
      MediaProject.countDocuments({ isPublished: true }),
      MediaProject.countDocuments({ featured: true }),
      MediaProject.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    ]);
    return { total, published, featured, categories };
  } catch (err) {
    return { total: 0, published: 0, featured: 0, categories: [] };
  }
}

async function getRecentProjects() {
  try {
    await connectDB();
    const projects = await MediaProject.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('title slug category coverImage isPublished featured createdAt eventDate')
      .lean();
    return JSON.parse(JSON.stringify(projects));
  } catch (err) {
    return [];
  }
}

const CATEGORY_COLORS = {
  'candid-photography': '#a88c77',
  'cinematography': '#4a5d6e',
  'wedding': '#8b7355',
  'ring-ceremony': '#b08d6a',
  'pre-wedding': '#6b7c6b',
  'birthday': '#7a6b5c',
  'maternity': '#7c6b7c',
  'corporate-events': '#5c6b7a',
  'drone-led-wall': '#c9a84c',
};

export default async function AdminDashboard() {
  // 🌟 PAGE LEVEL SECURITY: Fake token yahan pakda jayega
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const [stats, projects] = await Promise.all([getStats(), getRecentProjects()]);

  return (
    <div style={{ maxWidth: 1200 }}>
      
      {/* 🟢 OVERVIEW HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
        <div>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 36, fontWeight: 300, fontStyle: 'italic', color: '#fff', marginBottom: 6 }}>
            Overview
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
            Manage your portfolio projects and media.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          
          {/* 🌟 LOGOUT BUTTON 🌟 */}
          <form action={logoutAdmin}>
            <button type="submit" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', background: 'transparent', color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer',
              fontFamily: '"DM Sans", sans-serif', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 4,
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = '#fff'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            >
              Logout
            </button>
          </form>

          <Link href="/admin/projects/new" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '11px 24px', background: '#d4af37', color: '#000',
            fontFamily: '"DM Sans", sans-serif', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 4
          }}>
            + New Project
          </Link>
        </div>
      </div>

      {/* 🟢 STATS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 48 }}>
        {[
          { label: 'Total Projects', value: stats.total },
          { label: 'Published', value: stats.published },
          { label: 'Featured', value: stats.featured },
          { label: 'Drafts', value: stats.total - stats.published },
        ].map((s) => (
          <div key={s.label} style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', padding: '24px 28px', borderRadius: 4 }}>
            <p style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 12 }}>{s.label}</p>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 44, fontWeight: 300, color: '#fff', lineHeight: 1 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* 🟢 TWO COLUMNS (Projects & Categories) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
        
        {/* Recent Projects List */}
        <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 4 }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Recent Projects</p>
          </div>
          <div>
            {projects.length > 0 ? projects.map((p) => (
              <div key={p._id.toString()} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 28px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ width: 52, height: 36, flexShrink: 0, background: '#111', overflow: 'hidden', borderRadius: 2 }}>
                  {p.coverImage?.url && <img src={p.coverImage.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, color: '#fff', fontWeight: 400, marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{p.category}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <span style={{ padding: '2px 8px', fontSize: 9, fontFamily: '"DM Mono", monospace', background: p.isPublished ? 'rgba(100,200,100,0.15)' : 'rgba(255,255,255,0.06)', color: p.isPublished ? '#6dc86d' : 'rgba(255,255,255,0.3)' }}>
                    {p.isPublished ? 'Live' : 'Draft'}
                  </span>
                </div>
              </div>
            )) : (
              <p style={{ padding: '28px', color: '#666', fontSize: 13 }}>No projects found. Create one!</p>
            )}
          </div>
        </div>

        {/* Categories List */}
        <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', alignSelf: 'start', borderRadius: 4 }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <p style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>By Category</p>
          </div>
          <div style={{ padding: '8px 0' }}>
            {stats.categories.map((c) => (
              <div key={c._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: CATEGORY_COLORS[c._id] || '#555', display: 'block', flexShrink: 0 }} />
                  <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>{c._id}</span>
                </div>
                <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 12, color: '#fff' }}>{c.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}