'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useCallback } from 'react';
import { getYouTubeThumbnail, toYouTubeEmbed } from '@/lib/utils';

function CinemaCard({ project }) {
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);
  const thumb = project.videoThumbnailUrl || getYouTubeThumbnail(project.videoEmbedUrl) || project.coverImage?.url;
  const embed = project.videoEmbedUrl ? toYouTubeEmbed(project.videoEmbedUrl, true) : null;
  const enter = useCallback(() => { setHovered(true); timer.current = setTimeout(() => setPlaying(true), 600); }, []);
  const leave = useCallback(() => { clearTimeout(timer.current); setHovered(false); setPlaying(false); }, []);

  return (
    <article onMouseEnter={enter} onMouseLeave={leave} style={{ position: 'relative', width: 380, minWidth: 300, height: 520, flexShrink: 0, borderRadius: 2, overflow: 'hidden', cursor: 'pointer', background: '#0a0a0a', transform: hovered ? 'scale(1.02) translateY(-4px)' : 'scale(1)', transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)', scrollSnapAlign: 'start', zIndex: hovered ? 10 : 1 }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        {thumb && <Image src={thumb} alt={project.title} fill sizes="380px" style={{ objectFit: 'cover', opacity: playing ? 0 : 1, transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.8s ease, opacity 0.4s ease' }} />}
        {hovered && embed && <iframe src={embed} style={{ position: 'absolute', inset: '-5%', width: '110%', height: '110%', border: 'none', pointerEvents: 'none', opacity: playing ? 1 : 0, transition: 'opacity 0.5s ease 0.3s' }} allow="autoplay; fullscreen" title={project.title} loading="lazy" />}
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.08) 100%)', zIndex: 2 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hovered ? 1 : 0, transition: 'opacity 0.4s' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', background: 'rgba(255,255,255,0.08)', color: '#fff', transform: hovered ? 'scale(1.1)' : 'scale(0.85)', transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M8 5v14l11-7z" /></svg>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
        {project.is4K && <span style={{ padding: '3px 8px', fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: '#0a0a0a', textTransform: 'uppercase', background: 'linear-gradient(135deg,#e8d5a3,#c9a84c,#f5e099,#b8902a)', borderRadius: 1 }}>4K ULTRA HD</span>}
        {project.videoDuration && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>{project.videoDuration}</span>}
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 4, padding: '0 20px 24px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 6 }}>{project.location?.city || 'Studio'}</p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, fontStyle: 'italic', color: '#fff', lineHeight: 1.2, marginBottom: 6 }}>{project.title}</h3>
        {project.storyHighlight && <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>{project.storyHighlight}</p>}
      </div>
    </article>
  );
}

function HeroSection({ project }) {
  return (
    <section style={{ position: 'relative', width: '100%', height: '100svh', minHeight: 600, background: '#050505', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
      {project?.coverImage?.url && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image src={project.coverImage.url} alt="" fill priority quality={90} sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 20%', filter: 'saturate(0.65) brightness(0.72)' }} placeholder={project.coverImage.blurDataUrl ? 'blur' : 'empty'} blurDataURL={project.coverImage.blurDataUrl || undefined} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 64, background: '#050505', zIndex: 1 }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 64, background: '#050505', zIndex: 1 }} />
        </div>
      )}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to top, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.5) 40%, rgba(5,5,5,0.08) 70%, rgba(5,5,5,0.4) 100%)' }} />
      <div style={{ position: 'relative', zIndex: 3, padding: '0 var(--page-gutter) 96px', maxWidth: 700, animation: 'fadeUp 1s 0.3s both' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <span style={{ display: 'block', width: 32, height: 1, background: 'rgba(255,255,255,0.35)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>Featured Work</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 18 }}>
          {project?.title || 'Capturing Your Story'}
        </h1>
        {project?.storyHighlight && <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.72, maxWidth: 420, marginBottom: 36 }}>{project.storyHighlight}</p>}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
          {project?.slug && <Link href={`/work/${project.slug}`} style={{ display: 'inline-flex', alignItems: 'center', padding: '13px 28px', background: '#fff', fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: '#050505' }}>View Project</Link>}
          <Link href="/work" style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: 'rgba(255,255,255,0.55)', borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: 2 }}>All Work</Link>
        </div>
        {project?.location?.city && <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>📍 {project.location.city}</p>}
      </div>
      <div style={{ position: 'absolute', right: 48, bottom: 80, zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.35))' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>scroll</span>
      </div>
    </section>
  );
}

function CinemaLounge({ projects = [] }) {
  const ref = useRef(null);
  const scroll = useCallback((d) => ref.current?.scrollBy({ left: d * 420, behavior: 'smooth' }), []);
  return (
    <section style={{ background: '#060606', padding: 'var(--section-gap) 0' }}>
      <div style={{ padding: '0 var(--page-gutter) 44px', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: '0 40px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <span style={{ display: 'block', width: 28, height: 1, background: 'rgba(255,255,255,0.18)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>Cinema Lounge</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 4.5vw, 58px)', fontWeight: 300, color: '#fff', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 12 }}>Where Frames<br /><em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>Become Feeling</em></h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.32)', fontWeight: 300 }}>Shot in 4K Ultra HD. Edited to last a lifetime.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[-1, 1].map((d, i) => (
            <button key={i} onClick={() => scroll(d)} aria-label={d === -1 ? 'Scroll left' : 'Scroll right'} style={{ width: 44, height: 44, border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.25s' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path d={d === -1 ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          ))}
        </div>
      </div>
      <div ref={ref} className="scroll-track" style={{ gap: 16, padding: '8px var(--page-gutter) 28px' }}>
        {projects.length > 0 ? projects.map((p) => (
          <Link key={p._id || p.slug} href={`/work/${p.slug}`} style={{ textDecoration: 'none' }}><CinemaCard project={p} /></Link>
        )) : Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton" style={{ width: 380, minWidth: 300, height: 520, flexShrink: 0, borderRadius: 2 }} />
        ))}
      </div>
    </section>
  );
}

export default function HeroAndCinema({ heroProject, cinemaProjects }) {
  return <><HeroSection project={heroProject} /><CinemaLounge projects={cinemaProjects} /></>;
}
