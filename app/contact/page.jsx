import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';

export const metadata = { 
  title: 'Book a Session | Pankaj Studio', 
  description: 'Get in touch with Pankaj Studio to enquire about wedding photography, pre-wedding shoots, maternity sessions, and 4K cinema packages.' 
};

const CONTACT_DETAILS = [
  { label: 'Based In', value: 'Deoria, Uttar Pradesh', sub: 'Available across India' },
  { label: 'Response Time', value: 'Within 24 hours', sub: 'Mon – Sat, 10am – 7pm IST' },
  { label: 'Email', value: 'pankajstudiodeoria@gmail.com', href: 'mailto:pankajstudiodeoria@gmail.com', sub: 'For general enquiries' },
  { label: 'Instagram', value: '@pankajstudio', href: 'https://instagram.com/pankajstudio', sub: 'See our latest work' },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      
      {/* 🌟 MAIN CONTAINER: Dark Parallax Background 🌟 */}
      <main 
        style={{ 
          paddingTop: 64,
          backgroundImage: 'linear-gradient(to right, rgba(5, 5, 5, 0.98) 0%, rgba(5, 5, 5, 0.92) 100%), url("/strip.jpg")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', 
          minHeight: '100vh',
          color: '#fff'
        }}
      >
        {/* 🌟 HEADER SECTION 🌟 */}
        <section style={{ background: 'transparent', padding: 'clamp(72px,10vw,140px) var(--page-gutter) clamp(56px,7vw,100px)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <span style={{ display: 'block', width: 28, height: 1, background: '#d4af37' }} />
              <span style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 11, letterSpacing: '0.25em', color: '#d4af37', textTransform: 'uppercase' }}>Get In Touch</span>
            </div>
            <h1 style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif', fontSize: 'clamp(48px,8vw,96px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 1.05, letterSpacing: '0.02em', maxWidth: 800 }}>
              Let's Talk About <br /><span style={{ color: '#d4af37' }}>Your Story.</span>
            </h1>
          </div>
        </section>

        {/* 🌟 FORM + SIDEBAR SECTION 🌟 */}
        <section style={{ background: 'transparent', padding: 'var(--section-gap) var(--page-gutter)', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '0 80px', alignItems: 'start' }} className="contact-grid">
            
            {/* Left Column: Form */}
            <div>
              <div style={{ marginBottom: 44 }}>
                <h2 style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 1.2, letterSpacing: '0.02em', marginBottom: 12 }}>
                  Send an Enquiry
                </h2>
                <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 460 }}>
                  Fill in as much or as little as you know right now. We will follow up with a proper conversation to understand exactly what you are looking for.
                </p>
              </div>
              {/* Form container wrapped to give it a dark context if BookingForm component itself has light styles */}
              <div className="form-wrapper-dark">
                <BookingForm />
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div style={{ position: 'sticky', top: 120 }}>
              <div style={{ width: '100%', height: 1, background: 'rgba(212, 175, 55, 0.2)', marginBottom: 40 }} />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {CONTACT_DETAILS.map((item) => (
                  <div key={item.label}>
                    <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#d4af37', marginBottom: 8 }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 15, fontWeight: 400, color: '#fff', textDecoration: 'none', display: 'block', marginBottom: 4, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 2, width: 'fit-content', transition: 'border-color 0.3s' }} className="contact-link">
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 15, fontWeight: 400, color: '#fff', marginBottom: 4 }}>
                        {item.value}
                      </p>
                    )}
                    <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.5)' }}>
                      {item.sub}
                    </p>
                  </div>
                ))}
              </div>
              
              <div style={{ width: '100%', height: 1, background: 'rgba(212, 175, 55, 0.2)', margin: '40px 0' }} />
              
              {/* Alert Box Dark */}
              <div style={{ background: 'rgba(212, 175, 55, 0.05)', padding: '24px', borderLeft: '2px solid #d4af37', borderRadius: '0 4px 4px 0' }}>
                <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75 }}>
                  <strong style={{ fontWeight: 600, color: '#fff' }}>Not sure about dates yet?</strong>{' '}
                  That is completely fine. Reach out anyway — we can hold a tentative date while you finalise details, with no obligation.
                </p>
              </div>
            </div>
            
          </div>
        </section>

        {/* 🌟 FAQ TEASER SECTION 🌟 */}
        <section style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '60px var(--page-gutter)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 30 }}>
            <div>
              <p style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif', fontSize: 'clamp(24px,3vw,32px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', marginBottom: 10 }}>
                Have questions before reaching out?
              </p>
              <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}>
                Most common questions are already answered on our FAQ section.
              </p>
            </div>
            <a href="/#faq" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: '"Montserrat", sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', color: '#000', background: '#d4af37', padding: '14px 32px', borderRadius: '4px', transition: 'all 0.3s' }} className="faq-btn">
              Read the FAQ
            </a>
          </div>
        </section>

      </main>

      {/* 🌟 PREMIUM STYLES 🌟 */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');

        /* Agar BookingForm ke input fields white hain, toh unhe CSS override se dark banayein */
        .form-wrapper-dark form input,
        .form-wrapper-dark form textarea,
        .form-wrapper-dark form select {
          background-color: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #fff !important;
          border-radius: 4px;
        }
        
        .form-wrapper-dark form input:focus,
        .form-wrapper-dark form textarea:focus {
          border-color: #d4af37 !important;
          outline: none !important;
          background-color: rgba(255, 255, 255, 0.08) !important;
        }

        .form-wrapper-dark form label {
          color: rgba(255, 255, 255, 0.8) !important;
        }

        /* Submit button styling inside the component if needed */
        .form-wrapper-dark form button[type="submit"] {
          background-color: #d4af37 !important;
          color: #000 !important;
          font-weight: 600 !important;
          border-radius: 4px !important;
        }

        .contact-link:hover {
          border-color: #d4af37 !important;
          color: #d4af37 !important;
        }

        .faq-btn:hover {
          background: #fff !important;
          color: #000 !important;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }

        @media(max-width: 960px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 64px 0 !important;
          }
        }
      `}</style>
      <Footer />
    </>
  );
}