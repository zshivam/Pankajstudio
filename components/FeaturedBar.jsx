'use client';

export default function FeaturedBar() {
  return (
    <div style={{ 
      background: 'linear-gradient(to right, #050505, rgba(10,10,10,0.95), #050505)', 
      borderTop: '1px solid rgba(255,255,255,0.05)', 
      borderBottom: '1px solid rgba(255,255,255,0.05)', 
      padding: '30px 0', 
      overflow: 'hidden' 
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 var(--page-gutter)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '40px' }}>
        
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
          Recognized & Rated For Excellence:
        </p>

        <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500 }}>
            <span style={{ color: '#d4af37', fontSize: 16 }}>★★★★★</span>
            5.0 on Google
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500 }}>
             <span style={{ color: '#d4af37', fontSize: 18 }}>🏆</span>
             Top Rated in UP
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500 }}>
             <span style={{ color: '#d4af37', fontSize: 18 }}>✨</span>
             Premium Choice
          </div>

        </div>

      </div>
    </div>
  );
}