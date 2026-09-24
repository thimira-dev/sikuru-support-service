import Link from 'next/link';

export default function SiteCTA({
  title,
  text,
  primaryLabel = 'Get Support',
  primaryHref = '/contact',
  secondaryLabel = 'Contact Us',
  secondaryHref = '/contact',
}) {
  return (
    <section className="about-cta site-cta" data-animate="cta">
      <div className="about-cta-panel container">
        <div className="about-cta-copy">
          <h2 className="about-cta-title" data-cta="title">{title}</h2>
          {text ? <p className="about-cta-desc" data-cta="copy">{text}</p> : null}
        </div>
        <div className="about-cta-actions" data-cta="actions">
          <Link href={primaryHref} className="primary-button">
            {primaryLabel} <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link href={secondaryHref} className="outline-button">
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
