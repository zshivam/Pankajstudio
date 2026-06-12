'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      style={{
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.12)',
        padding: '6px 16px',
        fontFamily: '"DM Mono", monospace',
        fontSize: 9,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.4)',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      {loading ? '...' : 'Sign Out'}
    </button>
  );
}
