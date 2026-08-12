'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const SERVICES = [
  { value: 'Wedding Photography & Film', label: 'Wedding Photography & Film' },
  { value: 'Pre-Wedding / Engagement', label: 'Pre-Wedding / Engagement' },
  { value: 'Maternity Shoot', label: 'Maternity Shoot' },
  { value: 'Baby / Newborn Shoot', label: 'Baby / Newborn Shoot' },
  { value: 'Birthday & Milestone', label: 'Birthday & Milestone' },
  { value: 'Corporate Event', label: 'Corporate Event' },
  { value: '4K Cinema Package', label: '4K Cinema Package' },
  { value: 'Other', label: 'Other / Not Sure Yet' },
];

const iStyle = { 
  width: '100%', 
  padding: '12px 10px', 
  background: 'rgba(255, 255, 255, 0.05)', 
  border: '1px solid rgba(255, 255, 255, 0.1)', 
  color: '#fff', 
  fontFamily: 'var(--font-sans)', 
  fontSize: 15, 
  fontWeight: 300, 
  boxSizing: 'border-box', 
  outline: 'none', 
  transition: 'all 0.3s', 
  borderRadius: '4px' 
};

const lStyle = { 
  display: 'block', 
  fontFamily: 'var(--font-mono)', 
  fontSize: 10, 
  letterSpacing: '0.2em', 
  textTransform: 'uppercase', 
  color: '#d4af37', 
  marginBottom: 8 
};

const eStyle = { 
  fontFamily: 'var(--font-mono)', 
  fontSize: 9, 
  color: '#e74c3c', 
  letterSpacing: '0.1em', 
  marginTop: 6 
};

export default function BookingForm() {
  const [status, setStatus] = useState('idle');
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // 🌟 NAYA WEB3FORMS JSON LOGIC 🌟
  const onSubmit = async (data) => {
    setStatus('loading');
    try {
      // Data ko json format me prepare kar rahe hain
      const payload = {
        ...data,
        access_key: "28b0437b-321d-432d-a9c4-3efe7a35c087",
        subject: "New Enquiry for Pankaj Studio",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      
      if (!json.success) {
        throw new Error(json.message || "Failed to submit form");
      }
      
      setStatus('success');
      reset();
    } catch (error) {
      console.error("Submit Error:", error);
      setStatus('error');
    }
  };

  // Success UI
  if (status === 'success') {
    return (
      <div style={{ padding: '48px 0', textAlign: 'center', background: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '8px' }}>
        <h3 style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif', fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 400, fontStyle: 'italic', color: '#d4af37', marginBottom: 16 }}>We'll be in touch soon.</h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.7)', marginBottom: 28 }}>Thank you for reaching out. Your enquiry has been sent to our team.</p>
        <button onClick={() => setStatus('idle')} style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', background: '#d4af37', border: 'none', color: '#000', cursor: 'pointer', padding: '12px 24px', borderRadius: '4px', transition: 'all 0.3s' }}>
          Send another enquiry
        </button>
      </div>
    );
  }

  // Main Form UI
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} {...register('botcheck')} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }} className="form-row">
        <div>
          <label style={lStyle}>Full Name *</label>
          <input type="text" placeholder="e.g. Rahul Sharma" style={{ ...iStyle, borderColor: errors.name ? '#e74c3c' : 'rgba(255,255,255,0.1)' }} className="dark-input" {...register('name', { required: 'Name is required.' })} />
          {errors.name && <p style={eStyle}>{errors.name.message}</p>}
        </div>
        <div>
          <label style={lStyle}>Email Address *</label>
          <input type="email" placeholder="hello@example.com" style={{ ...iStyle, borderColor: errors.email ? '#e74c3c' : 'rgba(255,255,255,0.1)' }} className="dark-input" {...register('email', { required: 'Email is required.', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email.' } })} />
          {errors.email && <p style={eStyle}>{errors.email.message}</p>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }} className="form-row">
        <div>
          <label style={lStyle}>Phone Number</label>
          <input type="tel" placeholder="+91 98765 43210" style={iStyle} className="dark-input" {...register('phone')} />
        </div>
        <div>
          <label style={lStyle}>Event Date</label>
          <input type="date" style={iStyle} className="dark-input date-input" {...register('eventDate')} />
        </div>
      </div>

      <div>
        <label style={lStyle}>Service Required *</label>
        <select defaultValue="" style={{ ...iStyle, borderColor: errors.service ? '#e74c3c' : 'rgba(255,255,255,0.1)', cursor: 'pointer' }} className="dark-input custom-select" {...register('service', { required: 'Please select a service.' })}>
          <option value="" disabled hidden>Select a service…</option>
          {SERVICES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        {errors.service && <p style={eStyle}>{errors.service.message}</p>}
      </div>

      <div>
        <label style={lStyle}>Event Location</label>
        <input type="text" placeholder="City, venue, or destination" style={iStyle} className="dark-input" {...register('location')} />
      </div>

      <div>
        <label style={lStyle}>Tell Us About Your Vision *</label>
        <textarea rows={5} placeholder="Share anything that matters — the mood, the story, the venue..." style={{ ...iStyle, resize: 'vertical', lineHeight: 1.7, borderColor: errors.message ? '#e74c3c' : 'rgba(255,255,255,0.1)' }} className="dark-input" {...register('message', { required: 'A brief message helps us prepare.' })} />
        {errors.message && <p style={eStyle}>{errors.message.message}</p>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20, paddingTop: 8 }}>
        <button type="submit" disabled={status === 'loading'} className="submit-btn" style={{ 
          padding: '16px 40px', 
          background: '#d4af37', 
          fontFamily: 'var(--font-sans)', 
          fontSize: 13, 
          fontWeight: 600, 
          letterSpacing: '0.15em', 
          textTransform: 'uppercase', 
          color: '#000', 
          border: 'none', 
          borderRadius: '4px',
          cursor: status === 'loading' ? 'wait' : 'pointer', 
          opacity: status === 'loading' ? 0.7 : 1,
          transition: 'all 0.3s'
        }}>
          {status === 'loading' ? 'Sending…' : 'Send Enquiry'}
        </button>
        {status === 'error' && <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#e74c3c', letterSpacing: '0.08em' }}>Failed to send. Please check your connection.</p>}
      </div>

      <style>{`
        @media(max-width: 600px) {
          .form-row { grid-template-columns: 1fr !important; }
        }

        .dark-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .dark-input:focus {
          border-color: #d4af37 !important;
          background: rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.1);
        }

        .custom-select option {
          background-color: #111 !important; 
          color: #fff !important;
          padding: 10px;
        }

        .date-input::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.5;
          cursor: pointer;
        }

        .submit-btn:hover:not(:disabled) {
          background: #fff !important;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }
      `}</style>
    </form>
  );
}