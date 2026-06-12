'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Login failed.');
        setLoading(false);
        return;
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0f0f0f', fontFamily: '"DM Sans", system-ui, sans-serif',
    }}>
      <div style={{ width: '100%', maxWidth: 400, padding: '0 24px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 32, fontWeight: 400, fontStyle: 'italic', color: '#fff', letterSpacing: '0.01em', marginBottom: 8 }}>
            Pankaj Studio
          </h1>
          <p style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
            Admin Panel
          </p>
        </div>

        {/* Form card */}
        <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)', padding: 40 }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <label style={labelStyle}>Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                autoComplete="username"
                style={inputStyle}
                placeholder="admin"
              />
            </div>
            <div>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                autoComplete="current-password"
                style={inputStyle}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p style={{ fontFamily: '"DM Mono", monospace', fontSize: 11, color: '#ff6b6b', letterSpacing: '0.05em' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '14px', background: loading ? '#333' : '#ffffff',
                color: '#0f0f0f', fontFamily: '"DM Sans", sans-serif',
                fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
                border: 'none', cursor: loading ? 'wait' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        input::placeholder { color: rgba(255,255,255,0.2); }
        input:focus { outline: none; border-color: rgba(255,255,255,0.5) !important; }
      `}</style>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontFamily: '"DM Mono", monospace',
  fontSize: 9,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
  marginBottom: 8,
};

const inputStyle = {
  width: '100%',
  padding: '12px 0',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.15)',
  color: '#ffffff',
  fontFamily: '"DM Sans", sans-serif',
  fontSize: 14,
  fontWeight: 300,
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};
