'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteProjectButton({ projectId, projectTitle }) {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/projects/${projectId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/projects');
        router.refresh();
      } else {
        alert(data.error || 'Delete failed.');
        setDeleting(false);
        setConfirm(false);
      }
    } catch {
      alert('Network error.');
      setDeleting(false);
      setConfirm(false);
    }
  }

  if (confirm) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
          Delete permanently?
        </span>
        <button onClick={handleDelete} disabled={deleting} style={{ padding: '6px 14px', background: '#cc3333', border: 'none', color: '#fff', fontFamily: '"DM Mono", monospace', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}>
          {deleting ? '...' : 'Yes, Delete'}
        </button>
        <button onClick={() => setConfirm(false)} style={{ padding: '6px 14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', fontFamily: '"DM Mono", monospace', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => setConfirm(true)} style={{ padding: '6px 16px', background: 'transparent', border: '1px solid rgba(200,50,50,0.3)', color: 'rgba(200,100,100,0.7)', fontFamily: '"DM Mono", monospace', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' }}>
      Delete
    </button>
  );
}
