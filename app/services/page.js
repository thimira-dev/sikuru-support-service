import Navbar from '../../components/Navbar';
import ServicesHero from '../../components/ServicesHero';
import ServicesOverview from '../../components/ServicesOverview';
import ServiceDetails from '../../components/ServiceDetails';
import HowSupportWorks from '../../components/HowSupportWorks';
import SiteCTA from '../../components/SiteCTA';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Services – Sikuru Support Service',
  description:
    'Flexible support designed around individual needs, routines and goals across Perth, WA.',
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServicesHero />
        <ServicesOverview />
        <ServiceDetails />
        <HowSupportWorks />
        <SiteCTA
          title="Looking for the right support?"
          text="Talk with us about what you\u2019re looking for and how Sikuru may be able to help."
          primaryLabel="Get Support"
          primaryHref="/contact"
          secondaryLabel="Contact Us"
          secondaryHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
