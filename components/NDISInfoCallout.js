export default function NDISInfoCallout() {
  return (
    <section className="ndis-callout">
      <div className="container">
        <div className="ndis-callout-panel">
          <div className="ndis-callout-copy">
            <span className="section-label">LEARN MORE</span>
            <h2 className="ndis-callout-title">New to the NDIS?</h2>
            <p className="ndis-callout-text">
              If you&rsquo;re unfamiliar with the NDIS, the official NDIS
              website provides information about eligibility, plans and
              participant support.
            </p>
          </div>
          <div className="ndis-callout-actions">
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
