import Image from 'next/image';
import Link from 'next/link';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'NDIS', href: '/ndis' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Contact', href: '/contact' },
];

const serviceLinks = [
  { label: 'Personal Care', href: '/services#personal-care' },
  { label: 'Daily Living Support', href: '/services#daily-living' },
  { label: 'Community Participation', href: '/services#community-participation' },
  { label: 'Transport Assistance', href: '/services#transport-assistance' },
  { label: 'Life Skills Development', href: '/services#life-skills' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 32" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d="M0,32 L0,20 C120,8 240,6 360,12 C480,18 600,24 720,20 C840,16 960,6 1080,10 C1200,14 1320,20 1440,14 L1440,32 Z" />
        </svg>
      </div>

      <div className="footer-main">
        <div
          className="footer-decor footer-decor--dots"
          aria-hidden="true"
        />
        <div
          className="footer-decor footer-decor--blob"
          aria-hidden="true"
        />

        <div className="container footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo" aria-label="Sikuru Support Service home">
              <Image
                src="/assets/sikuru-logo.png"
                alt="Sikuru Support Service"
                width={440}
                height={181}
                className="footer-logo-image"
              />
            </Link>
            <p className="footer-tagline">
              Thoughtful, personalised support centred around people, their
              choices and everyday life.
            </p>
            <span className="footer-gold-stroke" aria-hidden="true" />
          </div>

          <nav className="footer-column" aria-label="Quick links">
            <h2 className="footer-heading">Quick Links</h2>
            <ul className="footer-links">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-column" aria-label="Our services">
            <h2 className="footer-heading">Our Services</h2>
            <ul className="footer-links">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-column footer-contact">
            <h2 className="footer-heading">Get In Touch</h2>
            <p className="footer-contact-row">
              <span className="footer-contact-label">Phone</span>
              <a className="footer-phone" href="tel:+61415611071">
                0415 611 071
              </a>
            </p>
            <p className="footer-contact-row">
              <span className="footer-contact-label">Location</span>
              <span className="footer-locale">Perth, Western Australia</span>
            </p>
            <Link href="/contact" className="primary-button compact footer-enquire">
              Enquire Now <span aria-hidden="true">→</span>
            </Link>
            <div className="leaf-sprig footer-sprig" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>

        <div className="container footer-location">
          <span className="footer-location-pin" aria-hidden="true">
            <svg viewBox="0 0 16 20" width="13" height="16" aria-hidden="true" focusable="false">
              <path
                d="M8 19s6.5-5.6 6.5-10.5A6.5 6.5 0 0 0 8 2 6.5 6.5 0 0 0 1.5 8.5C1.5 13.4 8 19 8 19Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle cx="8" cy="8.5" r="2.2" fill="currentColor" />
            </svg>
          </span>
          <span>Proudly supporting individuals and families across Perth, WA</span>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span className="footer-copy">© 2026 Sikuru Support Service</span>
          <a
            href="https://www.ndis.gov.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-external"
            aria-label="NDIS website, opens in a new tab"
          >
            NDIS website
            <span aria-hidden="true"> ↗</span>
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
