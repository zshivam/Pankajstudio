'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const menuItems = [
    { name: 'Dashboard Home', path: '/admin/dashboard', icon: '📊' },
    { name: 'Gallery', path: '/admin/gallery', icon: '🖼️' },
    { name: 'Cinema Lounge', path: '/admin/cinemalounge', icon: '🎬' },
    { name: 'My Projects', path: '/admin/projects', icon: '📸' },
    { name: 'Carousel Images', path: '/admin/hero', icon: '🌟' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050505', color: '#fff', fontFamily: '"DM Sans", sans-serif' }}>
      
      {/* 🟢 LEFT SIDEBAR */}
      <aside style={{ width: 260, background: '#111', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '32px 24px' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 24, fontStyle: 'italic', color: '#d4af37', margin: 0 }}>
            Pankaj Studio
          </h2>
          <p style={{ fontSize: 12, color: '#666', marginTop: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Control Panel</p>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, padding: '0 16px' }}>
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.path);
            
            return (
              <Link 
                key={item.path} 
                href={item.path} 
                style={{
                  padding: '14px 16px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  color: isActive ? '#fff' : '#888',
                  background: isActive ? '#222' : 'transparent',
                  fontWeight: isActive ? 600 : 400,
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 12,
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* 🔴 LOGOUT BUTTON */}
        <div style={{ padding: 24 }}>
          <Link href="/admin/login" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', width: '100%', padding: '12px', background: 'rgba(220, 53, 69, 0.1)', color: '#dc3545', border: '1px solid rgba(220, 53, 69, 0.2)', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold' }}>
            🚪 Logout
          </Link>
        </div>
      </aside>

      {/* 🟢 RIGHT MAIN CONTENT */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto', height: '100vh', position: 'relative' }}>
        {children}
      </main>
      
    </div>
  );
}