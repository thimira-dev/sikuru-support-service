import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServiceStrip from '../components/ServiceStrip';
import EveryoneBelongs from '../components/EveryoneBelongs';
import LifeGallery from '../components/LifeGallery';
// Testimonials temporarily hidden for client review — re-enable the import
// and render below when genuine client testimonials are supplied.
// import TestimonialsSection from '../components/TestimonialsSection';
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
        {/* <TestimonialsSection /> — temporarily hidden for client review */}
      </main>
      <Footer />
    </>
  );
}
