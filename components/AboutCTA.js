import Link from 'next/link';

export default function AboutCTA() {
  return (
    <section className="about-cta" data-animate="cta">
      <div className="about-cta-panel container">
        <div className="about-cta-copy">
          <h2 className="about-cta-title" data-cta="title">
            Let&rsquo;s talk about the support you&rsquo;re looking for.
          </h2>
          <p className="about-cta-desc" data-cta="copy">
            We&rsquo;re here to listen, answer your questions and help you
            understand how Sikuru may be able to support you.
          </p>
        </div>
        <div className="about-cta-actions" data-cta="actions">
          <Link href="/contact" className="primary-button">
            Get Support <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link href="/contact" className="outline-button">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
