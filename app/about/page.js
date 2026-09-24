import Navbar from '../../components/Navbar';
import AboutHero from '../../components/AboutHero';
import WhoWeAre from '../../components/WhoWeAre';
import AboutValues from '../../components/AboutValues';
import OurApproach from '../../components/OurApproach';
import AboutCTA from '../../components/AboutCTA';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'About – Sikuru Support Service',
  description:
    'Learn about Sikuru Support Service and how we provide thoughtful, personalised support across Perth, WA.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <WhoWeAre />
        <AboutValues />
        <OurApproach />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
