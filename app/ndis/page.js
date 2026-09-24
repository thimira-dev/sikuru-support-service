import Navbar from '../../components/Navbar';
import NDISHero from '../../components/NDISHero';
import NDISIntro from '../../components/NDISIntro';
import NDISSupportAreas from '../../components/NDISSupportAreas';
import NDISJourney from '../../components/NDISJourney';
import NDISInfoCallout from '../../components/NDISInfoCallout';
import SiteCTA from '../../components/SiteCTA';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'NDIS – Sikuru Support Service',
  description:
    'Understanding your support options with Sikuru Support Service across Perth, WA.',
};

export default function NDISPage() {
  return (
    <>
      <Navbar />
      <main>
        <NDISHero />
        <NDISIntro />
        <NDISSupportAreas />
        <NDISJourney />
        <NDISInfoCallout />
        <SiteCTA
          title="Have questions about support?"
          text="We\u2019re happy to listen to what you\u2019re looking for and talk through how Sikuru may be able to support you."
          primaryLabel="Talk With Us"
          primaryHref="/contact"
          secondaryLabel="Contact Us"
          secondaryHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
