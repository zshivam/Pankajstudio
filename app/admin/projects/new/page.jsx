import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/auth';
import ProjectForm from '@/components/admin/ProjectForm';
import AdminLogoutButton from '@/components/admin/AdminLogoutButton';

export const metadata = { title: 'New Project — Admin' };

export default async function NewProjectPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', fontFamily: '"DM Sans", system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{ background: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/admin/dashboard" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 20, fontStyle: 'italic', color: '#fff', textDecoration: 'none' }}>Pankaj Studio</Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
          <Link href="/admin/projects" style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', textDecoration: 'none' }}>Projects</Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>New</span>
        </div>
        <AdminLogoutButton />
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px' }}>
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 32, fontWeight: 300, fontStyle: 'italic', color: '#fff', marginBottom: 6 }}>
            New Project
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
            Fill in the details below. You can save as draft and publish later.
          </p>
        </div>
        <ProjectForm />
      </div>
    </div>
  );
}
