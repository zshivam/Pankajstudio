'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  // Sidebar toggle state for mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar automatically when route changes (on mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

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
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050505', color: '#fff', fontFamily: '"DM Sans", sans-serif', overflowX: 'hidden' }}>
      
      {/* 📱 MOBILE HEADER (Only visible on small screens) */}
      <div className="mobile-header">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="burger-btn"
          title="Open Menu"
        >
          ☰
        </button>
        <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 20, fontStyle: 'italic', color: '#d4af37' }}>
          Pankaj Studio
        </span>
      </div>

      {/* 🌑 MOBILE OVERLAY (Click outside to close) */}
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 🟢 LEFT SIDEBAR */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div style={{ padding: '32px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 24, fontStyle: 'italic', color: '#d4af37', margin: 0 }}>
              Pankaj Studio
            </h2>
            <p style={{ fontSize: 12, color: '#666', marginTop: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Control Panel</p>
          </div>
          
          {/* Close button for mobile inside sidebar */}
          <button 
            className="mobile-close-btn"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, padding: '0 16px' }}>
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.path);
            
            return (
              <Link 
                key={item.path} 
                href={item.path} 
                onClick={() => setIsSidebarOpen(false)}
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
      <main className="admin-main">
        {children}
      </main>

      {/* 🎨 RESPONSIVE CSS (Handling Desktop vs Mobile) */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Desktop Defaults */
        .mobile-header { display: none; }
        .sidebar-overlay { display: none; }
        .mobile-close-btn { display: none; }
        
        .admin-sidebar {
          width: 260px;
          background: #111;
          border-right: 1px solid #222;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          z-index: 100;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .admin-main {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          height: 100vh;
          position: relative;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .mobile-header {
            display: flex;
            align-items: center;
            padding: 16px 20px;
            background: #111;
            border-bottom: 1px solid #222;
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 90;
          }
          
          .burger-btn {
            background: transparent;
            border: none;
            color: #d4af37;
            font-size: 24px;
            cursor: pointer;
            margin-right: 16px;
            padding: 0;
          }

          .admin-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            transform: translateX(-100%); /* Hidden by default on mobile */
          }
          
          .admin-sidebar.open {
            transform: translateX(0); /* Slides in when opened */
          }

          .sidebar-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(4px);
            z-index: 99;
          }

          .mobile-close-btn {
            display: block;
            background: transparent;
            border: none;
            color: #888;
            font-size: 20px;
            cursor: pointer;
          }

          .admin-main {
            padding: 90px 20px 40px 20px; /* Top padding added to prevent overlap with mobile header */
            width: 100%;
          }
        }
      `}} />
    </div>
  );
}