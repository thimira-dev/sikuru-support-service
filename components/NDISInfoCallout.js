export default function NDISInfoCallout() {
  return (
    <section className="ndis-callout" data-animate="cta">
      <div className="container">
        <div className="ndis-callout-panel">
          <div className="ndis-callout-copy">
            <span className="section-label" data-cta="title">LEARN MORE</span>
            <h2 className="ndis-callout-title" data-cta="title">New to the NDIS?</h2>
            <p className="ndis-callout-text" data-cta="copy">
              If you&rsquo;re unfamiliar with the NDIS, the official NDIS
              website provides information about eligibility, plans and
              participant support.
            </p>
          </div>
          <div className="ndis-callout-actions" data-cta="actions">
            <a
              href="https://www.ndis.gov.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button"
            >
              Visit the NDIS website <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
