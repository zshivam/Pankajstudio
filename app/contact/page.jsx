import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';

export const metadata = { title: 'Book a Session', description: 'Get in touch with Pankaj Studio to enquire about wedding photography, pre-wedding shoots, maternity sessions, and 4K cinema packages.' };

const CONTACT_DETAILS = [
  { label: 'Based In', value: 'Lucknow, Uttar Pradesh', sub: 'Available across India' },
  { label: 'Response Time', value: 'Within 24 hours', sub: 'Mon – Sat, 10am – 7pm IST' },
  { label: 'Email', value: 'hello@pankajstudio.in', href: 'mailto:hello@pankajstudio.in', sub: 'For general enquiries' },
  { label: 'Instagram', value: '@pankajstudio', href: 'https://instagram.com/pankajstudio', sub: 'See our latest work' },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 64 }}>
        {/* Header */}
        <section style={{ background: '#1a1714', padding: 'clamp(72px,10vw,140px) var(--page-gutter) clamp(56px,7vw,100px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <span style={{ display: 'block', width: 28, height: 1, background: 'rgba(255,255,255,0.2)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Get In Touch</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px,6vw,80px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', maxWidth: 640 }}>
            {"Let's Talk About"}<br /><em style={{ color: 'rgba(255,255,255,0.5)' }}>Your Story.</em>
          </h1>
        </section>

        {/* Form + sidebar */}
        <section style={{ background: '#f8f7f5', padding: 'var(--section-gap) var(--page-gutter)', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '0 80px', alignItems: 'start' }} className="contact-grid">
          <div>
            <div style={{ marginBottom: 44 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,2.8vw,36px)', fontWeight: 300, fontStyle: 'italic', color: '#1a1714', lineHeight: 1.2, letterSpacing: '-0.01em', marginBottom: 12 }}>Send an Enquiry</h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 300, color: '#7a7268', lineHeight: 1.7, maxWidth: 460 }}>Fill in as much or as little as you know right now. We will follow up with a proper conversation to understand exactly what you are looking for.</p>
            </div>
            <BookingForm />
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: 96 }}>
            <div style={{ width: '100%', height: 1, background: '#e4dfd9', marginBottom: 40 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {CONTACT_DETAILS.map((item) => (
                <div key={item.label}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a9087', marginBottom: 8 }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 400, color: '#1a1714', textDecoration: 'none', display: 'block', marginBottom: 4, borderBottom: '1px solid rgba(26,23,20,0.2)', paddingBottom: 1, width: 'fit-content' }}>{item.value}</a>
                  ) : (
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 400, color: '#1a1714', marginBottom: 4 }}>{item.value}</p>
                  )}
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 300, color: '#9a9087' }}>{item.sub}</p>
                </div>
              ))}
            </div>
            <div style={{ width: '100%', height: 1, background: '#e4dfd9', margin: '40px 0' }} />
            <div style={{ background: '#f0ece7', padding: '20px 22px', borderLeft: '2px solid #c8c0b7' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 300, color: '#5c5348', lineHeight: 1.75 }}>
                <strong style={{ fontWeight: 500, color: '#1a1714' }}>Not sure about dates yet?</strong>{' '}
                That is completely fine. Reach out anyway — we can hold a tentative date while you finalise details, with no obligation.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ teaser */}
        <section style={{ background: '#f8f7f5', padding: '0 var(--page-gutter) var(--section-gap)', borderTop: '1px solid #e4dfd9' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 48, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2.5vw,28px)', fontWeight: 300, fontStyle: 'italic', color: '#1a1714', marginBottom: 8 }}>Have questions before reaching out?</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 300, color: '#7a7268' }}>Most common questions are already answered on our FAQ section.</p>
            </div>
            <a href="/#faq" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: '#1a1714', borderBottom: '1px solid rgba(26,23,20,0.3)', paddingBottom: 2, whiteSpace: 'nowrap' }}>
              Read the FAQ
            </a>
          </div>
        </section>
      </main>
      <style>{`@media(max-width:960px){.contact-grid{grid-template-columns:1fr!important;gap:64px 0!important}}`}</style>
      <Footer />
    </>
  );
}
