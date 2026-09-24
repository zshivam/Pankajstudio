'use client';
import { useEffect, useRef, useState } from 'react';
import { optimizeImageUrl } from '@/lib/utils';

// 🌟 OPTIMIZED IMAGE PATH
const MY_IMAGE_PATH = '/Copy of DSC03244.jpg'; 

const DEFAULT_HERO = {
  title: 'A Royal Celebration',
  storyHighlight: 'Timeless moments captured with elegance and cinematic grace.',
  slug: '#',
  coverImage: { url: MY_IMAGE_PATH }
};

function HeroSection({ project }) {
  const rawUrl = project?.coverImage?.url || MY_IMAGE_PATH;
  const optimizedImgUrl = optimizeImageUrl(rawUrl, { width: 1440, quality: 'auto' });
  
  const sectionRef = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsAnimated(true);
        else setIsAnimated(false); 
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section ref={sectionRef} className="hero-responsive-section">
      
      {/* 🌟 MAGICAL RESPONSIVE CSS 🌟 */}
      <style>{`
        /* Animations */
        @keyframes signatureEntry {
          0% { opacity: 0; filter: blur(15px); transform: translateX(-40px); }
          100% { opacity: 1; filter: blur(0px); transform: translateX(0); }
        }
        .text-hidden { opacity: 0; visibility: hidden; }
        .animate-heading {
          visibility: visible;
          animation: signatureEntry 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-subtext {
          visibility: visible;
          animation: signatureEntry 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s forwards;
        }

        /* Base Settings */
        .hero-responsive-section {
          position: relative;
          width: 100%;
          background: #050505;
          overflow: hidden;
          display: flex;
        }
        
        .hero-img-box img {
          width: 100%;
          height: 100%;
          filter: saturate(0.65) brightness(0.72);
        }

        /* 💻 DESKTOP VIEW */
        @media (min-width: 769px) {
          .hero-responsive-section {
            height: 100svh;
            min-height: 600px;
            align-items: flex-end;
          }
          .hero-img-box {
            position: absolute;
            inset: 0;
            z-index: 0;
          }
          .hero-img-box img {
            object-fit: cover;
            object-position: center;
          }
          .hero-text-box {
            position: relative;
            z-index: 3;
            padding: 0 48px 80px;
            max-width: 700px;
            width: 100%;
          }
        }

        /* 📱 MOBILE VIEW */
        @media (max-width: 768px) {
          .hero-responsive-section {
            flex-direction: column;
            height: auto;
            padding-top: 80px;
          }
          .hero-img-box {
            position: relative;
            width: 100%;
            aspect-ratio: 16/9;
          }
          .hero-img-box img {
            object-fit: contain;
            background: #050505;
          }
          .hero-text-box {
            position: relative;
            width: 100%;
            padding: 40px 24px 60px;
            text-align: center;
          }
          .hero-gradient { display: none; } 
        }
      `}</style>

      {/* 🖼️ IMAGE CONTAINER */}
      <div className="hero-img-box">
        <img 
          src={optimizedImgUrl} 
          alt={project?.title || "Royal Portrait"} 
          width={1440}
          height={960}
          loading="lazy"
          decoding="async"
        />
        
        {/* --- BLEND LAYER --- */}
        <div className="hero-gradient" style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '30%', background: 'linear-gradient(to bottom, #050505 0%, rgba(5,5,5,0.8) 15%, transparent 100%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '70%', background: 'linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.6) 50%, transparent 100%)' }} />
        </div>
      </div>
      
      {/* 📝 TEXT CONTAINER */}
      <div className="hero-text-box">
        <h1 
          className={isAnimated ? "animate-heading" : "text-hidden"} 
          style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(36px, 8vw, 80px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 1.05, marginBottom: 18 }}
        >
          {project?.title || 'Capturing Your Story'}
        </h1>
        {project?.storyHighlight && (
          <p 
            className={isAnimated ? "animate-subtext" : "text-hidden"} 
            style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(14px, 4vw, 16px)', color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}
          >
            {project.storyHighlight}
          </p>
        )}
      </div>
    </section>
  );
}

function CinemaVideoCard({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = video.videoUrl?.split('/').pop()?.split('?')[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div 
        style={{ 
          position: 'relative',
          width: '100%', 
          aspectRatio: '16/9', 
          background: '#111', 
          borderRadius: 6, 
          overflow: 'hidden', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.06)'
        }}
      >
        {!isPlaying ? (
          <button
            onClick={() => setIsPlaying(true)}
            aria-label={`Play cinema video: ${video.title || "Wedding Film"}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              background: 'transparent',
              padding: 0,
              cursor: 'pointer',
              display: 'block'
            }}
          >
            <img 
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={video.title || "Cinema Video Thumbnail"}
              width={640}
              height={360}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85) contrast(1.05)' }}
            />
            {/* Cinematic Gradient Overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
            
            {/* Gold Play Button with Accessible Size */}
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 68,
                height: 68,
                borderRadius: '50%',
                background: 'rgba(5, 5, 5, 0.8)',
                border: '2px solid #d4af37',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 25px rgba(212, 175, 55, 0.4)',
                transition: 'transform 0.3s ease'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#d4af37" style={{ marginLeft: 3 }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            <div style={{ position: 'absolute', bottom: 16, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4af37', background: 'rgba(0,0,0,0.65)', padding: '4px 10px', borderRadius: 2 }}>
                4K Ultra HD Cinema
              </span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#fff', letterSpacing: '0.05em' }}>
                Click to Watch ▷
              </span>
            </div>
          </button>
        ) : (
          <iframe 
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=0&rel=0&modestbranding=1`}
            title={video.title || "Cinema Video"}
            style={{ width: '100%', height: '100%', border: 'none', backgroundColor: '#000' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        )}
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h3 style={{ fontSize: 24, color: '#fff', marginBottom: 8, fontWeight: 400 }}>{video.title}</h3>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.6, maxWidth: 600 }}>{video.caption}</p>
      </div>
    </div>
  );
}

function CinemaLounge({ projects = [] }) {
  return (
    <section style={{ background: '#050505', padding: '80px 0 100px', fontFamily: '"DM Sans", sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 60, textAlign: 'center' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 42, fontStyle: 'italic', color: '#fff', marginBottom: 12 }}>Cinema Lounge</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Shot in 4K Ultra HD</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
          {projects.map((video) => (
            <CinemaVideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HeroAndCinema({ heroProject, cinemaProjects }) { 
  return (
    <>
      <HeroSection project={heroProject || DEFAULT_HERO} />
      <CinemaLounge projects={cinemaProjects} /> 
    </>
  );
}