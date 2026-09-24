import Image from 'next/image';
import Link from 'next/link';
import HeroVisual from './HeroVisual';

export default function Hero() {
  return (
    <section className="hero hero-v2" id="home">
      <div className="hero-shell-v2">
        <div className="hero-copy-v2">
          <h1 className="sr-only">Life looks better together.</h1>

          <Image
            src="/assets/hero-title-reference.png"
            alt=""
            width={468}
            height={189}
            priority
            className="hero-title-art"
          />

          <p className="hero-description-v2">
            Personalised NDIS support services
            <br className="desktop-only" /> for individuals and families across Perth.
          </p>

          <div className="hero-actions hero-actions-v2">
            <Link href="/contact" className="primary-button">
              Get Support <span aria-hidden="true">→</span>
            </Link>
            <Link href="/services" className="outline-button">
              How We Help
            </Link>
          </div>
        </div>
      </div>

      <HeroVisual />

      <svg
        className="hero-bottom-wave-v2"
        viewBox="0 0 1600 92"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 39C174 12 306 17 442 47C599 82 738 90 910 61C1091 31 1286 0 1600 27V92H0V39Z" fill="#ffffff" />
      </svg>
    </section>
  );
}
