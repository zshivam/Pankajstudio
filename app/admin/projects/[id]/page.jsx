import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import MediaProject from '@/models/MediaProject';
import { getAdminSession } from '@/lib/auth';
import ProjectForm from '@/components/admin/ProjectForm';
import AdminLogoutButton from '@/components/admin/AdminLogoutButton';
import DeleteProjectButton from '@/components/admin/DeleteProjectButton';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    await connectDB();
    const p = await MediaProject.findById(id).select('title').lean();
    return { title: p ? `Edit: ${p.title} — Admin` : 'Edit Project — Admin' };
  } catch { return { title: 'Edit Project — Admin' }; }
}

export default async function EditProjectPage({ params }) {
  const { id } = await params;
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  await connectDB();
  const project = await MediaProject.findById(id).lean();
  if (!project) notFound();

  // Serialize for client
  const serialized = JSON.parse(JSON.stringify(project));

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', fontFamily: '"DM Sans", system-ui, sans-serif' }}>
      <header style={{ background: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/admin/dashboard" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 20, fontStyle: 'italic', color: '#fff', textDecoration: 'none' }}>Pankaj Studio</Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
          <Link href="/admin/projects" style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', textDecoration: 'none' }}>Projects</Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {project.title}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {project.isPublished && (
            <Link href={`/work/${project.slug}`} target="_blank" style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              View Live ↗
            </Link>
          )}
          <DeleteProjectButton projectId={id} projectTitle={project.title} />
          <AdminLogoutButton />
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px' }}>
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 32, fontWeight: 300, fontStyle: 'italic', color: '#fff', marginBottom: 6 }}>
            Edit Project
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
            Last updated: {new Date(project.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
        <ProjectForm project={serialized} />
      </div>
    </div>
  );
}
