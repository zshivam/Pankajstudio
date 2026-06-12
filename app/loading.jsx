export default function Loading() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#f8f7f5', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div style={{ width: 36, height: 36, border: '1px solid #e4dfd9', borderTopColor: '#1a1714', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
        <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 13, fontStyle: 'italic', color: '#9a9087' }}>Pankaj Studio</span>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
