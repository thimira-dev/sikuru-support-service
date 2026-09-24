const options = [
  {
    title: 'Call us',
    text: '0415 611 071',
    href: 'tel:+61415611071',
    linkLabel: 'Call 0415 611 071',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M8 5h6l2 7-3.5 2.5c1 3 3.5 5.5 6.5 6.5L21.5 18l7 2v6c0 1-1 2-2 2C15 28 4 17 4 7c0-1 1-2 2-2h2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Send an enquiry',
    text: 'Use the form below.',
    href: '#enquiry-form',
    linkLabel: 'Go to the enquiry form',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="4" y="7" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M5 9l11 8 11-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Location',
    text: 'Perth, Western Australia',
    href: null,
    linkLabel: null,
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M16 28s10-9.3 10-16A10 10 0 1 0 6 12c0 6.7 10 16 10 16Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="16" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function ContactOptions() {
  return (
    <section className="about-values contact-options" aria-label="Contact options">
      <div className="about-values-inner container">
        <span className="section-label section-label--center">GET IN TOUCH</span>
        <h2 className="about-values-heading">Three simple ways to reach us.</h2>

        <div className="about-values-grid contact-options-grid">
          {options.map(({ title, text, href, linkLabel, icon }) => (
            <article className="about-value-card" key={title}>
              <div className="about-value-icon" aria-hidden="true">
                {icon}
              </div>
              <h3 className="about-value-title">{title}</h3>
              {href ? (
                <p className="about-value-text">
                  <a className="contact-options-link" href={href} aria-label={linkLabel}>
                    {text}
                  </a>
                </p>
              ) : (
                <p className="about-value-text">{text}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
