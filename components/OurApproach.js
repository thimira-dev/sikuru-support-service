export default function OurApproach() {
  const steps = [
    {
      num: '01',
      title: 'Understand the person',
      text: 'We begin by listening to what matters, what support is useful and what the individual wants to achieve.',
    },
    {
      num: '02',
      title: 'Support everyday life',
      text: 'We focus on practical, respectful support that fits naturally into everyday routines.',
    },
    {
      num: '03',
      title: 'Build confidence and connection',
      text: 'Where appropriate, support can help encourage independence, participation and stronger community connections.',
    },
  ];

  return (
    <section className="our-approach">
      <div className="our-approach-bg-decor" aria-hidden="true">
        <div className="our-approach-blob our-approach-blob-1" />
        <div className="our-approach-blob our-approach-blob-2" />
      </div>

      <div className="our-approach-inner container">
        <div className="our-approach-heading-col">
          <span className="section-label">OUR APPROACH</span>
          <h2 className="our-approach-title">Support that starts with listening.</h2>
        </div>

        <div className="our-approach-steps">
          {steps.map(({ num, title, text }) => (
            <article className="our-approach-step" key={num}>
              <span className="our-approach-num" aria-hidden="true">{num}</span>
              <div>
                <h3 className="our-approach-step-title">{title}</h3>
                <p className="our-approach-step-text">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
