export default function Loading() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
      
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}>

        {/* 🌟 Cinematic Camera Focus Ring */}
        <div style={{ position: 'relative', width: 70, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="lens-focus-ring" />
          <div className="shutter-dot" />
        </div>

        {/* 🌟 Premium Text Fading */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <span className="studio-text" style={{ fontFamily: 'var(--font-display), "Cormorant Garamond", serif', fontSize: 28, fontStyle: 'italic', color: '#fff' }}>
            Pankaj Studio
          </span>
          <span className="tracking-text" style={{ fontFamily: 'var(--font-sans), sans-serif', fontSize: 10, textTransform: 'uppercase', color: '#d4af37' }}>
            Focusing Lens
          </span>
        </div>

      </div>

      {/* 🌟 Advanced Photography CSS Animations */}
      <style>{`
        /* Ring rotating and scaling like a camera lens adjusting focus */
        .lens-focus-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-top-color: #d4af37;
          border-bottom-color: #d4af37;
          border-radius: 50%;
          animation: focusRotate 1.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }

        /* Center dot glowing like a recording/shutter indicator */
        .shutter-dot {
          width: 6px;
          height: 6px;
          background: #d4af37;
          border-radius: 50%;
          animation: pulse 1.8s ease-in-out infinite alternate;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.8);
        }

        /* Elegant text breathing effect */
        .studio-text {
          animation: breathe 2s ease-in-out infinite alternate;
        }

        /* Subtitle letters spacing out slightly for a cinematic reveal */
        .tracking-text {
          animation: trackSpace 2s ease-in-out infinite alternate;
        }

        /* Keyframes */
        @keyframes focusRotate {
          0% { transform: rotate(0deg) scale(0.85); opacity: 0.6; }
          50% { transform: rotate(180deg) scale(1.05); opacity: 1; }
          100% { transform: rotate(360deg) scale(0.85); opacity: 0.6; }
        }
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.4); opacity: 1; }
        }
        @keyframes breathe {
          0% { opacity: 0.5; text-shadow: 0 0 0 rgba(255,255,255,0); }
          100% { opacity: 1; text-shadow: 0 4px 20px rgba(255,255,255,0.4); }
        }
        @keyframes trackSpace {
          0% { letter-spacing: 0.25em; opacity: 0.5; }
          100% { letter-spacing: 0.5em; opacity: 1; }
        }
      `}</style>
    </div>
  );
}