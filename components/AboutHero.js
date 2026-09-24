import Image from 'next/image';

export default function AboutHero() {
  return (
    <section className="about-hero" data-animate="internal-hero">
      <svg
        className="about-hero-clip-defs"
        width="0"
        height="0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id="aboutHeroOrganicClip" clipPathUnits="objectBoundingBox">
            <path d="M0.03,0.34 C0.05,0.15 0.15,0.05 0.32,0.02 C0.50,-0.01 0.70,0.02 0.84,0.09 C0.95,0.15 1.00,0.27 0.99,0.45 C0.98,0.63 0.95,0.78 0.86,0.89 C0.75,1.01 0.57,1.02 0.39,0.98 C0.23,0.94 0.10,0.85 0.05,0.71 C0.01,0.59 0.01,0.47 0.03,0.34 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="about-hero-bg-decor" aria-hidden="true" data-ih="decoration">
        <div className="about-hero-shape about-hero-shape-1" />
        <div className="about-hero-shape about-hero-shape-2" />
      </div>

      <div className="about-hero-inner container">
        <div className="about-hero-copy">
          <span className="about-hero-eyebrow" data-ih="eyebrow">ABOUT SIKURU</span>
          <h1 className="about-hero-title" data-ih="title">
            Support centred<br />around people.
          </h1>
          <div className="about-hero-swoosh" aria-hidden="true" data-ih="accent" />
          <p className="about-hero-desc" data-ih="description">
            Sikuru Support Service is focused on providing thoughtful, personalised
            support that respects each person&rsquo;s choices, goals and way of life.
          </p>
        </div>

        <div className="about-hero-visual" data-ih="image">
          <div className="about-hero-image-wrap">
            <Image
              src="/assets/caregiver-reference.jpg"
              alt="A support worker sharing a warm conversation with a participant"
              width={520}
              height={350}
              priority
              className="about-hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
