export default function ContactInfo() {
  return (
    <section className="our-approach contact-info">
      <div className="our-approach-bg-decor" aria-hidden="true">
        <div className="our-approach-blob our-approach-blob-1" />
        <div className="our-approach-blob our-approach-blob-2" />
      </div>

      <div className="container contact-info-inner">
        <span className="section-label section-label--center">WE LISTEN</span>
        <h2 className="contact-info-title">We&rsquo;re here to listen.</h2>
        <div className="contact-info-grid">
          <div className="contact-info-item">
            <span className="contact-info-label">Phone</span>
            <a className="contact-info-value" href="tel:+61415611071">
              0415 611 071
            </a>
          </div>
          <div className="contact-info-item">
            <span className="contact-info-label">Location</span>
            <span className="contact-info-value">Perth, Western Australia</span>
          </div>
        </div>
      </div>
    </section>
  );
}
