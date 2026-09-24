const steps = [
  { num: '01', title: 'Understand your plan' },
  { num: '02', title: 'Think about the support you want' },
  { num: '03', title: 'Talk with potential providers' },
  { num: '04', title: 'Choose support that feels right for you' },
];

export default function NDISJourney() {
  return (
    <section className="our-approach ndis-journey">
      <div className="our-approach-bg-decor" aria-hidden="true">
        <div className="our-approach-blob our-approach-blob-1" />
        <div className="our-approach-blob our-approach-blob-2" />
      </div>

      <div className="our-approach-inner container">
        <div className="our-approach-heading-col">
          <span className="section-label">GETTING STARTED</span>
          <h2 className="our-approach-title">Where do I start?</h2>
          <p className="ndis-journey-note">
            General information only — not financial or legal advice.
          </p>
        </div>

        <div className="our-approach-steps">
          {steps.map(({ num, title }) => (
            <article className="our-approach-step" key={num}>
              <span className="our-approach-num" aria-hidden="true">
                {num}
              </span>
              <div>
                <h3 className="our-approach-step-title">{title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
