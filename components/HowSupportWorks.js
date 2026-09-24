const steps = [
  {
    num: '01',
    title: 'Talk with us',
    text: 'Tell us what kind of support you\u2019re looking for and what matters to you.',
  },
  {
    num: '02',
    title: 'Understand your needs',
    text: 'We take time to understand preferences, routines and goals.',
  },
  {
    num: '03',
    title: 'Plan the support',
    text: 'Together, we can discuss what suitable support could look like.',
  },
];

export default function HowSupportWorks() {
  return (
    <section className="our-approach how-support-works">
      <div className="our-approach-bg-decor" aria-hidden="true">
        <div className="our-approach-blob our-approach-blob-1" />
        <div className="our-approach-blob our-approach-blob-2" />
      </div>

      <div className="our-approach-inner container">
        <div className="our-approach-heading-col">
          <span className="section-label">HOW IT WORKS</span>
          <h2 className="our-approach-title">Starting support should feel simple.</h2>
        </div>

        <div className="our-approach-steps">
          {steps.map(({ num, title, text }) => (
            <article className="our-approach-step" key={num}>
              <span className="our-approach-num" aria-hidden="true">
                {num}
              </span>
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
