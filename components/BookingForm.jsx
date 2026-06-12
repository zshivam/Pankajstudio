'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const SERVICES = [
  { value: 'wedding', label: 'Wedding Photography & Film' },
  { value: 'pre-wedding', label: 'Pre-Wedding / Engagement' },
  { value: 'maternity', label: 'Maternity Shoot' },
  { value: 'baby', label: 'Baby / Newborn Shoot' },
  { value: 'birthday', label: 'Birthday & Milestone' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'cinema-4k', label: '4K Cinema Package' },
  { value: 'other', label: 'Other / Not Sure Yet' },
];

const iStyle = { width: '100%', padding: '12px 0', background: 'transparent', border: 'none', borderBottom: '1px solid #e4dfd9', color: '#1a1714', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 300, boxSizing: 'border-box', outline: 'none', transition: 'border-color 0.25s', borderRadius: 0 };
const lStyle = { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a9087', marginBottom: 4 };
const eStyle = { fontFamily: 'var(--font-mono)', fontSize: 9, color: '#b04040', letterSpacing: '0.1em', marginTop: 4 };

export default function BookingForm() {
  const [status, setStatus] = useState('idle');
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  async function onSubmit(data) {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div style={{ padding: '48px 0', textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, fontStyle: 'italic', color: '#1a1714', marginBottom: 12 }}>We&apos;ll be in touch soon.</h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 300, color: '#7a7268', marginBottom: 24 }}>Thank you for reaching out. We typically respond within 24 hours.</p>
        <button onClick={() => setStatus('idle')} style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'none', border: 'none', color: '#1a1714', cursor: 'pointer', borderBottom: '1px solid #1a1714', paddingBottom: 2 }}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }} className="form-row">
        <div>
          <label style={lStyle}>Full Name *</label>
          <input type="text" placeholder="Your name" style={{ ...iStyle, borderBottomColor: errors.name ? '#b04040' : '#e4dfd9' }} {...register('name', { required: 'Name is required.' })} />
          {errors.name && <p style={eStyle}>{errors.name.message}</p>}
        </div>
        <div>
          <label style={lStyle}>Email Address *</label>
          <input type="email" placeholder="your@email.com" style={{ ...iStyle, borderBottomColor: errors.email ? '#b04040' : '#e4dfd9' }} {...register('email', { required: 'Email is required.', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email.' } })} />
          {errors.email && <p style={eStyle}>{errors.email.message}</p>}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }} className="form-row">
        <div>
          <label style={lStyle}>Phone Number</label>
          <input type="tel" placeholder="+91 98765 43210" style={iStyle} {...register('phone')} />
        </div>
        <div>
          <label style={lStyle}>Event Date</label>
          <input type="date" style={iStyle} {...register('eventDate')} />
        </div>
      </div>
      <div>
        <label style={lStyle}>Service Required *</label>
        <select style={{ ...iStyle, borderBottomColor: errors.service ? '#b04040' : '#e4dfd9', appearance: 'none', cursor: 'pointer' }} {...register('service', { required: 'Please select a service.' })}>
          <option value="">Select a service…</option>
          {SERVICES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        {errors.service && <p style={eStyle}>{errors.service.message}</p>}
      </div>
      <div>
        <label style={lStyle}>Event Location</label>
        <input type="text" placeholder="City, venue, or destination" style={iStyle} {...register('location')} />
      </div>
      <div>
        <label style={lStyle}>Tell Us About Your Vision *</label>
        <textarea rows={5} placeholder="Share anything that matters — the mood, the story, the people..." style={{ ...iStyle, resize: 'vertical', lineHeight: 1.7, borderBottomColor: errors.message ? '#b04040' : '#e4dfd9' }} {...register('message', { required: 'A brief message helps us prepare.' })} />
        {errors.message && <p style={eStyle}>{errors.message.message}</p>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, paddingTop: 8 }}>
        <button type="submit" disabled={status === 'loading'} style={{ padding: '14px 40px', background: '#1a1714', fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#f8f7f5', border: 'none', cursor: status === 'loading' ? 'wait' : 'pointer', opacity: status === 'loading' ? 0.6 : 1 }}>
          {status === 'loading' ? 'Sending…' : 'Send Enquiry'}
        </button>
        {status === 'error' && <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#b04040', letterSpacing: '0.08em' }}>Something went wrong. Please try again.</p>}
      </div>
      <style>{`@media(max-width:600px){.form-row{grid-template-columns:1fr!important}}input::placeholder,textarea::placeholder{color:#c4bdb5}`}</style>
    </form>
  );
}
