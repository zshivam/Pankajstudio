import connectDB from '@/lib/mongodb';
import MediaProject from '@/models/MediaProject';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroAndCinema from '@/components/HeroAndCinema';
import MilestonesHub from '@/components/MilestonesHub';
import AboutStrip from '@/components/AboutStrip';
import AccordionFAQ from '@/components/AccordionFAQ';

export const revalidate = 60;

async function getData() {
  try {
    await connectDB();
    const [heroProject, cinemaProjects, portfolioProjects] = await Promise.all([
      MediaProject.findOne({ isPublished: true, featured: true }).sort({ eventDate: -1 }).select('title slug storyHighlight coverImage location eventDate').lean(),
      MediaProject.findCinemaLounge(8),
      MediaProject.find({ isPublished: true, category: { $ne: 'cinema-4k' } }).sort({ featured: -1, sortOrder: -1, eventDate: -1 }).limit(12).select('title slug category storyHighlight coverImage location eventDate is4K featured').lean(),
    ]);
    return { heroProject, cinemaProjects, portfolioProjects };
  } catch (err) {
    console.error('Homepage data error:', err);
    return { heroProject: null, cinemaProjects: [], portfolioProjects: [] };
  }
}

export default async function HomePage() {
  const { heroProject, cinemaProjects, portfolioProjects } = await getData();
  return (
    <>
      <Navbar />
      <main>
        <HeroAndCinema heroProject={heroProject} cinemaProjects={cinemaProjects} />
        <MilestonesHub projects={portfolioProjects} />
        <AboutStrip />
        <AccordionFAQ />
      </main>
      <Footer />
    </>
  );
}
