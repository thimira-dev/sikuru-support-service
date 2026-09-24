const principles = [
  {
    title: 'Listen first',
    text: 'Good support begins with taking time to understand what matters to each person.',
    tone: 'cream',
  },
  {
    title: 'Respect choice',
    text: 'Individual preferences and everyday decisions guide how support is shaped.',
    tone: 'blue',
  },
  {
    title: 'Support everyday life',
    text: 'Support should fit naturally into home, community and daily routines.',
    tone: 'blue',
  },
  {
    title: 'Encourage connection',
    text: 'Where appropriate, support can help people take part in the community around them.',
    tone: 'cream',
  },
];

export default function StoryValues() {
  return (
    <section className="about-values story-values" data-animate="card-grid">
      <div className="about-values-heading-decor" aria-hidden="true" />
      <div className="about-values-inner container">
        <span className="section-label section-label--center" data-cg="header">OUR PHILOSOPHY</span>
        <h2 className="about-values-heading" data-cg="header">What guides us.</h2>
        <p className="about-values-sub" data-cg="header">
          Simple principles that keep people at the centre of every interaction.
        </p>

        <div className="story-values-grid">
          {principles.map(({ title, text, tone }) => (
            <article
              key={title}
              className={`story-value-block story-value-block--${tone}`}
              data-cg="card"
            >
              <div className="about-value-icon" aria-hidden="true" data-cg-icon>
                <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M11 16l3.5 3.5L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="about-value-title">{title}</h3>
              <p className="about-value-text">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
