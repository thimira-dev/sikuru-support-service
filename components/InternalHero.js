import Image from 'next/image';

export default function InternalHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = '',
  variant = 'blue',
  compact = false,
}) {
  return (
    <section className={`about-hero internal-hero${variant === 'cream' ? ' internal-hero--cream' : ''}${compact ? ' internal-hero--compact' : ''}`}>
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

      <div className="about-hero-bg-decor" aria-hidden="true">
        <div className="about-hero-shape about-hero-shape-1" />
        <div className="about-hero-shape about-hero-shape-2" />
      </div>

      <div className="about-hero-inner container">
        <div className="about-hero-copy">
          <span className="about-hero-eyebrow">{eyebrow}</span>
          <h1 className="about-hero-title">{title}</h1>
          <div className="about-hero-swoosh" aria-hidden="true" />
          <p className="about-hero-desc">{description}</p>
        </div>

        {image ? (
          <div className="about-hero-visual">
            <div className="about-hero-image-wrap">
              <Image
                src={image}
                alt={imageAlt}
                width={520}
                height={350}
                priority
                className="about-hero-image"
              />
            </div>
          </div>
        ) : (
          <div className="about-hero-visual internal-hero-botanical" aria-hidden="true">
            <div className="leaf-sprig leaf-left internal-hero-sprig">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
