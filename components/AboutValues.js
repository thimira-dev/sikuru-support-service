export default function AboutValues() {
  const values = [
    {
      title: 'Respect',
      text: 'We listen, communicate openly and treat every person with dignity.',
      icon: (
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            d="M16 4C10 4 5 9 5 15c0 4 2 7 4 9l-1 4 4-2c1.1.3 2.3.5 4 .5 9.4 0 17-5.6 17-12.5C29 8.5 23.4 4 16 4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M11 14h2M16 14h2M21 14h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Choice',
      text: 'Support should reflect individual preferences, goals and everyday routines.',
      icon: (
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="2" />
          <path d="M11 16l3.5 3.5L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Connection',
      text: 'We encourage meaningful participation at home and within the community.',
      icon: (
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="11" cy="13" r="4" stroke="currentColor" strokeWidth="2" />
          <circle cx="21" cy="13" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M6 27c0-3.9 2.7-7 6-7h8c3.3 0 6 3.1 6 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section className="about-values">
      <div className="about-values-heading-decor" aria-hidden="true" />
      <div className="about-values-inner container">
        <span className="section-label section-label--center">WHAT MATTERS TO US</span>
        <h2 className="about-values-heading">Support shaped by what matters.</h2>
        <p className="about-values-sub">
          Our approach is guided by simple principles that keep people at the
          centre of every interaction.
        </p>

        <div className="about-values-grid">
          {values.map(({ title, text, icon }) => (
            <article className="about-value-card" key={title}>
              <div className="about-value-icon" aria-hidden="true">
                {icon}
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
