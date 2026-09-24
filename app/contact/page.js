import Navbar from '../../components/Navbar';
import ContactHero from '../../components/ContactHero';
import ContactOptions from '../../components/ContactOptions';
import ContactForm from '../../components/ContactForm';
import ContactInfo from '../../components/ContactInfo';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Contact – Sikuru Support Service',
  description:
    'Get in touch with Sikuru Support Service across Perth, WA. Call 0415 611 071 or send an enquiry.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactHero />
        <ContactOptions />
        <ContactForm />
        <ContactInfo />
      </main>
      <Footer />
    </>
  );
}
