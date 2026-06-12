'use client';
import { useState, useRef, useEffect, useId } from 'react';

const DEFAULT_FAQS = [
  { q: 'How far in advance should we book?', a: 'We recommend booking 3–6 months ahead for weddings, especially Oct–Feb. For maternity and newborn sessions, 4–6 weeks typically works. Corporate events are best confirmed 4–8 weeks prior.' },
  { q: "What's included in a wedding package?", a: 'Full-day coverage, a second shooter, a private gallery delivered in 4–6 weeks, and 600–900 high-resolution images. Albums, prints, drone coverage, and pre-wedding sessions are available as add-ons.' },
  { q: 'Do you travel for destination shoots?', a: "Absolutely. We have covered weddings across India and international destinations. Travel, accommodation, and logistics are quoted separately based on your location." },
  { q: 'How long until we receive our photos?', a: 'Edited photos arrive within 4–6 weeks via a private gallery link. Cinematic films take 8–12 weeks due to colour grading and sound design. Rush delivery is available for an additional fee.' },
  { q: 'What is your editing style?', a: "Editorial and cinematic — natural skin tones, rich contrast, timeless filmic quality. We do not apply heavy presets that date quickly. Our style is consistent across all deliverables." },
  { q: 'What happens if you are unavailable on our date?', a: 'Your date is locked from the moment your booking deposit clears. In the rare event of an emergency, we maintain a trusted network of associate photographers trained to our exact standards.' },
  { q: 'Do you offer a 4K cinema package for events?', a: 'Yes — our Cinema Lounge tier is available for weddings, milestone birthdays, and corporate events. Footage in 4K Ultra HD, full colour grade, delivered as a private streaming link and a 4K master file.' },
  { q: 'How is payment structured?', a: '30% retainer upon signing to secure your date. Remaining balance due 7 days before the event. Cinema projects carry an additional 20% on rough-cut delivery. Payments via bank transfer, UPI, or Razorpay.' },
];

function AccordionItem({ item, index, isOpen, onToggle, itemId }) {
  const bodyRef = useRef(null);
  const [height, setHeight] = useState('0px');

  useEffect(() => {
    if (!bodyRef.current) return;
    setHeight(isOpen ? `${bodyRef.current.scrollHeight}px` : '0px');
  }, [isOpen]);

  return (
    <div style={{ borderTop: `1px solid ${isOpen ? '#1a1714' : '#e4dfd9'}`, transition: 'border-color 0.3s' }}>
      <button
        id={`${itemId}-btn`}
        aria-expanded={isOpen}
        aria-controls={`${itemId}-body`}
        onClick={onToggle}
        style={{ display: 'grid', gridTemplateColumns: '32px 1fr 24px', alignItems: 'start', gap: 16, width: '100%', textAlign: 'left', padding: '20px 0', background: 'transparent', border: 'none', cursor: 'pointer' }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: '#b8b0a8', paddingTop: 3 }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 500, fontStyle: isOpen ? 'italic' : 'normal', color: '#1a1714', lineHeight: 1.3, letterSpacing: '-0.01em', transition: 'font-style 0.2s' }}>
          {item.q}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 3, transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke={isOpen ? '#1a1714' : '#9a9087'} strokeWidth="1.3" width="18" height="18">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div id={`${itemId}-body`} role="region" aria-labelledby={`${itemId}-btn`} style={{ overflow: 'hidden', maxHeight: height, transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1)' }}>
        <div ref={bodyRef} style={{ paddingBottom: 22, paddingLeft: 48 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 300, color: '#5c5348', lineHeight: 1.78, maxWidth: 520 }}>{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function AccordionFAQ({ items = DEFAULT_FAQS, title = 'Questions Worth Asking', subtitle = 'Everything you need to know before you book.' }) {
  const [openIdx, setOpenIdx] = useState(null);
  const baseId = useId();
  const half = Math.ceil(items.length / 2);
  const col1 = items.slice(0, half);
  const col2 = items.slice(half);

  return (
    <section style={{ background: '#f8f7f5', padding: 'var(--section-gap) var(--page-gutter)', borderTop: '1px solid #e4dfd9' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '0 72px', marginBottom: 60, alignItems: 'start' }} className="faq-header-grid">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 8 }}>
          <span style={{ display: 'block', width: 28, height: 1, background: '#c8c0b7' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: '#9a9087', textTransform: 'uppercase' }}>FAQ</span>
        </div>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 300, fontStyle: 'italic', color: '#1a1714', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 12 }}>{title}</h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 300, color: '#7a7268', lineHeight: 1.6, marginBottom: 18, maxWidth: 400 }}>{subtitle}</p>
          <a href="/contact" style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', color: '#1a1714', textDecoration: 'none', borderBottom: '1px solid rgba(26,23,20,0.3)', paddingBottom: 2 }}>
            Still have questions? Let&apos;s talk →
          </a>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 56px' }} className="faq-cols">
        <div>
          {col1.map((item, i) => <AccordionItem key={i} item={item} index={i} isOpen={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? null : i)} itemId={`${baseId}-${i}`} />)}
          <div style={{ borderBottom: '1px solid #e4dfd9' }} />
        </div>
        <div>
          {col2.map((item, i) => { const abs = half + i; return <AccordionItem key={abs} item={item} index={abs} isOpen={openIdx === abs} onToggle={() => setOpenIdx(openIdx === abs ? null : abs)} itemId={`${baseId}-${abs}`} />; })}
          <div style={{ borderBottom: '1px solid #e4dfd9' }} />
        </div>
      </div>
      <style>{`@media(max-width:900px){.faq-cols{grid-template-columns:1fr!important}}@media(max-width:640px){.faq-header-grid{grid-template-columns:1fr!important;gap:24px 0!important}}`}</style>
    </section>
  );
}
