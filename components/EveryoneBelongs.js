import Image from 'next/image';
import Link from 'next/link';

export default function EveryoneBelongs() {
  return (
    <section className="belong" id="about">
      <div className="paper-edge top" aria-hidden="true" />

      <div className="belong-inner container">
        <div className="leaf-sprig leaf-left" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>

        <div className="belong-copy">

          {/* Keep real text for SEO/accessibility */}
          <h2 className="sr-only">
            Support that makes a difference.
          </h2>

          {/* Visible handwritten title */}
          <Image
            src="/assets/support-that-makes-a-difference.png"
            alt=""
            width={600}
            height={200}
            className="belong-title-art"
          />

          <p>
            We’re here to support you with care, respect and understanding.
          </p>

          <Link href="/our-story" className="primary-button">
            About Us <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div
          className="photo-collage"
          aria-label="Support and community photography"
        >
          <figure className="polaroid polaroid-left">
            <Image
              src="/assets/garden-support-reference.jpg"
              alt="Participant enjoying a gardening activity"
              fill
              sizes="220px"
            />
          </figure>

          <figure className="polaroid polaroid-right">
            <Image
              src="/assets/caregiver-reference.jpg"
              alt="Support worker sharing a happy conversation with a participant"
              fill
              sizes="270px"
            />
          </figure>
        </div>

        <Image
          className="stamp"
          src="/assets/stamp-reference.jpg"
          alt="Sikuru Support Service stamp"
          width={210}
          height={245}
        />

        <div className="leaf-sprig leaf-right" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
    </section>
  );
}