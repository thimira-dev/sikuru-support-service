import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServiceStrip from '../components/ServiceStrip';
import EveryoneBelongs from '../components/EveryoneBelongs';
import LifeGallery from '../components/LifeGallery';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServiceStrip />
        <EveryoneBelongs />
        <LifeGallery />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
