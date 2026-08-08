import connectDB from '@/lib/mongodb';
import MediaProject from '@/models/MediaProject';
import CarouselImage from '@/models/CarouselImage';
import CinemaVideo from '@/models/CinemaVideo'; 
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WelcomeHero from '@/components/WelcomeHero';
import MilestonesHub from '@/components/MilestonesHub';
import FeaturedBar from '@/components/FeaturedBar';
import ByTheNumbers from '@/components/ByTheNumbers';
import HeroAndCinema from '@/components/HeroAndCinema';
import ClientLove from '@/components/ClientLove';
import AboutStrip from '@/components/AboutStrip';
import AccordionFAQ from '@/components/AccordionFAQ';

export const revalidate = 60;

async function getData() {
  try {
    await connectDB();
    
    const [rawHeroProject, rawCinemaProjects, rawPortfolioProjects, rawCarouselImages] = await Promise.all([
      MediaProject.findOne({ isPublished: true, featured: true }).sort({ eventDate: -1 }).lean(),
      CinemaVideo.find({}).sort({ sortOrder: -1 }).lean(),
      MediaProject.find({ isPublished: true, category: { $ne: 'cinema-4k' } }).sort({ featured: -1, sortOrder: -1, eventDate: -1 }).limit(12).lean(),
      CarouselImage.find({ isActive: true }).sort({ createdAt: -1 }).lean(),
    ]);

    // 🌟 FIX 3: Safe Data Normalization (HAR component ko safe properties deta hai)
    const normalizedCarousel = (rawCarouselImages || []).map(img => ({
      ...img,
      _id: img._id?.toString(),
      url: img.url || img.imageUrl || (typeof img.image === 'string' ? img.image : img.image?.url) || '/placeholder.svg'
    }));

    const normalizedPortfolio = (rawPortfolioProjects || []).map(p => ({
      ...p,
      _id: p._id?.toString(),
      coverImage: p.coverImage || p.imageUrl || p.url || '/placeholder.svg',
      url: p.imageUrl || p.coverImage || p.url || '/placeholder.svg'
    }));

    const normalizedCinema = (rawCinemaProjects || []).map(c => ({
      ...c,
      _id: c._id?.toString(),
      url: c.url || c.videoUrl || ''
    }));

    const normalizedHero = rawHeroProject ? {
      ...rawHeroProject,
      _id: rawHeroProject._id?.toString(),
      coverImage: rawHeroProject.coverImage || rawHeroProject.imageUrl || '/placeholder.svg'
    } : null;

    return { 
      heroProject: normalizedHero,
      cinemaProjects: normalizedCinema, 
      portfolioProjects: normalizedPortfolio, 
      carouselImages: normalizedCarousel 
    };

  } catch (err) {
    console.error('Homepage data error:', err);
    return { heroProject: null, cinemaProjects: [], portfolioProjects: [], carouselImages: [] };
  }
}

export default async function HomePage() {
  const { heroProject, cinemaProjects, portfolioProjects, carouselImages } = await getData();
  
  return (
    <>
      <Navbar /> 
      <main>
        {/* 1. Welcome Banners */}
        <WelcomeHero images={carouselImages} />
      
        {/* 2. Cinemalounge */}
        <HeroAndCinema heroProject={heroProject} cinemaProjects={cinemaProjects} />
          
        {/* 3. Portfolio / Milestones */}
        <MilestonesHub projects={portfolioProjects} />

        {/* 4. About Strip */}
        <AboutStrip />

        {/* 5. Client Love */}
        <ClientLove />

        {/* 6. By The Numbers */}
        <ByTheNumbers />

        {/* 7. Featured Trust Bar */}
        <FeaturedBar />

        {/* 8. FAQs */}
        <AccordionFAQ />
      </main>
      <Footer />
    </>
  );
}