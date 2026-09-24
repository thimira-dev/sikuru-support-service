import Navbar from '../../components/Navbar';
import StoryHero from '../../components/StoryHero';
import WhySikuru from '../../components/WhySikuru';
import StoryValues from '../../components/StoryValues';
import PeopleFirst from '../../components/PeopleFirst';
import SiteCTA from '../../components/SiteCTA';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Our Story – Sikuru Support Service',
  description:
    'Sikuru is built around a simple idea: meaningful support starts by seeing the person before the service.',
};

export default function OurStoryPage() {
  return (
    <>
      <Navbar />
      <main>
        <StoryHero />
        <WhySikuru />
        <StoryValues />
        <PeopleFirst />
        <SiteCTA
          title="Get to know Sikuru."
          text="If our approach sounds like the kind of support you\u2019re looking for, we\u2019d be happy to hear from you."
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
