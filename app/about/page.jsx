import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'About', description: "The story behind Pankaj Studio — who we are, how we work, and why every milestone deserves to be remembered beautifully." };

const PROCESS_STEPS = [
  { num: '01', title: 'The First Conversation', body: "We begin with a call or meeting — no forms, no templates. We listen to your story: the people, the place, the feeling you want to carry forever. This shapes everything that follows." },
  { num: '02', title: 'Crafting the Visual Plan', body: "Based on your vision, we build a mood reference, a shot list, and a day-of timeline. For weddings, we scout locations in advance. Nothing is left to chance — only room for happy accidents." },
  { num: '03', title: 'The Day Itself', body: "On shoot day, we are quiet observers first, directors second. We do not manufacture moments — we recognise them as they happen and make sure you never know the camera was there." },
  { num: '04', title: 'The Edit', body: "Every frame is colour-graded by hand. We do not use batch presets. The final gallery is curated — only images that earn their place make it to you." },
  { num: '05', title: 'Delivery and Legacy', body: "Your gallery arrives via a private online link. 4K films are delivered as a streaming link and a full-resolution master file. These are yours to keep forever." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 64 }}>
        {/* Hero */}
        <section style={{ background: '#1a1714', padding: 'clamp(80px,12vw,160px) var(--page-gutter) clamp(64px,8vw,120px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px', alignItems: 'end' }} className="about-hero">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <span style={{ display: 'block', width: 28, height: 1, background: 'rgba(255,255,255,0.2)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>The Studio</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px, 6vw, 78px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              We Remember<br /><em style={{ color: 'rgba(255,255,255,0.5)' }}>So You Don&apos;t Have To.</em>
            </h1>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: 60 }} className="about-hero-right">
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px,1.4vw,16px)', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 20 }}>
              Pankaj Studio is a premium photography and cinema studio based in Lucknow, available across India. We document weddings, pre-weddings, maternity journeys, newborns, birthdays, and corporate milestones.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px,1.4vw,16px)', fontWeight: 300, color: 'rgba(255,255,255,0.35)', lineHeight: 1.8 }}>
              Our belief is simple: the best photographs are the ones where the subjects forgot the camera was there.
            </p>
          </div>
        </section>

        {/* Stats bar */}
        <section style={{ background: '#f8f7f5', borderBottom: '1px solid #e4dfd9' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid #e4dfd9' }} className="stats-grid">
            {[{ num: '340+', label: 'Weddings' }, { num: '8', label: 'Years in Practice' }, { num: '4K', label: 'Cinema Since 2021' }, { num: '12+', label: 'States Covered' }].map((s, i) => (
              <div key={i} style={{ padding: '40px 32px', borderRight: i < 3 ? '1px solid #e4dfd9' : 'none' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300, color: '#1a1714', letterSpacing: '-0.02em', lineHeight: 1, display: 'block', marginBottom: 8 }}>{s.num}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', color: '#9a9087', textTransform: 'uppercase' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section id="process" style={{ background: '#1a1714', padding: 'var(--section-gap) var(--page-gutter)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <span style={{ display: 'block', width: 28, height: 1, background: 'rgba(255,255,255,0.2)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>How We Work</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,4vw,56px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 64, maxWidth: 500 }}>
            From First Call to Final Frame
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '0 48px', padding: '36px 0', borderTop: '1px solid rgba(255,255,255,0.07)', alignItems: 'start' }} className="process-step">
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,5vw,64px)', fontWeight: 300, color: 'rgba(255,255,255,0.08)', lineHeight: 1, letterSpacing: '-0.02em' }}>{step.num}</span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2.2vw,26px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 1.2, marginBottom: 12 }}>{step.title}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, maxWidth: 560 }}>{step.body}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#f8f7f5', padding: 'var(--section-gap) var(--page-gutter)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,52px)', fontWeight: 300, fontStyle: 'italic', color: '#1a1714', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 20 }}>Ready to begin?</h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 300, color: '#7a7268', lineHeight: 1.7, maxWidth: 360, margin: '0 auto 36px' }}>Tell us your date, your vision, and your story. We will take it from there.</p>
          <Link href="/contact" style={{ display: 'inline-flex', padding: '15px 40px', background: '#1a1714', fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: '#f8f7f5' }}>
            Book a Session
          </Link>
        </section>
      </main>
      <style>{`@media(max-width:768px){.about-hero{grid-template-columns:1fr!important;gap:40px 0!important}.about-hero-right{border-left:none!important;padding-left:0!important;border-top:1px solid rgba(255,255,255,0.08);padding-top:40px!important}.stats-grid{grid-template-columns:1fr 1fr!important}.process-step{grid-template-columns:60px 1fr!important;gap:0 24px!important}}`}</style>
      <Footer />
    </>
  );
}
