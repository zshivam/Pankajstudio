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
    
    // DB se data fetch kiya
    const [rawHeroProject, rawCinemaProjects, rawPortfolioProjects, rawCarouselImages] = await Promise.all([
      MediaProject.findOne({ isPublished: true, featured: true }).sort({ eventDate: -1 }).select('title slug storyHighlight coverImage location eventDate').lean(),
      CinemaVideo.find({}).sort({ sortOrder: -1 }).lean(),
      MediaProject.find({ isPublished: true, category: { $ne: 'cinema-4k' } }).sort({ featured: -1, sortOrder: -1, eventDate: -1 }).limit(12).select('title slug category storyHighlight coverImage location eventDate is4K featured').lean(),
      CarouselImage.find({ isActive: true }).sort({ createdAt: -1 }).lean(),
    ]);

    // 🌟 TERMINAL DEBUGGING LOGS 🌟
    console.log("---- MONGODB FETCH RESULT ----");
    console.log("Hero Project Found:", rawHeroProject ? "YES" : "NO (Need a featured project!)");
    console.log("Carousel Images Count:", rawCarouselImages.length);
    console.log("------------------------------");
    
    // 🌟 MASTER TRICK: Raw objects ko strings/plain objects mein badalna
    return JSON.parse(JSON.stringify({ 
      heroProject: rawHeroProject || null,
      cinemaProjects: rawCinemaProjects || [], 
      portfolioProjects: rawPortfolioProjects || [], 
      carouselImages: rawCarouselImages || [] 
    }));

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
      
        {/* 5. Cinemalounge (Agar heroProject null hoga, toh handle ho jayega) */}
        <HeroAndCinema heroProject={heroProject} cinemaProjects={cinemaProjects} />

          
        {/* 2. Portfolio / Milestones */}
        <MilestonesHub projects={portfolioProjects} />

          {/* 7. About Strip */}
        <AboutStrip />

        {/* 6. NAYA: Client Love (Testimonials) */}
        <ClientLove />

           {/* 4. NAYA: By The Numbers Section */}
        <ByTheNumbers />

            {/* 3. NAYA: Featured Trust Bar */}
        <FeaturedBar />

        {/* 8. FAQs */}
        <AccordionFAQ />
      </main>
      <Footer />
    </>
  );
}