'use client';
import { useEffect, useRef, useState } from 'react';

// 🌟 IMAGE PATH (Wahi grand full-screen image)
const MY_IMAGE_PATH = '/Copy of DSC03244.jpg'; 

const DEFAULT_HERO = {
  title: 'A Royal Celebration',
  storyHighlight: 'Timeless moments captured with elegance and cinematic grace.',
  slug: '#',
  coverImage: { url: MY_IMAGE_PATH }
};

function HeroSection({ project }) {
  const imgUrl = project?.coverImage?.url || MY_IMAGE_PATH;
  
  const sectionRef = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Master Trick: Trigger animation every time it enters view, reset when it leaves
        if (entry.isIntersecting) {
          setIsAnimated(true);
        } else {
          setIsAnimated(false); // Reset animation state when user scrolls away
        }
      },
      { threshold: 0.25 } // Trigger when 25% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      // 🌟 FULL HEIGHT (100svh) maintained for grand image look
      style={{ position: 'relative', width: '100%', height: '100svh', minHeight: 600, background: '#050505', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}
    >
      
      {/* 🌟 SHARED PRESTIGE ANIMATION CSS 🌟 */}
      <style>{`
        /* The signature cinematic entry: slide, fade, and blur to focus */
        @keyframes signatureEntry {
          0% { opacity: 0; filter: blur(15px); transform: translateX(-40px); }
          100% { opacity: 1; filter: blur(0px); transform: translateX(0); }
        }

        /* Default hidden state when user is on another section */
        .text-hidden {
          opacity: 0;
          visibility: hidden;
        }

        /* 🌟 Title (Heading) uses the same style with immediate start */
        .animate-heading {
          visibility: visible;
          animation: signatureEntry 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        
        /* 🌟 Caption uses the same style with a 0.3s stagger delay */
        .animate-subtext {
          visibility: visible;
          animation: signatureEntry 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s forwards;
        }
      `}</style>

      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img 
          src={imgUrl} 
          alt="Royal Portrait" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', filter: 'saturate(0.65) brightness(0.72)' }} 
        />
        
        {/* --- BLEND LAYER --- */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '30svh', background: 'linear-gradient(to bottom, #050505 0%, rgba(5,5,5,0.8) 15%, transparent 100%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '70svh', background: 'linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.6) 50%, transparent 100%)' }} />
        </div>
      </div>
      
      {/* 🌟 TEXT CONTAINER (z-index 3 puts it above blending layer) 🌟 */}
      <div style={{ position: 'relative', zIndex: 3, padding: '0 48px 80px', maxWidth: 700 }}>
        <h1 
          // 🌟 HEADING NOW USES CINEMATIC ANIMATION 🌟
          className={isAnimated ? "animate-heading" : "text-hidden"} 
          style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 1.05, marginBottom: 18 }}
        >
          {project?.title || 'Capturing Your Story'}
        </h1>
        {project?.storyHighlight && (
          <p 
            // Caption uses same style with delay
            className={isAnimated ? "animate-subtext" : "text-hidden"} 
            style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 20 }}
          >
            {project.storyHighlight}
          </p>
        )}
      </div>
    </section>
  );
}

function CinemaLounge({ projects = [] }) {
  // Cinema Lounge section remains centered and unchanged
  return (
    <section style={{ background: '#050505', padding: '80px 0 100px', fontFamily: '"DM Sans", sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ marginBottom: 60, textAlign: 'center' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 42, fontStyle: 'italic', color: '#fff', marginBottom: 12 }}>Cinema Lounge</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Shot in 4K Ultra HD</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
          {projects.map((video) => {
             const videoId = video.videoUrl?.split('/').pop()?.split('?')[0];
             
             return (
               <div key={video._id} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                 <div style={{ width: '100%', aspectRatio: '16/9', background: '#111', borderRadius: 2, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                   <iframe 
                     src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1`}
                     style={{ width: '100%', height: '100%', border: 'none' }}
                     allow="autoplay; encrypted-media" 
                     allowFullScreen
                   />
                 </div>
                 
                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                   <h3 style={{ fontSize: 24, color: '#fff', marginBottom: 8, fontWeight: 400 }}>{video.title}</h3>
                   <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.6, maxWidth: 600 }}>{video.caption}</p>
                 </div>
               </div>
             );
           })}
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