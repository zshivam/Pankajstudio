'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from './ImageUploader';
import GalleryUploader from './GalleryUploader';
import { slugify } from '@/lib/utils';

// 🌟 Yahan aapki nayi categories update kar di hain!
const CATEGORIES = [
  { value: 'candid-photography', label: 'Candid Photography' },
  { value: 'cinematography', label: 'Cinematography' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'ring-ceremony', label: 'Ring Ceremony' },
  { value: 'pre-wedding', label: 'Pre-Wedding' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'maternity', label: 'Maternity' },
  { value: 'corporate-events', label: 'Corporate All Events' },
  { value: 'drone-led-wall', label: 'Drone LED Wall' },
];

export default function ProjectForm({ project = null }) {
  const router = useRouter();
  const isEdit = !!project;

  const [form, setForm] = useState({
    title: project?.title || '',
    slug: project?.slug || '',
    category: project?.category || 'wedding',
    description: project?.description || '',
    storyHighlight: project?.storyHighlight || '',
    location: { city: project?.location?.city || '', venue: project?.location?.venue || '', country: project?.location?.country || 'India' },
    eventDate: project?.eventDate ? new Date(project.eventDate).toISOString().split('T')[0] : '',
    coverImage: project?.coverImage || null,
    galleryImages: project?.galleryImages || [],
    videoEmbedUrl: project?.videoEmbedUrl || '',
    videoDuration: project?.videoDuration || '',
    is4K: project?.is4K || false,
    featured: project?.featured || false,
    isPublished: project?.isPublished || false,
    sortOrder: project?.sortOrder || 0,
    tags: project?.tags?.join(', ') || '',
    metaTitle: project?.metaTitle || '',
    metaDescription: project?.metaDescription || '',
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Auto-generate slug from title
  function handleTitleChange(e) {
    const title = e.target.value;
    setForm((f) => ({
      ...f,
      title,
      slug: isEdit ? f.slug : slugify(title),
    }));
  }

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function setLocation(key, value) {
    setForm((f) => ({ ...f, location: { ...f.location, [key]: value } }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.coverImage?.url) {
      setError('Please upload a cover image.');
      return;
    }

    setSaving(true);

    const payload = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      const url = isEdit ? `/api/admin/projects/${project._id}` : '/api/admin/projects';
      const method = isEdit ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.error || 'Save failed.');
        setSaving(false);
        return;
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setSaving(false);
    }
  }

  const uploadCategory = form.category.replace('-', '') || 'general';

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, alignItems: 'start' }}>

        {/* Left column — main fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Basic info */}
          <FormSection title="Basic Info">
            <FormRow>
              <FormField label="Project Title *">
                <input type="text" value={form.title} onChange={handleTitleChange} required style={inputStyle} placeholder="e.g. Priya & Arjun Wedding" />
              </FormField>
              <FormField label="URL Slug *">
                <input type="text" value={form.slug} onChange={(e) => set('slug', e.target.value)} required style={inputStyle} placeholder="priya-arjun-wedding" />
              </FormField>
            </FormRow>
            <FormRow>
             <FormField label="Category *">
                <select value={form.category} onChange={(e) => set('category', e.target.value)} style={inputStyle}>
                  {CATEGORIES.map((c) => (
                    <option 
                      key={c.value} 
                      value={c.value} 
                      style={{ background: '#1a1a1a', color: '#ffffff' }}
                    >
                      {c.label}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label="Event Date">
                <input type="date" value={form.eventDate} onChange={(e) => set('eventDate', e.target.value)} style={inputStyle} />
              </FormField>
            </FormRow>
            <FormField label="Story Highlight (shown on cards — max 300 chars)">
              <input type="text" value={form.storyHighlight} onChange={(e) => set('storyHighlight', e.target.value)} maxLength={300} style={inputStyle} placeholder="One emotional line about this shoot..." />
            </FormField>
            <FormField label="Full Description">
              <textarea value={form.description} onChange={(e) => set('description', e.target.value)} maxLength={2000} rows={6} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }} placeholder="Tell the full story of this shoot..." />
            </FormField>
          </FormSection>

          {/* Location */}
          <FormSection title="Location">
            <FormRow>
              <FormField label="City">
                <input type="text" value={form.location.city} onChange={(e) => setLocation('city', e.target.value)} style={inputStyle} placeholder="Lucknow" />
              </FormField>
              <FormField label="Venue">
                <input type="text" value={form.location.venue} onChange={(e) => setLocation('venue', e.target.value)} style={inputStyle} placeholder="Taj Palace" />
              </FormField>
              <FormField label="Country">
                <input type="text" value={form.location.country} onChange={(e) => setLocation('country', e.target.value)} style={inputStyle} placeholder="India" />
              </FormField>
            </FormRow>
          </FormSection>

          {/* Video */}
          <FormSection title="Video (optional)">
            <FormRow>
              <FormField label="YouTube / Vimeo Embed URL">
                <input type="url" value={form.videoEmbedUrl} onChange={(e) => set('videoEmbedUrl', e.target.value)} style={inputStyle} placeholder="https://www.youtube.com/embed/..." />
              </FormField>
              <FormField label="Duration (e.g. 4:32)">
                <input type="text" value={form.videoDuration} onChange={(e) => set('videoDuration', e.target.value)} style={inputStyle} placeholder="4:32" />
              </FormField>
            </FormRow>
          </FormSection>

          {/* Gallery */}
          <FormSection title="Gallery Images">
            <GalleryUploader
              images={form.galleryImages}
              onChange={(imgs) => set('galleryImages', imgs)}
              category={uploadCategory}
            />
          </FormSection>

          {/* SEO */}
          <FormSection title="SEO (optional)">
            <FormField label="Meta Title (max 70 chars)">
              <input type="text" value={form.metaTitle} onChange={(e) => set('metaTitle', e.target.value)} maxLength={70} style={inputStyle} placeholder="Leave blank to use project title" />
            </FormField>
            <FormField label="Meta Description (max 160 chars)">
              <textarea value={form.metaDescription} onChange={(e) => set('metaDescription', e.target.value)} maxLength={160} rows={3} style={{ ...inputStyle, resize: 'none' }} placeholder="Leave blank to use story highlight" />
            </FormField>
            <FormField label="Tags (comma-separated)">
              <input type="text" value={form.tags} onChange={(e) => set('tags', e.target.value)} style={inputStyle} placeholder="outdoor, evening, traditional" />
            </FormField>
          </FormSection>
        </div>

        {/* Right column — cover image + publish settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 80 }}>

          {/* Cover image */}
          <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', padding: 24 }}>
            <p style={sectionTitleStyle}>Cover Image *</p>
            <ImageUploader
              label=""
              category={uploadCategory}
              type="cover"
              currentImage={form.coverImage}
              onUpload={(img) => set('coverImage', img)}
            />
            {form.coverImage?.url && (
              <div style={{ marginTop: 12 }}>
                <FormField label="Alt Text">
                  <input
                    type="text"
                    value={form.coverImage.altText || ''}
                    onChange={(e) => set('coverImage', { ...form.coverImage, altText: e.target.value })}
                    style={inputStyle}
                    placeholder="Describe the image..."
                  />
                </FormField>
              </div>
            )}
          </div>

          {/* Publish settings */}
          <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', padding: 24 }}>
            <p style={sectionTitleStyle}>Settings</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { key: 'isPublished', label: 'Published', desc: 'Visible on the website' },
                { key: 'featured', label: 'Featured', desc: 'Show in hero / featured sections' },
                { key: 'is4K', label: '4K Cinema', desc: 'Show gold 4K badge' },
              ].map(({ key, label, desc }) => (
                <label key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <div>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 2 }}>{label}</p>
                    <p style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>{desc}</p>
                  </div>
                  <div
                    onClick={() => set(key, !form[key])}
                    style={{
                      width: 40, height: 22, borderRadius: 11,
                      background: form[key] ? '#ffffff' : 'rgba(255,255,255,0.12)',
                      position: 'relative', transition: 'background 0.2s', flexShrink: 0,
                    }}
                  >
                    <div style={{
                      position: 'absolute', top: 3, left: form[key] ? 21 : 3,
                      width: 16, height: 16, borderRadius: '50%',
                      background: form[key] ? '#0f0f0f' : 'rgba(255,255,255,0.4)',
                      transition: 'left 0.2s',
                    }} />
                  </div>
                </label>
              ))}

              <div>
                <FormField label="Sort Order (higher = first)">
                  <input type="number" value={form.sortOrder} onChange={(e) => set('sortOrder', parseInt(e.target.value) || 0)} style={inputStyle} />
                </FormField>
              </div>
            </div>
          </div>

          {/* Error + Save */}
          {error && (
            <p style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, color: '#ff8080', padding: '12px 16px', background: 'rgba(255,100,100,0.1)', border: '1px solid rgba(255,100,100,0.2)' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '15px', background: saving ? '#333' : '#ffffff',
              color: '#0f0f0f', fontFamily: '"DM Sans", sans-serif',
              fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
              border: 'none', cursor: saving ? 'wait' : 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Project'}
          </button>
        </div>
      </div>
    </form>
  );
}

// ── Sub-components ─────────────────────────────────────────────
function FormSection({ title, children }) {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', padding: 28 }}>
      <p style={sectionTitleStyle}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {children}
      </div>
    </div>
  );
}

function FormRow({ children }) {
  return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${children.length || 1}, 1fr)`, gap: 16 }}>{children}</div>;
}

function FormField({ label, children }) {
  return (
    <div>
      {label && <label style={fieldLabelStyle}>{label}</label>}
      {children}
    </div>
  );
}

const sectionTitleStyle = {
  fontFamily: '"DM Mono", monospace',
  fontSize: 10,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
  marginBottom: 20,
};

const fieldLabelStyle = {
  display: 'block',
  fontFamily: '"DM Mono", monospace',
  fontSize: 9,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.35)',
  marginBottom: 8,
};

const inputStyle = {
  width: '100%',
  padding: '10px 0',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.12)',
  color: '#ffffff',
  fontFamily: '"DM Sans", sans-serif',
  fontSize: 14,
  fontWeight: 300,
  boxSizing: 'border-box',
  outline: 'none',
};