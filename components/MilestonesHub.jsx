'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { getCategoryLabel, formatCardDate } from '@/lib/utils';

const TABS = [
  { id: 'all', label: 'All Work' }, { id: 'wedding', label: 'Weddings' },
  { id: 'pre-wedding', label: 'Pre-Wedding' }, { id: 'maternity', label: 'Maternity' },
  { id: 'baby', label: 'Baby' }, { id: 'birthday', label: 'Birthdays' }, { id: 'corporate', label: 'Corporate' },
];
const RATIOS = ['2/3', '3/2', '2/3', '3/4', '16/9', '3/4', '2/3', '3/2', '2/3'];

function EditorialCard({ project, index }) {
  const ar = RATIOS[index % RATIOS.length];
  return (
    <article style={{ marginBottom: 16, cursor: 'pointer' }}>
      <Link href={`/work/${project.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 1 }} className="ed-wrap">
          <div style={{ aspectRatio: ar, position: 'relative' }}>
            <Image src={project.coverImage?.url || '/placeholder.svg'} alt={project.coverImage?.altText || project.title} fill sizes="(max-width:768px) 90vw, 32vw" style={{ objectFit: 'cover', filter: 'saturate(0.88)', transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)' }} className="ed-img" placeholder={project.coverImage?.blurDataUrl ? 'blur' : 'empty'} blurDataURL={project.coverImage?.blurDataUrl || undefined} priority={index < 4} />
          </div>
          <div className="ed-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(15,12,8,0.52)', opacity: 0, transition: 'opacity 0.4s', display: 'flex', alignItems: 'flex-end', padding: 16 }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>View Project →</span>
          </div>
        </div>
        <div style={{ paddingTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a9087' }}>{getCategoryLabel(project.category)}</span>
            {project.eventDate && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#bbb5ad' }}>{formatCardDate(project.eventDate)}</span>}
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px, 2vw, 21px)', fontWeight: 500, fontStyle: 'italic', color: '#1a1714', lineHeight: 1.2, marginBottom: 4 }}>{project.title}</h3>
          {project.storyHighlight && <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 300, color: '#7a7268', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{project.storyHighlight}</p>}
        </div>
      </Link>
      <style>{`.ed-wrap:hover .ed-overlay{opacity:1!important}.ed-wrap:hover .ed-img{transform:scale(1.05)!important}`}</style>
    </article>
  );
}

export default function MilestonesHub({ projects = [] }) {
  const [active, setActive] = useState('all');
  const [fading, setFading] = useState(false);
  const counts = useMemo(() => projects.reduce((a, p) => { a[p.category] = (a[p.category] || 0) + 1; return a; }, {}), [projects]);
  const filtered = useMemo(() => active === 'all' ? projects : projects.filter((p) => p.category === active), [projects, active]);

  function changeTab(id) {
    if (id === active) return;
    setFading(true);
    setTimeout(() => { setActive(id); setFading(false); }, 220);
  }

  const cols = [[], [], []];
  filtered.forEach((p, i) => cols[i % 3].push(p));

  return (
    <section style={{ background: '#f8f7f5', padding: 'var(--section-gap) var(--page-gutter)' }}>
      <div style={{ marginBottom: 52, maxWidth: 560 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <span style={{ display: 'block', width: 28, height: 1, background: '#c8c0b7' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: '#9a9087', textTransform: 'uppercase' }}>Portfolio</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 300, color: '#1a1714', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 14 }}>
          {"Life's Milestones,"}<br /><em style={{ fontStyle: 'italic', color: '#5c5348' }}>Framed Forever</em>
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 300, color: '#7a7268', lineHeight: 1.6 }}>Every chapter deserves a visual legacy.</p>
      </div>
      <div style={{ borderBottom: '1px solid #e2ddd8', marginBottom: 44, display: 'flex', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {TABS.filter((t) => t.id === 'all' || counts[t.id]).map((tab) => (
          <button key={tab.id} onClick={() => changeTab(tab.id)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '12px 18px 14px', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: active === tab.id ? 500 : 400, letterSpacing: '0.04em', color: active === tab.id ? '#1a1714' : '#9a9087', background: 'transparent', border: 'none', borderBottom: active === tab.id ? '2px solid #1a1714' : '2px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap', marginBottom: -1, transition: 'color 0.2s' }}>
            {tab.label}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, opacity: 0.5 }}>{tab.id === 'all' ? projects.length : (counts[tab.id] || 0)}</span>
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, alignItems: 'start', opacity: fading ? 0 : 1, transform: fading ? 'translateY(8px)' : 'none', transition: 'opacity 0.22s,transform 0.22s' }} className="portfolio-grid">
        {cols.map((col, ci) => (
          <div key={ci} style={{ display: 'flex', flexDirection: 'column' }}>
            {col.map((p, li) => <EditorialCard key={p._id || p.slug} project={p} index={ci * 3 + li} />)}
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '80px 20px', color: '#9a9087', fontFamily: 'var(--font-sans)', fontSize: 14 }}>No projects in this category yet.</div>}
      {filtered.length >= 6 && <div style={{ marginTop: 56, display: 'flex', justifyContent: 'center' }}><Link href="/work" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: '#1a1714', borderBottom: '1px solid #1a1714', paddingBottom: 4 }}>View Full Archive</Link></div>}
      <style>{`@media(max-width:820px){.portfolio-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:480px){.portfolio-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
